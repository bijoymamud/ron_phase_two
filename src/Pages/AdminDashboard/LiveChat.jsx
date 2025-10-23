// import React, { useEffect, useRef, useState } from "react";
// import { useOutletContext, useParams } from "react-router-dom";
// import { useGetHistoryQuery } from "../../redux/features/baseApi";
// import { Send, Phone, Video, Paperclip } from "lucide-react";

// const LiveChat = () => {
//   const [input, setInput] = useState("");
//   const [isSending, setIsSending] = useState(false);
//   const [pendingMessages, setPendingMessages] = useState([]);
//   const [connectionStatus, setConnectionStatus] = useState("connecting");
//   const listRef = useRef(null);
//   const inputRef = useRef(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const socketRef = useRef(null);
//   const { id } = useParams();
//   const { data: chatHistory, isLoading, error } = useGetHistoryQuery(id);
//   const [messages, setMessages] = useState([]);
//   const context = useOutletContext(); // Get context safely
//   const chatList = context?.chatList || { chats: [] }; // Fallback to empty chats
//   const token = localStorage.getItem("access_token");

//   // Auto-focus input
//   useEffect(() => {
//     const handleFocus = (e) => {
//       if (
//         document.activeElement.tagName === "INPUT" &&
//         inputRef.current !== document.activeElement
//       ) {
//         return;
//       }
//     };

//     const timer = setTimeout(() => {
//       if (inputRef.current && !document.activeElement.closest(".chat-search")) {
//         inputRef.current.focus();
//       }
//     }, 100);

//     document.addEventListener("focusin", handleFocus);
//     return () => {
//       document.removeEventListener("focusin", handleFocus);
//       clearTimeout(timer);
//     };
//   }, []);

//   const reconnectAttempts = useRef(0);
//   const maxReconnectAttempts = 5;
//   const reconnectInterval = 3000;

//   // WebSocket connection
//   const connectWebSocket = () => {
//     if (!token || !id) {
//       setConnectionStatus("disconnected");
//       return;
//     }

//     if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
//       return;
//     }

//     setConnectionStatus("connecting");
//     socketRef.current = new WebSocket(
//       `wss://backend.valrpro.com/ws/support-chat/${id}/?Authorization=Bearer ${token}`
//     );

//     socketRef.current.onopen = () => {
//       console.log("Message WebSocket connected for chat:", id);
//       setConnectionStatus("connected");
//       reconnectAttempts.current = 0;
//     };

//     socketRef.current.onmessage = (event) => {
//       try {
//         const payload = JSON.parse(event.data);
//         if (payload.type === "connection_established") {
//           setConnectionStatus("connected");
//           return;
//         }
//         if (
//           payload.type === "message_sent" ||
//           payload.type === "chat_history"
//         ) {
//           return; // Ignore message_sent and chat_history
//         }

//         if (payload.type === "chat_message") {
//           const incoming = {
//             id: payload.websocket_message_id || Date.now() + Math.random(),
//             from: payload.messages?.sender_type === "admin" ? "admin" : "user",
//             text: payload.message?.content || "",
//             time: payload.timestamp || new Date(),
//             senderName: payload.sender_name || payload.sender?.username || "",
//           };

//           setMessages((prev) => {
//             if (prev.some((msg) => msg.id === incoming.id)) return prev;
//             return [...prev, incoming];
//           });
//         }
//       } catch (err) {
//         console.warn("Failed to parse WebSocket message:", err);
//       }
//     };

//     socketRef.current.onclose = (event) => {
//       setConnectionStatus("disconnected");
//       if (reconnectAttempts.current < maxReconnectAttempts) {
//         reconnectAttempts.current += 1;
//         setTimeout(connectWebSocket, reconnectInterval);
//       }
//     };

//     socketRef.current.onerror = (err) => {
//       setConnectionStatus("disconnected");
//     };
//   };

//   useEffect(() => {
//     connectWebSocket();
//     return () => {
//       if (socketRef.current) {
//         socketRef.current.close();
//         socketRef.current = null;
//       }
//     };
//   }, [id, token]);

