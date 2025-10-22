// import React, { useState, useEffect, useRef } from "react";
// import { Send, MessageCircle, User, AlertCircle } from "lucide-react";

// const LiveChat = () => {
//   const [chats, setChats] = useState([]);
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [messageInput, setMessageInput] = useState("");
//   const [isLoadingMessages, setIsLoadingMessages] = useState(false);
//   const [connectionStatus, setConnectionStatus] = useState({
//     chatList: "disconnected",
//     chat: "disconnected",
//   });

//   const chatListWsRef = useRef(null);
//   const chatWsRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   // manual-close flags to avoid reconnect when we intentionally close
//   const chatListManualCloseRef = useRef(false);
//   const chatManualCloseRef = useRef(false);
//   // separate reconnect trackers/timeouts for list vs chat
//   const chatListReconnectTimeoutRef = useRef(null);
//   const chatReconnectTimeoutRef = useRef(null);
//   const chatListReconnectAttemptsRef = useRef(0);
//   const chatReconnectAttemptsRef = useRef(0);

//   const getToken = () => {
//     return localStorage.getItem("access_token");
//   };

//   const connectChatListWebSocket = () => {
//     // avoid creating duplicate sockets
//     const existing = chatListWsRef.current;
//     if (
//       existing &&
//       (existing.readyState === WebSocket.OPEN ||
//         existing.readyState === WebSocket.CONNECTING)
//     ) {
//       return;
//     }

//     const token = getToken();
//     const wsUrl = `ws://10.10.13.73:2000/ws/admin/chat-list/?Authorization=Bearer ${token}`;

//     try {
//       console.log("Connecting to chat list WebSocket:", wsUrl);
//       // ensure manualClose flag is false before connect attempt
//       chatListManualCloseRef.current = false;
//       chatListWsRef.current = new WebSocket(wsUrl);

//       chatListWsRef.current.onopen = () => {
//         console.log("Chat list WebSocket connected");
//         setConnectionStatus((prev) => ({ ...prev, chatList: "connected" }));
//         chatListReconnectAttemptsRef.current = 0;
//         // clear any pending reconnect timeout
//         if (chatListReconnectTimeoutRef.current) {
//           clearTimeout(chatListReconnectTimeoutRef.current);
//           chatListReconnectTimeoutRef.current = null;
//         }
//       };

//       chatListWsRef.current.onmessage = (event) => {
//         try {
//           const data = JSON.parse(event.data);
//           console.log("Chat list message received:", data);

//           if (data.type === "active_chats" && data.chats) {
//             setChats(data.chats);
//           }
//         } catch (error) {
//           console.error("Error parsing chat list message:", error);
//         }
//       };

//       chatListWsRef.current.onerror = (error) => {
//         console.error("Chat list WebSocket error:", error);
//         setConnectionStatus((prev) => ({ ...prev, chatList: "error" }));
//       };

//       chatListWsRef.current.onclose = () => {
//         console.log("Chat list WebSocket disconnected");
//         setConnectionStatus((prev) => ({ ...prev, chatList: "disconnected" }));
//         // only schedule reconnect if NOT manually closed
//         if (!chatListManualCloseRef.current) {
//           reconnectChatListWebSocket();
//         } else {
//           // reset manual flag so future connects work normally
//           chatListManualCloseRef.current = false;
//         }
//       };
//     } catch (error) {
//       console.error("Failed to connect to chat list WebSocket:", error);
//       setConnectionStatus((prev) => ({ ...prev, chatList: "error" }));
//       reconnectChatListWebSocket();
//     }
//   };

//   const reconnectChatListWebSocket = () => {
//     if (chatListReconnectAttemptsRef.current >= 6) {
//       console.log("Max reconnection attempts reached for chat list");
//       return;
//     }
//     const attempt = chatListReconnectAttemptsRef.current++;
//     const delay = Math.min(1000 * Math.pow(2, attempt), 30000);
//     console.log(
//       `Reconnecting chat list WebSocket in ${delay}ms (attempt ${attempt + 1})`
//     );
//     if (chatListReconnectTimeoutRef.current)
//       clearTimeout(chatListReconnectTimeoutRef.current);
//     chatListReconnectTimeoutRef.current = setTimeout(() => {
//       chatListReconnectTimeoutRef.current = null;
//       // don't reconnect if manually closed
//       if (!chatListManualCloseRef.current) connectChatListWebSocket();
//     }, delay);
//   };

