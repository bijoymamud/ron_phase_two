import React, { useState, useEffect, useRef } from "react";
import { Send, X, MessageCircle, User } from "lucide-react";
import {
  baseUrlToBackend,
  useCloseChatMutation,
  useStartChatMutation,
} from "../../redux/features/baseApi";
import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const SupportChat = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [chatId, setChatId] = useState(null);
  const [websocketChatId, setWebsocketChatId] = useState(null);
  const [websocket, setWebsocket] = useState(null);
  const [showSubjectInput, setShowSubjectInput] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);
  const isChatClosedRef = useRef(false);

  let ws = useRef(null);

  const [startChat] = useStartChatMutation();
  const [closeChat] = useCloseChatMutation();

  const normalizeMessage = (msg) => {
    if (!msg || (!msg.content && !msg.message)) return null;
    return {
      id: msg.id ?? `temp-${Date.now()}-${Math.random()}`,
      content: msg.content ?? msg.message ?? "",
      sender_type: msg.sender_type ?? "user",
      sender_name: msg.sender?.username ?? msg.sender_name ?? "You",
      websocket_message_id: msg.websocket_message_id ?? String(msg.id ?? ""),
      timestamp: msg.timestamp ?? new Date().toISOString(),
      is_read: !!msg.is_read,
      message_type: msg.message_type ?? "text",
    };
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const checkExistingChat = async () => {
      setIsLoadingMessages(true);
      try {
        const res = await fetch(
          `${baseUrlToBackend}api/support/user/get/support/chat-id/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        console.log("Check existing chat response:", data);

        if (
          data?.success &&
          data.chat_data &&
          data.chat_data.websocket_chat_id &&
          data.chat_data.id
        ) {
          const existingChatId = data.chat_data.id;
          const existingWsId = data.chat_data.websocket_chat_id;
          setChatId(existingChatId);
          setWebsocketChatId(existingWsId);
          setShowSubjectInput(false);

          try {
            const msgRes = await fetch(
              `${baseUrlToBackend}api/support/message/list/${existingWsId}/`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                  "Content-Type": "application/json",
                },
              }
            );
            if (msgRes.ok) {
              const msgData = await msgRes.json();
              console.log("Messages API response:", msgData);
              if (msgData?.success && Array.isArray(msgData.messages)) {
                const normalized = msgData.messages
                  .map(normalizeMessage)
                  .filter((msg) => msg !== null);
                setMessages(normalized);
              } else {
                console.warn("No valid messages in API response");
                setMessages([]);
              }
            } else {
              console.warn(
                "Failed to fetch messages:",
                msgRes.status,
                msgRes.statusText
              );
              setMessages([]);
              toast.error("Failed to load previous messages.");
            }
          } catch (e) {
            console.error("Error fetching messages:", e);
            setMessages([]);
            toast.error("Error loading messages. Please try again.");
          }
        } else {
          setShowSubjectInput(true);
          setChatId(null);
          setWebsocketChatId(null);
          setMessages([]);
        }
      } catch (error) {
        console.error("Error checking existing chat:", error);
        setShowSubjectInput(true);
        setMessages([]);
        toast.error("Error checking chat status.");
      } finally {
        setIsLoadingMessages(false);
      }
    };

    checkExistingChat();
  }, []);

  const handleStartChat = async () => {
    if (!subject.trim()) {
      toast.error("Please enter a subject.");
      return;
    }
    try {
      const response = await startChat({ subject }).unwrap();
      console.log("Start chat response:", response);
      const newChatId = response.chat_id ?? response.chat?.id;
      const newWs =
        response.websocket_chat_id ?? response.chat?.websocket_chat_id;
      setChatId(newChatId);
      setWebsocketChatId(newWs);
      setMessages(
        Array.isArray(response.messages)
          ? response.messages
              .map(normalizeMessage)
              .filter((msg) => msg !== null)
          : []
      );
      setShowSubjectInput(false);
      setSubject("");
      toast.success("Chat started successfully!");
    } catch (error) {
      console.error("Failed to start chat:", error);
      toast.error(error?.data?.message || "Failed to start chat.");
    }
  };

  const handleCloseChat = async () => {
    if (!websocketChatId) {
      toast.error("No active chat to close.");
      return;
    }
    try {
      const response = await closeChat(websocketChatId).unwrap();
      console.log("Close chat response:", response);
      toast.success(response?.message || "Chat closed successfully");
      isChatClosedRef.current = true;
      setShowSubjectInput(true);
      setChatId(null);
      setWebsocketChatId(null);
      setMessages([]);
      setInputMessage("");

      if (ws.readyState) {
        ws.close();
        setWebsocket(null);
      }
    } catch (error) {
      console.error("Error closing chat:", error);
      toast.error(error?.data?.message || "Failed to close chat.");
    }
  };

  const connectWebSocket = () => {
    if (!websocketChatId || isChatClosedRef.current) {
      console.log(
        "No WebSocket chat ID or chat is closed, skipping connection"
      );
      return;
    }

    const token = localStorage.getItem("access_token");
    setConnectionStatus("connecting");
    const wsUrl = `wss://backend.valrpro.com/ws/support-chat/${websocketChatId}/?token=${token}`;
    ws = new WebSocket(wsUrl);
    console.log(ws);

    ws.onopen = () => {
      console.log("WebSocket connected successfully");
      setConnectionStatus("connected");
      reconnectAttemptsRef.current = 0;
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("WebSocket message received:", data);

        if (data.type === "chat_message" || data.message) {
          const newMsg = normalizeMessage(data.message || data);
          if (newMsg) {
            setMessages((prev) => {
              const exists = prev.some(
                (m) => m.websocket_message_id === newMsg.websocket_message_id
              );
              if (exists) return prev;
              return [...prev.filter((m) => !m.optimistic), newMsg];
            });
          }
        } else if (data.type === "typing") {
          setIsTyping(data.is_typing);
        }
      } catch (e) {
        console.error("Invalid WebSocket message", e);
      }
    };

    ws.onclose = (e) => {
      console.log("WebSocket disconnected", e.code, e.reason);
      setConnectionStatus("disconnected");

      const doNotReconnectCodes = [1000, 1001, 1008, 4001, 4003, 4004];
      if (doNotReconnectCodes.includes(e.code) || isChatClosedRef.current) {
        console.log("WebSocket closed intentionally, not reconnecting");
        setConnectionStatus("error");
        return;
      }

      if (reconnectAttemptsRef.current < 5) {
        const delay = Math.min(
          1000 * Math.pow(2, reconnectAttemptsRef.current),
          10000
        );
        console.log(
          `Reconnecting in ${delay}ms... (attempt ${reconnectAttemptsRef.current + 1})`
        );
        reconnectTimeoutRef.current = setTimeout(() => {
          reconnectAttemptsRef.current += 1;
          connectWebSocket();
        }, delay);
      } else {
        console.error("Max reconnection attempts reached");
        setConnectionStatus("error");
        toast.error("Lost connection to chat.");
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setConnectionStatus("disconnected");
    };

    setWebsocket(ws);
  };

  useEffect(() => {
    if (websocketChatId && !isLoadingMessages) {
      connectWebSocket();
    }

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (websocket) {
        console.log("Cleaning up WebSocket connection");
        websocket.close();
        setWebsocket(null);
      }
    };
  }, [websocketChatId, isLoadingMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    const text = inputMessage.trim();
    if (!text) return;

    const tempId = `temp-${Date.now()}-${Math.random()}`;
    const optimistic = {
      id: tempId,
      content: text,
      sender_type: "user",
      sender_name: "You",
      websocket_message_id: tempId,
      timestamp: new Date().toISOString(),
      is_read: false,
      message_type: "text",
      optimistic: true,
    };
    setMessages((prev) => [...prev, optimistic]);
    setInputMessage("");
    inputRef.current?.focus();

    if (websocket && websocket.readyState === WebSocket.OPEN) {
      try {
        websocket.send(JSON.stringify({ message: text, sender_type: "user" }));
      } catch (e) {
        console.error("Failed to send WebSocket message:", e);
        toast.error("Failed to send message.");
      }
    } else {
      console.warn("WebSocket not connected, attempting to reconnect...");
      connectWebSocket();
    }
  };

  const handleMessageKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSubjectKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleStartChat();
    }
  };

  const formatTime = (timestamp) => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInHours = (now - date) / (1000 * 60 * 60);
      if (diffInHours < 24) {
        return date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      }
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    } catch {
      return "";
    }
  };

  if (showSubjectInput) {
    return (
      <div className="flex flex-col h-[80vh]">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full md:max-w-md">
            <div className="bg-white rounded-3xl shadow-md p-6">
              <div className="flex justify-center mb-6">
                <div className="bg-[#0A3161] p-4 rounded-full">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-center text-[#0A3161] mb-2">
                Start Support Chat
              </h1>
              <p className="text-center text-sm text-gray-500 mb-6">
                How can we help you today?
              </p>
              <div className="space-y-4">
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  onKeyPress={handleSubjectKeyPress}
                  placeholder="What do you need help with?"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-[#0A3161] focus:border-[#0A3161] focus:ring-2 focus:ring-[#0A3161]/50 outline-none"
                  autoFocus
                />
                <button
                  onClick={handleStartChat}
                  disabled={!subject.trim()}
                  className="w-full bg-[#0A3161] uppercase text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0A3161]/90 transition-all disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed shadow-md"
                >
                  Start Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[80vh] md:w-[50vh] w-[40vh]">
      <div className="bg-white border-b border-gray-200 shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-[#0A3161]">
              Support Team
            </h1>
            <p className="text-xs text-gray-500">
              {connectionStatus === "connected" && "Active now"}
              {connectionStatus === "connecting" && "Connecting..."}
              {connectionStatus === "disconnected" && "Reconnecting..."}
              {connectionStatus === "error" && "Connection error"}
            </p>
          </div>
          <button
            onClick={handleCloseChat}
            className="bg-[#0A3161] text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-[#0A3161]/90 transition-all shadow-md"
          >
            Complete
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 bg-white">
        <div className="max-w-6xl mx-auto space-y-4">
          {isLoadingMessages ? (
            <div className="text-center text-gray-500">Loading messages...</div>
          ) : messages.length === 0 ? (
            <div className="text-center text-gray-500">No messages yet</div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={msg.websocket_message_id ?? msg.id ?? index}
                className={`flex ${
                  msg.sender_type === "user" ? "justify-end" : "justify-start"
                } items-end space-x-2`}
              >
                {msg.sender_type !== "user" && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
                <div
                  className={`flex flex-col ${
                    msg.sender_type === "user" ? "items-end" : "items-start"
                  } max-w-[70%]`}
                >
                  <div
                    className={`relative px-4 py-2 rounded-2xl shadow-sm border border-gray-200 ${
                      msg.sender_type === "user"
                        ? "bg-[#0A3161] text-white"
                        : "bg-white text-[#0A3161]"
                    } ${msg.optimistic ? "opacity-70" : ""}`}
                  >
                    {/* <p className="text-sm leading-relaxed break-words">
                      {msg.content}
                    </p> */}
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || "");
                          return !inline && match ? (
                            <SyntaxHighlighter
                              style={vscDarkPlus}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          ) : (
                            <code
                              className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs"
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                    <span
                      className={`text-xs mt-1 block ${
                        msg.sender_type === "user"
                          ? "text-gray-200"
                          : "text-gray-500"
                      }`}
                    >
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                </div>
                {msg.sender_type === "user" && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-[#0A3161] flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
          {isTyping && (
            <div className="flex justify-start items-end space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-gray-200">
                <div className="flex space-x-1">
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-end space-x-3">
            <div className="flex-1 bg-white rounded-3xl px-4 py-2 border border-gray-200 focus-within:border-[#0A3161] transition-colors">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleMessageKeyPress}
                placeholder="Type a message..."
                className="w-full bg-transparent flex items-center py-1 resize-none outline-none text-[#0A3161] placeholder-gray-500 max-h-32"
                rows="1"
                style={{ minHeight: "24px" }}
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height =
                    Math.min(e.target.scrollHeight, 128) + "px";
                }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              className="bg-[#0A3161] text-white p-3 rounded-full hover:bg-[#0A3161]/90 transition-all disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed shadow-md"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportChat;