//   // Handle pending messages
//   useEffect(() => {
//     if (
//       !socketRef.current ||
//       socketRef.current.readyState !== WebSocket.OPEN ||
//       pendingMessages.length === 0
//     )
//       return;
//     pendingMessages.forEach((msg) => {
//       const payload = {
//         message: msg.text,
//         websocket_chat_id: id,
//         sender_type: "admin",
//         timestamp: new Date().toISOString(),
//       };
//       try {
//         socketRef.current.send(JSON.stringify(payload));
//         setPendingMessages((prev) => prev.filter((m) => m.id !== msg.id));
//       } catch (err) {
//         console.warn("Failed to resend pending message:", err);
//       }
//     });
//   }, [pendingMessages, id]);

//   // Scroll to bottom when messages update
//   useEffect(() => {
//     if (listRef.current) {
//       listRef.current.scrollTop = listRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // Set current user
//   useEffect(() => {
//     if (chatList?.chats) {
//       const chat = chatList.chats.find((c) => c.websocket_chat_id === id);
//       setCurrentUser(chat || {});
//     }
//   }, [chatList, id]);

//   // Process API chat history
//   useEffect(() => {
//     if (!chatHistory || !chatHistory.success) return;
//     const msgs = chatHistory.messages || [];

//     const mapped = msgs.map((m) => ({
//       id: m.websocket_message_id || m.id,
//       from: m.sender_type === "user" ? "user" : "admin",
//       text: m.content || "",
//       time: m.timestamp || new Date(),
//       senderName: m.sender_name || "",
//     }));

//     setMessages(mapped);
//   }, [chatHistory]);

//   const sendMessage = (text) => {
//     if (!text.trim()) return;
//     const msg = {
//       id: Date.now() + Math.random(),
//       from: "admin",
//       text: text.trim(),
//       time: new Date(),
//     };

//     const payload = {
//       message: text.trim(),
//       websocket_chat_id: id,
//       sender_type: "admin",
//       timestamp: new Date().toISOString(),
//     };

//     const trySend = () => {
//       if (
//         socketRef.current &&
//         socketRef.current.readyState === WebSocket.OPEN
//       ) {
//         try {
//           socketRef.current.send(JSON.stringify(payload));
//           return true;
//         } catch (err) {
//           return false;
//         }
//       }
//       return false;
//     };

//     const sent = trySend();
//     if (!sent) {
//       setPendingMessages((prev) => {
//         if (prev.some((m) => m.text === msg.text)) return prev;
//         return [...prev, { ...msg, pending: true }];
//       });
//       connectWebSocket();
//     }

//     setMessages((prev) => {
//       if (prev.some((m) => m.id === msg.id)) return prev;
//       return [...prev, { ...msg, pending: !sent }];
//     });
//     setInput("");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSending(true);
//     sendMessage(input);

//     setIsSending(false);
//   };

//   const formatTime = (d) => {
//     try {
//       return new Date(d).toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//     } catch (e) {
//       return "";
//     }
//   };

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case "connected":
//         return "bg-emerald-500 shadow-emerald-500/50";
//       case "connecting":
//         return "bg-amber-500 shadow-amber-500/50";
//       case "disconnected":
//         return "bg-red-500 shadow-red-500/50";
//       default:
//         return "bg-slate-500 shadow-slate-500/50";
//     }
//   };