//   useEffect(() => {
//     connectChatListWebSocket();

//     return () => {
//       // manual close to avoid reconnect scheduling during unmount
//       chatListManualCloseRef.current = true;
//       if (chatListWsRef.current) {
//         try {
//           chatListWsRef.current.close();
//         } catch (e) {}
//         chatListWsRef.current = null;
//       }
//       if (chatListReconnectTimeoutRef.current) {
//         clearTimeout(chatListReconnectTimeoutRef.current);
//         chatListReconnectTimeoutRef.current = null;
//       }
//     };
//   }, []);

//   const processChatHistory = (historyData) => {
//     console.log("Processing chat history:", historyData);

//     if (historyData.messages && Array.isArray(historyData.messages)) {
//       const transformedMessages = historyData.messages.map((msg) => ({
//         id: msg.id,
//         content: msg.content,
//         sender_type: msg.senderType,
//         timestamp: msg.timestamp,
//         sender: msg.sender,
//         websocket_message_id: msg.websocket_message_id,
//         is_read: msg.is_read,
//         message_type: msg.message_type,
//         support_chat: msg.support_chat,
//       }));

//       console.log("Transformed history messages:", transformedMessages);
//       setMessages(transformedMessages);
//       setIsLoadingMessages(false);
//     } else {
//       console.warn("No messages in chat history");
//       setMessages([]);
//       setIsLoadingMessages(false);
//     }
//   };

//   const connectToChatWebSocket = (websocketChatId) => {
//     // if an existing chat socket exists, close it intentionally (mark manual to avoid reconnect)
//     if (chatWsRef.current) {
//       chatManualCloseRef.current = true;
//       try {
//         chatWsRef.current.close();
//       } catch (e) {}
//       chatWsRef.current = null;
//       // clear any pending reconnect for previous chat
//       if (chatReconnectTimeoutRef.current) {
//         clearTimeout(chatReconnectTimeoutRef.current);
//         chatReconnectTimeoutRef.current = null;
//       }
//       // small grace before creating new socket (ensures previous close handled)
//       chatManualCloseRef.current = false;
//     }

//     // avoid creating duplicate socket for same chat if already connecting/open
//     const existing = chatWsRef.current;
//     if (
//       existing &&
//       (existing.readyState === WebSocket.OPEN ||
//         existing.readyState === WebSocket.CONNECTING)
//     ) {
//       return;
//     }

//     const token = getToken();
//     const wsUrl = `ws://10.10.13.73:2000/ws/support-chat/${websocketChatId}/?Authorization=Bearer ${token}`;

//     try {
//       // ensure manual flag false when creating
//       chatManualCloseRef.current = false;
//       console.log("Connecting to chat WebSocket:", wsUrl);
//       chatWsRef.current = new WebSocket(wsUrl);

//       chatWsRef.current.onopen = () => {
//         console.log("Chat WebSocket connection established");
//         setConnectionStatus((prev) => ({ ...prev, chat: "connected" }));
//         // reset reconnect attempts and clear timeout
//         chatReconnectAttemptsRef.current = 0;
//         if (chatReconnectTimeoutRef.current) {
//           clearTimeout(chatReconnectTimeoutRef.current);
//           chatReconnectTimeoutRef.current = null;
//         }
//       };

//       chatWsRef.current.onmessage = (event) => {
//         try {
//           let messageData;

//           if (typeof event.data === "string") {
//             console.log("Received raw string data, decoding...");
//             messageData = JSON.parse(event.data);
//           } else if (typeof event.data === "object") {
//             console.log("Received pre-decoded object data");
//             messageData = event.data;
//           } else {
//             console.log("Unexpected data type:", typeof event.data);
//             return;
//           }

