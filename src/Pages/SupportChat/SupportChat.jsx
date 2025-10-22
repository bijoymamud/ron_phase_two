import React, { useState, useEffect, useRef } from "react";
import { Send, X, MessageCircle, User } from "lucide-react";
import {
  useCloseChatMutation,
  useStartChatMutation,
} from "../../redux/features/baseApi";

const SupportChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [chatId, setChatId] = useState(null);
  const [websocketChatId, setWebsocketChatId] = useState(null);
  const [websocket, setWebsocket] = useState(null);
  const [showSubjectInput, setShowSubjectInput] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const [startChat] = useStartChatMutation();
  const [closeChat] = useCloseChatMutation();

  // helper to normalize message shape from server to UI shape
  const normalizeMessage = (msg) => {
    if (!msg) return null;
    return {
      id: msg.id ?? null,
      content: msg.content ?? msg.message ?? "",
      sender_type: msg.senderType ?? msg.sender?.senderType ?? null,
      sender_name: msg.sender?.username ?? msg.sender_name ?? null,
      websocket_message_id:
        msg.websocket_message_id ??
        msg.websocket_message_id ??
        String(msg.id ?? ""),
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
      try {
        const res = await fetch("/support/user/get/support/chat-id/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (
          data?.success &&
          data.chat_data &&
          data.chat_data.status === "open"
        ) {
          const existingChatId = data.chat_data.id;
          const existingWsId = data.chat_data.websocket_chat_id;
          setChatId(existingChatId);
          setWebsocketChatId(existingWsId);

          // fetch messages for this chat
          try {
            const msgRes = await fetch(
              `/api/support/message/list/${existingChatId}/`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                  "Content-Type": "application/json",
                },
              }
            );
            if (msgRes.ok) {
              const msgData = await msgRes.json();
              if (msgData?.success && Array.isArray(msgData.messages)) {
                const normalized = msgData.messages.map(normalizeMessage);
                setMessages(normalized);
              }
            } else {
              console.warn(
                "Failed to fetch existing chat messages",
                msgRes.status
              );
            }
          } catch (e) {
            console.error("Error fetching messages for existing chat", e);
          }

          setShowSubjectInput(false);
        } else {
          setShowSubjectInput(true);
        }
      } catch (error) {
        console.error("Error checking existing chat:", error);
        setShowSubjectInput(true);
      }
    };

    checkExistingChat();

    return () => {
      if (chatId && websocket) {
        closeChat({ chat_id: chatId }).catch(() => {});
        try {
          websocket.close();
        } catch {}
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  const handleStartChat = async () => {
    if (!subject.trim()) return;
    try {
      const response = await startChat({ subject }).unwrap();
      // response may contain chat id, websocket_chat_id and initial messages
      const newChatId = response.chat_id ?? response.chat?.id;
      const newWs =
        response.websocket_chat_id ?? response.chat?.websocket_chat_id;
      setChatId(newChatId);
      setWebsocketChatId(newWs);
      const msgs = response.messages ?? response.chat?.messages ?? [];
      setMessages(Array.isArray(msgs) ? msgs.map(normalizeMessage) : []);
      setShowSubjectInput(false);
    } catch (error) {
      console.error("Failed to start chat:", error);
    }
  };

  const role = localStorage.getItem("user_role");
  const chatUserRaw = localStorage.getItem("chatUser");
  let name = "";
  try {
    const chatUser = chatUserRaw ? JSON.parse(chatUserRaw) : null;
    name = chatUser?.name ?? "";
  } catch (e) {
    console.warn("Failed to parse chatUser from localStorage", e);
    name = chatUserRaw ?? "";
  }

  useEffect(() => {
    if (!websocketChatId) return;
    const token = localStorage.getItem("access_token");
    const ws = new WebSocket(
      `ws://10.10.13.73:2000/ws/support-chat/${websocketChatId}/?Authorization=Bearer ${token}`
    );

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      let data;
      try {
        data = JSON.parse(event.data);
      } catch (e) {
        console.error("Invalid websocket message", e);
        return;
      }

      if (data.type === "chat_history" && Array.isArray(data.messages)) {
        const normalized = data.messages.map(normalizeMessage);
        setMessages(normalized);
        setIsTyping(false);
      } else if (data.type === "chat_message" && data.message) {
        const normalized = normalizeMessage(data.message);
        if (normalized) {
          setMessages((prev) => {
            // avoid duplicate by websocket id
            const exists = prev.some(
              (m) => m.websocket_message_id === normalized.websocket_message_id
            );
            if (exists) {
              return prev.map((m) =>
                m.websocket_message_id === normalized.websocket_message_id
                  ? normalized
                  : m
              );
            }
            return [...prev, normalized];
          });
        }
        setIsTyping(false);
      } else if (data.type === "typing") {
        setIsTyping(!!data.is_typing);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      // leave chat open; user can reconnect by re-selecting or we could attempt reconnect here
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setWebsocket(ws);

    return () => {
      try {
        ws.close();
      } catch {}
    };
  }, [websocketChatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    const text = inputMessage.trim();
    if (!text) return;

    // If websocket is available, send and show optimistic message
    const tempId = `temp-${Date.now()}`;
    const optimistic = {
      id: tempId,
      content: text,
      sender_type: role,
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
        websocket.send(JSON.stringify({ message: text }));
      } catch (e) {
        console.error(
          "Failed to send websocket message, will keep optimistic",
          e
        );
      }
    } else {
      // fallback: POST to send endpoint if websocket not available
      fetch(`/api/support/send-message/${chatId}/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text, type: "text" }),
      }).catch((e) => console.error("Send message fallback failed", e));
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
      <div className="flex flex-col ">
        <div className="flex-1 flex items-center justify-center p-6 ">
          <div className="w-full md:max-w-md">
            <div className="bg-white rounded-3xl shadow-2xl md:p-8 p-3">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-[#0B2A52] p-4 rounded-full">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="md:text-3xl font-bold text-center text-gray-800 mb-2">
                Start Support Chat
              </h1>
              <p className="text-center md:text-base text-sm text-gray-500 mb-8">
                How can we help you today?
              </p>

              <div className="space-y-4">
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  onKeyPress={handleSubjectKeyPress}
                  placeholder="What do you need help with?"
                  className="w-full px-4 py-3 bg-gray-50 border-2 text-sm dark:text-gray-900 border-gray-200 rounded-xl transition-colors"
                  autoFocus
                />
                <button
                  onClick={handleStartChat}
                  disabled={!subject.trim()}
                  className="w-full bg-gradient-to-r uppercase from-blue-500 to-[#0B2A52] text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-[#0B2A52] transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
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
    <div className="flex flex-col h-[80vh] md:w-[50vh] w-[40vh] md:pt-10 pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-full">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Support Team</h1>
              <p className="text-xs text-blue-100">Active now</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6 bg-gray-200 ">
        <div className="max-w-6xl mx-auto space-y-4">
          {messages.map((msg, index) => {
            const isUser = msg.sender_type === "user";
            const showAvatar =
              index === 0 ||
              messages[index - 1].sender_type !== msg.sender_type;
            return (
              <div
                key={msg.websocket_message_id ?? msg.id ?? index}
                className={`flex ${isUser ? "justify-end" : "justify-start"} items-end space-x-2`}
              >
                {!isUser && (
                  <div
                    className={`flex-shrink-0 ${showAvatar ? "opacity-100" : "opacity-0"}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}

                <div
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[70%]`}
                >
                  {showAvatar && !isUser && (
                    <span className="text-xs font-semibold text-gray-600 mb-1 px-3">
                      {msg.sender_name ?? "Support"}
                    </span>
                  )}
                  <div
                    className={`group relative ${isUser ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white" : "bg-white text-gray-800"} px-4 py-2 rounded-2xl shadow-sm`}
                  >
                    <p className="text-sm leading-relaxed break-words">
                      {msg.content}
                    </p>
                    <span
                      className={`text-xs ${isUser ? "text-blue-100" : "text-gray-400"} mt-1 block`}
                    >
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                </div>

                {isUser && (
                  <div
                    className={`flex-shrink-0 ${showAvatar ? "opacity-100" : "opacity-0"}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex justify-start items-end space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white px-4 py-3 rounded-2xl shadow-sm">
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

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-end space-x-3">
            <div className="flex-1 bg-gray-100 rounded-3xl px-4 py-2 focus-within:bg-gray-50 transition-colors">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleMessageKeyPress}
                placeholder="Type a message..."
                className="w-full bg-transparent resize-none outline-none text-gray-800 placeholder-gray-400 max-h-32"
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
              className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-3 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
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