//   return (
//     <div className="flex flex-col h-full bg-gradient-to-br from-white via-slate-50 to-blue-50 border border-white/50 overflow-hidden">
//       {/* Header */}
//       <div className="px-8 py-6 border-b border-white/50 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-4">
//             <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-xl ring-4 ring-white/50 flex items-center justify-center">
//               <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
//                 {currentUser?.user?.first_name?.[0]?.toUpperCase() || "?"}
//               </div>
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
//                 {currentUser?.user?.first_name || "Live Chat"}
//               </h2>
//               <p className="text-sm text-slate-500 font-medium">
//                 {currentUser?.user?.full_name ||
//                   currentUser?.user?.username ||
//                   "Unknown User"}
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <div
//               className={`flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50`}
//             >
//               <div
//                 className={`w-3 h-3 rounded-full shadow-lg ${getStatusStyle(connectionStatus)}`}
//               />
//               <span className="text-sm font-semibold text-slate-700">
//                 {connectionStatus.charAt(0).toUpperCase() +
//                   connectionStatus.slice(1)}
//               </span>
//             </div>
//             <button className="p-3 bg-white/50 hover:bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/50">
//               <Phone size={20} className="text-slate-600" />
//             </button>
//             <button className="p-3 bg-white/50 hover:bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/50">
//               <Video size={20} className="text-slate-600" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Messages */}
//       <div
//         ref={listRef}
//         className="flex-1 p-8 space-y-4 overflow-auto bg-gradient-to-b from-slate-50/50 to-white/70 backdrop-blur-sm"
//       >
//         {console.log(
//           messages,
//           "kmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm"
//         )}
//         {isLoading ? (
//           <div className="text-center text-slate-500">
//             Loading chat history...
//           </div>
//         ) : error ? (
//           <div className="text-center text-red-500">
//             Error loading chat history: {error.message}
//           </div>
//         ) : messages.length === 0 ? (
//           <div className="text-center text-slate-500">No messages yet</div>
//         ) : (
//           messages.map((m) => (
//             <div
//               key={m.id}
//               className={`flex ${m.from !== "user" ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`max-w-[75%] px-6 py-4 rounded-3xl shadow-2xl text-sm backdrop-blur-sm border border-gray/50 ${
//                   m.from !== "user"
//                     ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-gray- shadow-indigo-500/25"
//                     : "bg-white/80 text-slate-800 shadow-slate-200/50 hover:shadow-slate-300/75"
//                 } transition-all duration-300 hover:scale-[1.01]`}
//               >
//                 <div className="whitespace-pre-wrap leading-relaxed">
//                   {typeof m.text === "string" ? m.text : JSON.stringify(m.text)}
//                   {m.pending && (
//                     <span className="ml-3 px-2 py-1 bg-yellow-400/80 text-xs font-bold text-yellow-900 rounded-full shadow-md">
//                       pending
//                     </span>
//                   )}
//                 </div>
//                 <div
//                   className={`text-xs font-medium mt-3 flex items-center justify-end gap-1 ${
//                     m.from === "user" ? "text-white/90" : "text-slate-500"
//                   }`}
//                 >
//                   {formatTime(m.time)}
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Input Area */}
//       <form
//         onSubmit={handleSubmit}
//         className="px-8 py-3 border-t border-white/50 bg-white/80 backdrop-blur-xl shadow-2xl"
//       >
//         <div className="flex items-center gap-3 rounded-3xl border border-white/50 transition-all duration-300">
//           <button className="p-3 text-slate-500 hover:text-slate-700 hover:bg-white/50 rounded-2xl transition-all duration-300 hover:scale-105">
//             <Paperclip size={20} />
//           </button>
//           <input
//             ref={inputRef}
//             className="flex-1 px-6 py-3 bg-transparent border rounded-full border-gray-300 outline-none text-lg placeholder-slate-500 font-medium focus:placeholder-transparent"
//             placeholder="Type your message..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             disabled={connectionStatus === "disconnected"}
//           />
//           <button
//             type="submit"
//             className={`p-4 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-105 ${
//               isSending || !input.trim() || connectionStatus === "disconnected"
//                 ? "bg-slate-300 text-slate-500 shadow-md cursor-not-allowed"
//                 : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-500/25 hover:from-indigo-700 hover:to-purple-700"
//             }`}
//             disabled={
//               isSending || !input.trim() || connectionStatus === "disconnected"
//             }
//           >
//             {isSending ? (
//               <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//             ) : (
//               <Send size={20} />
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LiveChat;

import React, { useEffect, useRef, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useGetHistoryQuery } from "../../redux/features/baseApi";
import { Send, Phone, Video, Paperclip } from "lucide-react";