//           console.log("Parsed WebSocket message:", messageData);

//           const messageType = messageData.type || "unknown";

//           if (messageType === "chat_history") {
//             console.log("Received chat history");
//             processChatHistory(messageData);
//             return;
//           }

//           if (messageType === "chat_message") {
//             const message = messageData.message;

//             if (!message) {
//               console.log("Skipping chat_message with missing message field");
//               return;
//             }

//             const messageText = message.content || "";
//             const senderType = message.sender_type || "unknown";
//             const timestampString =
//               message.timestamp || new Date().toISOString();
//             const timestamp = timestampString;

//             console.log(
//               `Received chat message: ${messageText} (Sender: ${senderType}, Time: ${timestamp})`
//             );

//             if (messageText) {
//               setMessages((prev) => {
//                 const messageId =
//                   message.websocket_message_id || `msg_${Date.now()}`;

//                 const existingIndex = prev.findIndex(
//                   (m) =>
//                     m.websocket_message_id === messageId ||
//                     (m.tempId &&
//                       m.content === messageText &&
//                       m.sender_type === senderType)
//                 );

//                 if (existingIndex !== -1) {
//                   console.log(
//                     "Message already exists, replacing optimistic message"
//                   );
//                   const updatedMessages = [...prev];
//                   updatedMessages[existingIndex] = {
//                     id: message.id || Date.now(),
//                     content: messageText,
//                     sender_type: senderType,
//                     timestamp: timestamp,
//                     sender: message.sender || {
//                       username: senderType,
//                       role: senderType,
//                     },
//                     websocket_message_id: messageId,
//                     is_read: message.is_read || false,
//                     message_type: message.message_type || "text",
//                   };
//                   return updatedMessages;
//                 }

//                 return [
//                   ...prev,
//                   {
//                     id: message.id || Date.now(),
//                     content: messageText,
//                     sender_type: senderType,
//                     timestamp: timestamp,
//                     sender: message.sender || {
//                       username: senderType,
//                       role: senderType,
//                     },
//                     websocket_message_id: messageId,
//                     is_read: message.is_read || false,
//                     message_type: message.message_type || "text",
//                   },
//                 ];
//               });
//             } else {
//               console.log("Skipping empty or invalid chat message");
//             }
//           } else {
//             console.log(
//               `Received non-chat message (type: ${messageType}):`,
//               messageData
//             );
//           }
//         } catch (error) {
//           console.error("Error parsing chat message:", error);
//         }
//       };

//       chatWsRef.current.onerror = (error) => {
//         console.error("Chat WebSocket error:", error);
//         setConnectionStatus((prev) => ({ ...prev, chat: "error" }));
//       };

//       chatWsRef.current.onclose = () => {
//         console.log("Chat WebSocket connection closed");
//         setConnectionStatus((prev) => ({ ...prev, chat: "disconnected" }));
//         // schedule reconnect only if not manual
//         if (!chatManualCloseRef.current) {
//           // backoff
//           const attempt = chatReconnectAttemptsRef.current++;
//           const delay = Math.min(1000 * Math.pow(2, attempt), 30000);
//           if (chatReconnectTimeoutRef.current)
//             clearTimeout(chatReconnectTimeoutRef.current);
//           chatReconnectTimeoutRef.current = setTimeout(() => {
//             chatReconnectTimeoutRef.current = null;
//             if (!chatManualCloseRef.current)
//               connectToChatWebSocket(websocketChatId);
//           }, delay);
//         } else {
//           chatManualCloseRef.current = false;
//         }
//       };
//     } catch (error) {
//       console.error("Failed to connect to chat WebSocket:", error);
//       setConnectionStatus((prev) => ({ ...prev, chat: "error" }));
//     }
//   };

//   // Handle chat selection
//   const handleChatSelect = (chat) => {
//     setSelectedChat(chat);
//     setMessages([]);
//     setIsLoadingMessages(true);
//     connectToChatWebSocket(chat.websocket_chat_id);
//   };

