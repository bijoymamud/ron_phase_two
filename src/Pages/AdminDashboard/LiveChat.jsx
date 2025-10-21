
import React, { useState, useEffect, useRef } from "react";
import { Send, MessageCircle, User, AlertCircle } from "lucide-react";

const LiveChat = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState({
    chatList: "disconnected",
    chat: "disconnected",
  });

  const chatListWsRef = useRef(null);
  const chatWsRef = useRef(null);
  const messagesEndRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);

  // Get token from localStorage (in real environment)
  const getToken = () => {
    // For demo purposes, using a hardcoded token
    return localStorage.getItem("access_token");
  };

  // Connect to chat list WebSocket
  const connectChatListWebSocket = () => {
    const token = getToken();
    const wsUrl = `ws://10.10.13.73:2000/ws/admin/chat-list/?Authorization=Bearer ${token}`;

    try {
      console.log("Connecting to chat list WebSocket:", wsUrl);
      chatListWsRef.current = new WebSocket(wsUrl);

      chatListWsRef.current.onopen = () => {
        console.log("Chat list WebSocket connected");
        setConnectionStatus((prev) => ({ ...prev, chatList: "connected" }));
        reconnectAttemptsRef.current = 0;
      };

      chatListWsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Chat list message received:", data);

          if (data.type === "active_chats" && data.chats) {
            setChats(data.chats);
          }
        } catch (error) {
          console.error("Error parsing chat list message:", error);
        }
      };

      chatListWsRef.current.onerror = (error) => {
        console.error("Chat list WebSocket error:", error);
        setConnectionStatus((prev) => ({ ...prev, chatList: "error" }));
      };

      chatListWsRef.current.onclose = () => {
        console.log("Chat list WebSocket disconnected");
        setConnectionStatus((prev) => ({ ...prev, chatList: "disconnected" }));
        reconnectChatListWebSocket();
      };
    } catch (error) {
      console.error("Failed to connect to chat list WebSocket:", error);
      setConnectionStatus((prev) => ({ ...prev, chatList: "error" }));
      reconnectChatListWebSocket();
    }
  };

  // Reconnect chat list WebSocket with exponential backoff
  const reconnectChatListWebSocket = () => {
    if (reconnectAttemptsRef.current >= 5) {
      console.log("Max reconnection attempts reached for chat list");
      return;
    }

    const delay = Math.min(
      1000 * Math.pow(2, reconnectAttemptsRef.current),
      30000
    );
    reconnectAttemptsRef.current++;

    console.log(
      `Reconnecting chat list WebSocket in ${delay}ms (attempt ${reconnectAttemptsRef.current})`
    );

    setTimeout(() => {
      connectChatListWebSocket();
    }, delay);
  };

  useEffect(() => {
    connectChatListWebSocket();

    return () => {
      if (chatListWsRef.current) {
        chatListWsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  // Process chat history from WebSocket
  const processChatHistory = (historyData) => {
    console.log("Processing chat history:", historyData);

    if (historyData.messages && Array.isArray(historyData.messages)) {
      const transformedMessages = historyData.messages.map((msg) => ({
        id: msg.id,
        content: msg.content,
        sender_type: msg.senderType,
        timestamp: msg.timestamp,
        sender: msg.sender,
        websocket_message_id: msg.websocket_message_id,
        is_read: msg.is_read,
        message_type: msg.message_type,
        support_chat: msg.support_chat,
      }));

      console.log("Transformed history messages:", transformedMessages);
      setMessages(transformedMessages);
      setIsLoadingMessages(false);
    } else {
      console.warn("No messages in chat history");
      setMessages([]);
      setIsLoadingMessages(false);
    }
  };

  const connectToChatWebSocket = (websocketChatId) => {
    if (chatWsRef.current) {
      chatWsRef.current.close();
    }

    const token = getToken();
    const wsUrl = `ws://10.10.13.73:2000/ws/support-chat/${websocketChatId}/?Authorization=Bearer ${token}`;

    try {
      console.log("Connecting to chat WebSocket:", wsUrl);
      chatWsRef.current = new WebSocket(wsUrl);

      chatWsRef.current.onopen = () => {
        console.log("Chat WebSocket connection established");
        setConnectionStatus((prev) => ({ ...prev, chat: "connected" }));
      };

      chatWsRef.current.onmessage = (event) => {
        try {
          let messageData;

          if (typeof event.data === "string") {
            console.log("Received raw string data, decoding...");
            messageData = JSON.parse(event.data);
          } else if (typeof event.data === "object") {
            console.log("Received pre-decoded object data");
            messageData = event.data;
          } else {
            console.log("Unexpected data type:", typeof event.data);
            return;
          }

          console.log("👉🏻👉🏻👉🏻Parsed WebSocket message:", messageData);

          const messageType = messageData.type || "unknown";

          if (messageType === "chat_history") {
            console.log("Received chat history");
            processChatHistory(messageData);
            return;
          }

          if (messageType === "chat_message") {
            const message = messageData.message;

            if (!message) {
              console.log("Skipping chat_message with missing message field");
              return;
            }

            const messageText = message.content || "";
            const senderType = message.sender_type || "unknown";
            const timestampString =
              message.timestamp || new Date().toISOString();
            const timestamp = timestampString;

            console.log(
              `Received chat message: ${messageText} (Sender: ${senderType}, Time: ${timestamp})`
            );

            if (messageText) {
              setMessages((prev) => {
                const messageId =
                  message.websocket_message_id || `msg_${Date.now()}`;
                
                // Check if this message already exists (either by websocket_message_id or tempId)
                const existingIndex = prev.findIndex(
                  (m) => m.websocket_message_id === messageId || 
                         (m.tempId && m.content === messageText && m.sender_type === senderType)
                );

                if (existingIndex !== -1) {
                  console.log("Message already exists, replacing optimistic message");
                  // Replace the optimistic message with the real one
                  const updatedMessages = [...prev];
                  updatedMessages[existingIndex] = {
                    id: message.id || Date.now(),
                    content: messageText,
                    sender_type: senderType,
                    timestamp: timestamp,
                    sender: message.sender || {
                      username: senderType,
                      role: senderType,
                    },
                    websocket_message_id: messageId,
                    is_read: message.is_read || false,
                    message_type: message.message_type || "text",
                  };
                  return updatedMessages;
                }

                // If message doesn't exist, add it
                return [
                  ...prev,
                  {
                    id: message.id || Date.now(),
                    content: messageText,
                    sender_type: senderType,
                    timestamp: timestamp,
                    sender: message.sender || {
                      username: senderType,
                      role: senderType,
                    },
                    websocket_message_id: messageId,
                    is_read: message.is_read || false,
                    message_type: message.message_type || "text",
                  },
                ];
              });
            } else {
              console.log("Skipping empty or invalid chat message");
            }
          } else {
            console.log(
              `Received non-chat message (type: ${messageType}):`,
              messageData
            );
          }
        } catch (error) {
          console.error("Error parsing chat message:", error);
        }
      };

      chatWsRef.current.onerror = (error) => {
        console.error("Chat WebSocket error:", error);
        setConnectionStatus((prev) => ({ ...prev, chat: "error" }));
      };

      chatWsRef.current.onclose = () => {
        console.log("Chat WebSocket connection closed");
        setConnectionStatus((prev) => ({ ...prev, chat: "disconnected" }));
      };
    } catch (error) {
      console.error("Failed to connect to chat WebSocket:", error);
      setConnectionStatus((prev) => ({ ...prev, chat: "error" }));
    }
  };

  // Handle chat selection
  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    setMessages([]);
    setIsLoadingMessages(true);
    connectToChatWebSocket(chat.websocket_chat_id);
  };

  // Send message with optimistic UI update
  const sendMessage = () => {
    if (
      !messageInput.trim() ||
      !chatWsRef.current ||
      chatWsRef.current.readyState !== WebSocket.OPEN
    ) {
      console.log("Cannot send message: WebSocket not ready");
      return;
    }

    const messageText = messageInput.trim();
    const tempId = `temp_${Date.now()}_${Math.random()}`;
    const timestamp = new Date().toISOString();

    // Optimistically add the message to UI immediately
    const optimisticMessage = {
      id: tempId,
      content: messageText,
      sender_type: "admin",
      timestamp: timestamp,
      sender: {
        username: "Admin",
        role: "admin",
      },
      websocket_message_id: tempId,
      tempId: tempId,
      is_read: false,
      message_type: "text",
      isOptimistic: true,
    };

    setMessages((prev) => [...prev, optimisticMessage]);

    // Send the message via WebSocket
    const messageData = {
      message: messageText,
    };

    console.log("Sending message:", messageData);
    chatWsRef.current.send(JSON.stringify(messageData));
    setMessageInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (timestamp) => {
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return "";
    }
  };

  const formatDate = (timestamp) => {
    try {
      const date = new Date(timestamp);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      if (date.toDateString() === today.toDateString()) {
        return "Today";
      } else if (date.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
      } else {
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      }
    } catch (error) {
      return "";
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Chat List Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <MessageCircle className="w-6 h-6" />
            Active Chats
          </h2>
          <div className="mt-2 flex items-center gap-2 text-xs">
            <div
              className={`w-2 h-2 rounded-full ${connectionStatus.chatList === "connected" ? "bg-green-500" : connectionStatus.chatList === "error" ? "bg-red-500" : "bg-gray-400"}`}
            ></div>
            <span className="text-gray-600">
              {connectionStatus.chatList === "connected"
                ? "Connected"
                : connectionStatus.chatList === "error"
                  ? "Error"
                  : "Connecting..."}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chats.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              {connectionStatus.chatList === "connected"
                ? "No active chats"
                : "Connecting to server..."}
            </div>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleChatSelect(chat)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChat?.id === chat.id
                    ? "bg-blue-50 border-l-4 border-l-blue-500"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="font-semibold text-gray-800 truncate">
                        {chat.user_name}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1 truncate">
                      {chat.subject}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {chat.last_message}
                    </p>
                  </div>
                  {chat.unread_count > 0 && (
                    <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 ml-2 flex-shrink-0">
                      {chat.unread_count}
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      chat.status === "open"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {chat.status}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatTime(chat.last_message_at)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {selectedChat.user_name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedChat.user_email}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Subject: {selectedChat.subject}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div
                    className={`w-2 h-2 rounded-full ${connectionStatus.chat === "connected" ? "bg-green-500" : connectionStatus.chat === "error" ? "bg-red-500" : "bg-gray-400"}`}
                  ></div>
                  <span className="text-gray-600">
                    {connectionStatus.chat === "connected"
                      ? "Live"
                      : connectionStatus.chat === "error"
                        ? "Error"
                        : "Connecting..."}
                  </span>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {isLoadingMessages ? (
                <div className="text-center text-gray-500 mt-8">
                  Loading messages...
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>No messages yet. Start the conversation!</p>
                </div>
              ) : (
                messages.map((msg, index) => {
                  const isAdmin = msg.sender_type === "admin";
                  const showDateDivider =
                    index === 0 ||
                    formatDate(messages[index - 1].timestamp) !==
                      formatDate(msg.timestamp);

                  return (
                    <React.Fragment key={msg.websocket_message_id || msg.id}>
                      {showDateDivider && (
                        <div className="flex items-center justify-center my-4">
                          <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                            {formatDate(msg.timestamp)}
                          </div>
                        </div>
                      )}
                      <div
                        className={`flex ${isAdmin ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-md px-4 py-2 rounded-lg ${
                            isAdmin
                              ? "bg-blue-500 text-white"
                              : "bg-white text-gray-800 border border-gray-200"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold">
                              {msg.sender?.username ||
                                (isAdmin ? "Admin" : "User")}
                            </span>
                            <span
                              className={`text-xs ${isAdmin ? "text-blue-100" : "text-gray-400"}`}
                            >
                              {formatTime(msg.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm whitespace-pre-wrap break-words">
                            {msg.content}
                          </p>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              {connectionStatus.chat !== "connected" && (
                <div className="mb-2 flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded">
                  <AlertCircle className="w-4 h-4" />
                  <span>WebSocket not connected. Trying to reconnect...</span>
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  disabled={connectionStatus.chat !== "connected"}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <button
                  onClick={sendMessage}
                  disabled={
                    !messageInput.trim() ||
                    connectionStatus.chat !== "connected"
                  }
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">Select a chat to start messaging</p>
              <p className="text-sm text-gray-400 mt-2">
                Choose a conversation from the left sidebar
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveChat;