const LiveChat = () => {
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [pendingMessages, setPendingMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("connecting");
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(null);
  const socketRef = useRef(null);
  const { id } = useParams();
  const { data: chatHistory, isLoading, error } = useGetHistoryQuery(id);
  const [messages, setMessages] = useState([]);
  const context = useOutletContext();
  const chatList = context?.chatList || { chats: [] };
  const token = localStorage.getItem("access_token");

  // Auto-focus input
  useEffect(() => {
    const handleFocus = (e) => {
      if (
        document.activeElement.tagName === "INPUT" &&
        inputRef.current !== document.activeElement
      ) {
        return;
      }
    };

    const timer = setTimeout(() => {
      if (inputRef.current && !document.activeElement.closest(".chat-search")) {
        inputRef.current.focus();
      }
    }, 100);

    document.addEventListener("focusin", handleFocus);
    return () => {
      document.removeEventListener("focusin", handleFocus);
      clearTimeout(timer);
    };
  }, []);

  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  const reconnectInterval = 3000;

  // WebSocket connection
  const connectWebSocket = () => {
    if (!token || !id) {
      setConnectionStatus("disconnected");
      return;
    }

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      return;
    }

    setConnectionStatus("connecting");
    socketRef.current = new WebSocket(
      `wss://backend.valrpro.com/ws/support-chat/${id}/?Authorization=Bearer ${token}`
    );

    socketRef.current.onopen = () => {
      console.log("Message WebSocket connected for chat:", id);
      setConnectionStatus("connected");
      reconnectAttempts.current = 0;
    };

    socketRef.current.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);

        if (payload.type === "connection_established") {
          setConnectionStatus("connected");
          return;
        }

        // Handle chat_history type - don't ignore it completely
        if (payload.type === "chat_history") {
          return; // History is handled by API call
        }

        // Handle message_sent - update local message status
        if (payload.type === "message_sent") {
          const sentMsgId = payload.websocket_message_id;
          if (sentMsgId) {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.pending && msg.text === payload.message?.content
                  ? { ...msg, id: sentMsgId, pending: false }
                  : msg
              )
            );
          }
          return;
        }

        // Handle incoming chat messages
        if (payload.type === "chat_message") {
          const incoming = {
            id: payload.websocket_message_id || Date.now() + Math.random(),
            from: payload.sender_type === "admin" ? "admin" : "user",
            text: payload.message?.content || payload.message || "",
            time: payload.timestamp || new Date(),
            senderName: payload.sender_name || payload.sender?.username || "",
          };

          setMessages((prev) => {
            // Check if message already exists by id or exact content+time
            const exists = prev.some(
              (msg) =>
                msg.id === incoming.id ||
                (msg.text === incoming.text &&
                  Math.abs(new Date(msg.time) - new Date(incoming.time)) < 1000)
            );
            if (exists) return prev;
            return [...prev, incoming];
          });
        }
      } catch (err) {
        console.warn("Failed to parse WebSocket message:", err);
      }
    };

    socketRef.current.onclose = (event) => {
      setConnectionStatus("disconnected");
      if (reconnectAttempts.current < maxReconnectAttempts) {
        reconnectAttempts.current += 1;
        setTimeout(connectWebSocket, reconnectInterval);
      }
    };

    socketRef.current.onerror = (err) => {
      setConnectionStatus("disconnected");
    };
  };

  useEffect(() => {
    connectWebSocket();
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [id, token]);

  // Handle pending messages
  useEffect(() => {
    if (
      !socketRef.current ||
      socketRef.current.readyState !== WebSocket.OPEN ||
      pendingMessages.length === 0
    )
      return;

    pendingMessages.forEach((msg) => {
      const payload = {
        message: msg.text,
        websocket_chat_id: id,
        sender_type: "admin",
        timestamp: new Date().toISOString(),
      };
      try {
        socketRef.current.send(JSON.stringify(payload));
        setPendingMessages((prev) => prev.filter((m) => m.id !== msg.id));
      } catch (err) {
        console.warn("Failed to resend pending message:", err);
      }
    });
  }, [pendingMessages, id]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  // Set current user
  useEffect(() => {
    if (chatList?.chats) {
      const chat = chatList.chats.find((c) => c.websocket_chat_id === id);
      setCurrentUser(chat || {});
    }
  }, [chatList, id]);

  // Process API chat history
  useEffect(() => {
    if (!chatHistory || !chatHistory.success) return;
    const msgs = chatHistory.messages || [];

    const mapped = msgs.map((m) => ({
      id: m.websocket_message_id || m.id,
      from: m.sender_type === "user" ? "user" : "admin",
      text: m.content || "",
      time: m.timestamp || new Date(),
      senderName: m.sender_name || "",
    }));

    setMessages(mapped);
  }, [chatHistory]);

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const tempId = `temp-${Date.now()}-${Math.random()}`;
    const msg = {
      id: tempId,
      from: "admin",
      text: text.trim(),
      time: new Date(),
      pending: true,
    };

    const payload = {
      message: text.trim(),
      websocket_chat_id: id,
      sender_type: "admin",
      timestamp: new Date().toISOString(),
    };

    // Add message to UI immediately
    setMessages((prev) => [...prev, msg]);

    const trySend = () => {
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        try {
          socketRef.current.send(JSON.stringify(payload));
          // Mark as sent (not pending) after successful send
          setMessages((prev) =>
            prev.map((m) => (m.id === tempId ? { ...m, pending: false } : m))
          );
          return true;
        } catch (err) {
          return false;
        }
      }
      return false;
    };

    const sent = trySend();
    if (!sent) {
      setPendingMessages((prev) => [...prev, msg]);
      connectWebSocket();
    }

    setInput("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSending || !input.trim() || connectionStatus === "disconnected")
      return;

    setIsSending(true);
    sendMessage(input);
    setTimeout(() => setIsSending(false), 300);
  };

  const formatTime = (d) => {
    try {
      return new Date(d).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return "";
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "connected":
        return "bg-green-500";
      case "connecting":
        return "bg-yellow-500";
      case "disconnected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#0A3161]/5 to-[#0A3161]/10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#0A3161] rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md">
              {currentUser?.user?.first_name?.[0]?.toUpperCase() || "?"}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0A3161]">
                {currentUser?.user?.first_name || "Live Chat"}
              </h2>
              <p className="text-sm text-gray-600">
                {currentUser?.user?.full_name ||
                  currentUser?.user?.username ||
                  "Unknown User"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
              <div
                className={`w-2.5 h-2.5 rounded-full ${getStatusStyle(connectionStatus)}`}
              />
              <span className="text-sm font-semibold text-gray-700">
                {connectionStatus.charAt(0).toUpperCase() +
                  connectionStatus.slice(1)}
              </span>
            </div>
            <button className="p-2.5 bg-white hover:bg-gray-50 rounded-lg shadow-sm border border-gray-200 transition-all duration-200">
              <Phone size={18} className="text-gray-600" />
            </button>
            <button className="p-2.5 bg-white hover:bg-gray-50 rounded-lg shadow-sm border border-gray-200 transition-all duration-200">
              <Video size={18} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={listRef}
        className="flex-1 p-6 space-y-4 overflow-auto bg-gray-50"
      >
        {isLoading ? (
          <div className="text-center text-gray-500">
            Loading chat history...
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            Error loading chat history: {error.message}
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-500">No messages yet</div>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.from !== "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm text-sm ${
                  m.from !== "user"
                    ? "bg-[#0A3161] text-white"
                    : "bg-white text-gray-800 border border-gray-200"
                } transition-all duration-200`}
              >
                <div className="whitespace-pre-wrap leading-relaxed">
                  {typeof m.text === "string" ? m.text : JSON.stringify(m.text)}
                  {m.pending && (
                    <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-xs font-semibold text-yellow-700 rounded-full">
                      sending...
                    </span>
                  )}
                </div>
                <div
                  className={`text-xs mt-2 ${
                    m.from !== "user" ? "text-white/70" : "text-gray-500"
                  }`}
                >
                  {formatTime(m.time)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSubmit}
        className="px-6 py-4 border-t border-gray-200 bg-white"
      >
        <div className="flex items-center gap-3 bg-gray-50 rounded-xl border border-gray-200 px-2 py-2">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-[#0A3161] hover:bg-white rounded-lg transition-all duration-200"
          >
            <Paperclip size={20} />
          </button>
          <input
            ref={inputRef}
            className="flex-1 px-3 py-2 bg-transparent outline-none text-base placeholder-gray-500"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={connectionStatus === "disconnected"}
          />
          <button
            type="submit"
            className={`p-3 rounded-lg transition-all duration-200 ${
              isSending || !input.trim() || connectionStatus === "disconnected"
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#0A3161] text-white hover:bg-[#0A3161]/90 shadow-md"
            }`}
            disabled={
              isSending || !input.trim() || connectionStatus === "disconnected"
            }
          >
            {isSending ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LiveChat;