//   // Send message with optimistic UI update
//   const sendMessage = () => {
//     if (
//       !messageInput.trim() ||
//       !chatWsRef.current ||
//       chatWsRef.current.readyState !== WebSocket.OPEN
//     ) {
//       console.log("Cannot send message: WebSocket not ready");
//       return;
//     }

//     const messageText = messageInput.trim();
//     const tempId = `temp_${Date.now()}_${Math.random()}`;
//     const timestamp = new Date().toISOString();

//     const optimisticMessage = {
//       id: tempId,
//       content: messageText,
//       sender_type: "admin",
//       timestamp: timestamp,
//       sender: {
//         username: "Admin",
//         role: "admin",
//       },
//       websocket_message_id: tempId,
//       tempId: tempId,
//       is_read: false,
//       message_type: "text",
//       isOptimistic: true,
//     };

//     setMessages((prev) => [...prev, optimisticMessage]);

//     const messageData = {
//       message: messageText,
//     };

//     console.log("Sending message:", messageData);
//     chatWsRef.current.send(JSON.stringify(messageData));
//     setMessageInput("");
//   };

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   // Handle Enter key press
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   const formatTime = (timestamp) => {
//     try {
//       const date = new Date(timestamp);
//       return date.toLocaleTimeString("en-US", {
//         hour: "numeric",
//         minute: "2-digit",
//         hour12: true,
//       });
//     } catch (error) {
//       return "";
//     }
//   };

//   const formatDate = (timestamp) => {
//     try {
//       const date = new Date(timestamp);
//       const today = new Date();
//       const yesterday = new Date(today);
//       yesterday.setDate(yesterday.getDate() - 1);

//       if (date.toDateString() === today.toDateString()) {
//         return "Today";
//       } else if (date.toDateString() === yesterday.toDateString()) {
//         return "Yesterday";
//       } else {
//         return date.toLocaleDateString("en-US", {
//           month: "short",
//           day: "numeric",
//         });
//       }
//     } catch (error) {
//       return "";
//     }
//   };

//   // Get initials from name
//   const getInitials = (name) => {
//     if (!name) return "U";
//     const names = name.trim().split(" ");
//     if (names.length === 1) return names[0].charAt(0).toUpperCase();
//     return (
//       names[0].charAt(0) + names[names.length - 1].charAt(0)
//     ).toUpperCase();
//   };

//   // Generate color based on name
//   const getAvatarColor = (name) => {
//     if (!name) return "bg-gray-400";
//     const colors = [
//       "bg-blue-500",
//       "bg-green-500",
//       "bg-purple-500",
//       "bg-pink-500",
//       "bg-indigo-500",
//       "bg-red-500",
//       "bg-yellow-500",
//       "bg-teal-500",
//     ];
//     const index = name.charCodeAt(0) % colors.length;
//     return colors[index];
//   };

//   // beforeunload to ensure manual close on page navigation
//   useEffect(() => {
//     const onUnload = () => {
//       chatListManualCloseRef.current = true;
//       chatManualCloseRef.current = true;
//       if (chatListWsRef.current)
//         try {
//           chatListWsRef.current.close();
//         } catch {}
//       if (chatWsRef.current)
//         try {
//           chatWsRef.current.close();
//         } catch {}
//     };
//     window.addEventListener("beforeunload", onUnload);
//     return () => window.removeEventListener("beforeunload", onUnload);
//   }, []);

//   return (
//     <div className="flex h-[81vh] bg-gray-50">
//       {/* Chat List Sidebar */}
//       <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
//         <div className="p-4 border-b border-gray-200">
//           <h2 className="text-xl font-bold text-gray-800">Chats</h2>
//           <div className="mt-2 flex items-center gap-2 text-xs">
//             <div
//               className={`w-2 h-2 rounded-full ${connectionStatus.chatList === "connected" ? "bg-green-500" : connectionStatus.chatList === "error" ? "bg-red-500" : "bg-gray-400"}`}
//             ></div>
//             <span className="text-gray-600">
//               {connectionStatus.chatList === "connected"
//                 ? "Connected"
//                 : connectionStatus.chatList === "error"
//                   ? "Error"
//                   : "Connecting..."}
//             </span>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto">
//           {chats.length === 0 ? (
//             <div className="p-4 text-center text-gray-500">
//               {connectionStatus.chatList === "connected"
//                 ? "No active chats"
//                 : "Connecting to server..."}
//             </div>
//           ) : (
//             chats.map((chat) => (
//               <div
//                 key={chat.id}
//                 onClick={() => handleChatSelect(chat)}
//                 className={` p-3 border-b border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
//                   selectedChat?.id === chat.id ? "bg-gray-100" : ""
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <div
//                     className={`w-10 h-10 rounded-full ${getAvatarColor(chat.user_name)} flex text-md items-center justify-center text-white font-semibold flex-shrink-0`}
//                   >
//                     {getInitials(chat.user_name)}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center justify-between mb-1">
//                       <span className="font-semibold text-gray-800 truncate text-sm">
//                         {chat.user_name}
//                       </span>
//                       {chat.unread_count > 0 && (
//                         <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 ml-2 flex-shrink-0">
//                           {chat.unread_count}
//                         </span>
//                       )}
//                     </div>
//                     <p className="text-sm text-gray-500 truncate">
//                       {chat.last_message}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>

//       {/* Chat Area */}
//       <div className="flex-1 flex flex-col">
//         {selectedChat ? (
//           <>
//             {/* Chat Header */}
//             <div className="bg-white border-b border-gray-200 p-3 shadow-sm">
//               <div className="flex items-center justify-between ">
//                 <div className="flex items-center w-full justify-between">
//                   <div className="flex items-center gap-3">
//                     <div
//                       className={`w-10 h-10 rounded-full ${getAvatarColor(selectedChat.user_name)} flex items-center justify-center text-white font-semibold`}
//                     >
//                       {getInitials(selectedChat.user_name)}
//                     </div>
//                     <div>
//                       <h3 className="text-base font-semibold text-gray-800">
//                         {selectedChat.user_name}
//                       </h3>
//                       <div className="flex items-center gap-2 text-xs">
//                         <div
//                           className={`w-2 h-2 rounded-full ${connectionStatus.chat === "connected" ? "bg-green-500" : "bg-gray-400"}`}
//                         ></div>
//                         <span className="text-gray-500">
//                           {connectionStatus.chat === "connected"
//                             ? "Active"
//                             : "Offline"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     {connectionStatus.chat !== "connected" && (
//                       <div className="mb-2 flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
//                         <AlertCircle className="w-4 h-4" />
//                         <span>Reconnecting...</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Messages Area */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
//               {isLoadingMessages ? (
//                 <div className="text-center text-gray-500 mt-8">
//                   Loading messages...
//                 </div>
//               ) : messages.length === 0 ? (
//                 <div className="text-center text-gray-500 mt-8">
//                   <MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
//                   <p>No messages yet. Start the conversation!</p>
//                 </div>
//               ) : (
//                 messages.map((msg, index) => {
//                   const isAdmin = msg.sender_type === "admin";
//                   const showDateDivider =
//                     index === 0 ||
//                     formatDate(messages[index - 1].timestamp) !==
//                       formatDate(msg.timestamp);

//                   return (
//                     <React.Fragment key={msg.websocket_message_id || msg.id}>
//                       {showDateDivider && (
//                         <div className="flex items-center justify-center my-4">
//                           <div className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
//                             {formatDate(msg.timestamp)}
//                           </div>
//                         </div>
//                       )}
//                       <div
//                         className={`flex gap-2 ${isAdmin ? "justify-end" : "justify-start"}`}
//                       >
//                         {!isAdmin && (
//                           <div
//                             className={`w-8 h-8 rounded-full ${getAvatarColor(selectedChat.user_name)} flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 mt-1`}
//                           >
//                             {getInitials(selectedChat.user_name)}
//                           </div>
//                         )}
//                         <div
//                           className={`flex flex-col ${isAdmin ? "items-end" : "items-start"} max-w-md`}
//                         >
//                           <div
//                             className={`px-4 py-2 rounded-2xl ${
//                               isAdmin
//                                 ? "bg-blue-500 text-white rounded-br-sm"
//                                 : "bg-gray-100 text-gray-800 rounded-bl-sm"
//                             }`}
//                           >
//                             <p className="text-sm whitespace-pre-wrap break-words">
//                               {msg.content}
//                             </p>
//                           </div>
//                           <span className={`text-xs text-gray-500 mt-1 px-2`}>
//                             {formatTime(msg.timestamp)}
//                           </span>
//                         </div>
//                       </div>
//                     </React.Fragment>
//                   );
//                 })
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Message Input */}
//             <div className="bg-white border-t border-gray-200 p-4">
//               <div className="flex gap-2 items-end">
//                 <input
//                   type="text"
//                   value={messageInput}
//                   onChange={(e) => setMessageInput(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   placeholder="Type a message..."
//                   disabled={connectionStatus.chat !== "connected"}
//                   className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
//                 />
//                 <button
//                   onClick={sendMessage}
//                   disabled={
//                     !messageInput.trim() ||
//                     connectionStatus.chat !== "connected"
//                   }
//                   className="p-3 bg-[#0B2A52] text-white rounded-full hover:bg-[#0B2A52]/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
//                 >
//                   <Send className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="flex-1 flex items-center justify-center text-gray-500 bg-white">
//             <div className="text-center">
//               <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
//               <p className="text-lg">Select a chat to start messaging</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LiveChat;

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

  // manual-close flags to avoid reconnect when we intentionally close
  const chatListManualCloseRef = useRef(false);
  const chatManualCloseRef = useRef(false);
  // separate reconnect trackers/timeouts for list vs chat
  const chatListReconnectTimeoutRef = useRef(null);
  const chatReconnectTimeoutRef = useRef(null);
  const chatListReconnectAttemptsRef = useRef(0);
  const chatReconnectAttemptsRef = useRef(0);

  const getToken = () => {
    return localStorage.getItem("access_token");
  };

  const connectChatListWebSocket = () => {
    // avoid creating duplicate sockets
    const existing = chatListWsRef.current;
    if (
      existing &&
      (existing.readyState === WebSocket.OPEN ||
        existing.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    const token = getToken();
    const wsUrl = `ws://10.10.13.73:2000/ws/admin/chat-list/?Authorization=Bearer ${token}`;

    try {
      console.log("Connecting to chat list WebSocket:", wsUrl);
      // ensure manualClose flag is false before connect attempt
      chatListManualCloseRef.current = false;
      chatListWsRef.current = new WebSocket(wsUrl);

      chatListWsRef.current.onopen = () => {
        console.log("Chat list WebSocket connected");
        setConnectionStatus((prev) => ({ ...prev, chatList: "connected" }));
        chatListReconnectAttemptsRef.current = 0;
        // clear any pending reconnect timeout
        if (chatListReconnectTimeoutRef.current) {
          clearTimeout(chatListReconnectTimeoutRef.current);
          chatListReconnectTimeoutRef.current = null;
        }
      };

      chatListWsRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("Chat list message received:", data);

          if (data.type === "active_chats" && data.chats) {
            setChats(data.chats);
          } else if (data.type === "new_chat" && data.chat) {
            // Handle new chat - add it to the list
            setChats((prevChats) => {
              // Check if chat already exists
              const existingIndex = prevChats.findIndex(
                (c) => c.id === data.chat.id
              );
              if (existingIndex !== -1) {
                // Update existing chat
                const updatedChats = [...prevChats];
                updatedChats[existingIndex] = data.chat;
                return updatedChats;
              }
              // Add new chat to the beginning
              return [data.chat, ...prevChats];
            });
          } else if (data.type === "chat_update" && data.chat) {
            // Handle chat updates (like new messages)
            setChats((prevChats) => {
              const updatedChats = prevChats.map((c) =>
                c.id === data.chat.id ? data.chat : c
              );
              return updatedChats;
            });
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
        // only schedule reconnect if NOT manually closed
        if (!chatListManualCloseRef.current) {
          reconnectChatListWebSocket();
        } else {
          // reset manual flag so future connects work normally
          chatListManualCloseRef.current = false;
        }
      };
    } catch (error) {
      console.error("Failed to connect to chat list WebSocket:", error);
      setConnectionStatus((prev) => ({ ...prev, chatList: "error" }));
      reconnectChatListWebSocket();
    }
  };

  const reconnectChatListWebSocket = () => {
    if (chatListReconnectAttemptsRef.current >= 6) {
      console.log("Max reconnection attempts reached for chat list");
      return;
    }
    const attempt = chatListReconnectAttemptsRef.current++;
    const delay = Math.min(1000 * Math.pow(2, attempt), 30000);
    console.log(
      `Reconnecting chat list WebSocket in ${delay}ms (attempt ${attempt + 1})`
    );
    if (chatListReconnectTimeoutRef.current)
      clearTimeout(chatListReconnectTimeoutRef.current);
    chatListReconnectTimeoutRef.current = setTimeout(() => {
      chatListReconnectTimeoutRef.current = null;
      // don't reconnect if manually closed
      if (!chatListManualCloseRef.current) connectChatListWebSocket();
    }, delay);
  };

  useEffect(() => {
    connectChatListWebSocket();

    return () => {
      // manual close to avoid reconnect scheduling during unmount
      chatListManualCloseRef.current = true;
      if (chatListWsRef.current) {
        try {
          chatListWsRef.current.close();
        } catch (e) {}
        chatListWsRef.current = null;
      }
      if (chatListReconnectTimeoutRef.current) {
        clearTimeout(chatListReconnectTimeoutRef.current);
        chatListReconnectTimeoutRef.current = null;
      }
    };
  }, []);

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
    // if an existing chat socket exists, close it intentionally (mark manual to avoid reconnect)
    if (chatWsRef.current) {
      chatManualCloseRef.current = true;
      try {
        chatWsRef.current.close();
      } catch (e) {}
      chatWsRef.current = null;
      // clear any pending reconnect for previous chat
      if (chatReconnectTimeoutRef.current) {
        clearTimeout(chatReconnectTimeoutRef.current);
        chatReconnectTimeoutRef.current = null;
      }
      // small grace before creating new socket (ensures previous close handled)
      chatManualCloseRef.current = false;
    }

    // avoid creating duplicate socket for same chat if already connecting/open
    const existing = chatWsRef.current;
    if (
      existing &&
      (existing.readyState === WebSocket.OPEN ||
        existing.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    const token = getToken();
    const wsUrl = `ws://10.10.13.73:2000/ws/support-chat/${websocketChatId}/?Authorization=Bearer ${token}`;

    try {
      // ensure manual flag false when creating
      chatManualCloseRef.current = false;
      console.log("Connecting to chat WebSocket:", wsUrl);
      chatWsRef.current = new WebSocket(wsUrl);

      chatWsRef.current.onopen = () => {
        console.log("Chat WebSocket connection established");
        setConnectionStatus((prev) => ({ ...prev, chat: "connected" }));
        // reset reconnect attempts and clear timeout
        chatReconnectAttemptsRef.current = 0;
        if (chatReconnectTimeoutRef.current) {
          clearTimeout(chatReconnectTimeoutRef.current);
          chatReconnectTimeoutRef.current = null;
        }
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

          console.log("Parsed WebSocket message:", messageData);

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

                const existingIndex = prev.findIndex(
                  (m) =>
                    m.websocket_message_id === messageId ||
                    (m.tempId &&
                      m.content === messageText &&
                      m.sender_type === senderType)
                );

                if (existingIndex !== -1) {
                  console.log(
                    "Message already exists, replacing optimistic message"
                  );
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
        // schedule reconnect only if not manual
        if (!chatManualCloseRef.current) {
          // backoff
          const attempt = chatReconnectAttemptsRef.current++;
          const delay = Math.min(1000 * Math.pow(2, attempt), 30000);
          if (chatReconnectTimeoutRef.current)
            clearTimeout(chatReconnectTimeoutRef.current);
          chatReconnectTimeoutRef.current = setTimeout(() => {
            chatReconnectTimeoutRef.current = null;
            if (!chatManualCloseRef.current)
              connectToChatWebSocket(websocketChatId);
          }, delay);
        } else {
          chatManualCloseRef.current = false;
        }
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
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
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

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  // Generate color based on name
  const getAvatarColor = (name) => {
    if (!name) return "bg-gray-400";
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-red-500",
      "bg-yellow-500",
      "bg-teal-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // beforeunload to ensure manual close on page navigation
  useEffect(() => {
    const onUnload = () => {
      chatListManualCloseRef.current = true;
      chatManualCloseRef.current = true;
      if (chatListWsRef.current)
        try {
          chatListWsRef.current.close();
        } catch {}
      if (chatWsRef.current)
        try {
          chatWsRef.current.close();
        } catch {}
    };
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, []);

  return (
    <div className="flex h-[81vh] bg-gray-50">
      {/* Chat List Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Chats</h2>
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
                className={` p-3 border-b border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedChat?.id === chat.id ? "bg-gray-100" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${getAvatarColor(chat.user_name)} flex text-md items-center justify-center text-white font-semibold flex-shrink-0`}
                  >
                    {getInitials(chat.user_name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-gray-800 truncate text-sm">
                        {chat.user_name}
                      </span>
                      {chat.unread_count > 0 && (
                        <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-0.5 ml-2 flex-shrink-0">
                          {chat.unread_count}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">
                      {chat.last_message}
                    </p>
                  </div>
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
            <div className="bg-white border-b border-gray-200 p-3 shadow-sm">
              <div className="flex items-center justify-between ">
                <div className="flex items-center w-full justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full ${getAvatarColor(selectedChat.user_name)} flex items-center justify-center text-white font-semibold`}
                    >
                      {getInitials(selectedChat.user_name)}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-800">
                        {selectedChat.user_name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs">
                        <div
                          className={`w-2 h-2 rounded-full ${connectionStatus.chat === "connected" ? "bg-green-500" : "bg-gray-400"}`}
                        ></div>
                        <span className="text-gray-500">
                          {connectionStatus.chat === "connected"
                            ? "Active"
                            : "Offline"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    {connectionStatus.chat !== "connected" && (
                      <div className="mb-2 flex items-center gap-2 text-sm text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                        <AlertCircle className="w-4 h-4" />
                        <span>Reconnecting...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
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
                  // Fix: Check for 'user' type, not 'admin'
                  const isUser = msg.sender_type === "user";
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
                        className={`flex gap-2 ${isUser ? "justify-start" : "justify-end"}`}
                      >
                        {isUser && (
                          <div
                            className={`w-8 h-8 rounded-full ${getAvatarColor(selectedChat.user_name)} flex items-center justify-center text-white text-sm font-semibold flex-shrink-0 mt-1`}
                          >
                            {getInitials(selectedChat.user_name)}
                          </div>
                        )}
                        <div
                          className={`flex flex-col ${isUser ? "items-start" : "items-end"} max-w-md`}
                        >
                          <div
                            className={`px-4 py-2 rounded-2xl ${
                              isUser
                                ? "bg-gray-100 text-gray-800 rounded-bl-sm"
                                : "bg-blue-500 text-white rounded-br-sm"
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap break-words">
                              {msg.content}
                            </p>
                          </div>
                          <span className={`text-xs text-gray-500 mt-1 px-2`}>
                            {formatTime(msg.timestamp)}
                          </span>
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
              <div className="flex gap-2 items-end">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  disabled={connectionStatus.chat !== "connected"}
                  className="flex-1 px-4 py-3 border dark:bg-white dark:text-gray-900 border-gray-300 rounded-full disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <button
                  onClick={sendMessage}
                  disabled={
                    !messageInput.trim() ||
                    connectionStatus.chat !== "connected"
                  }
                  className="p-3 bg-[#0B2A52] text-white rounded-full hover:bg-[#0B2A52]/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 bg-white">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg">Select a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveChat;
