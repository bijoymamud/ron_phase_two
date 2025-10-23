// import React, { useEffect, useRef, useState } from "react";
// import { useOutletContext, useParams } from "react-router-dom";
// import { useGetHistoryQuery } from "../../redux/features/baseApi";
// import { Send } from "lucide-react";

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

//   const { data: chatHistory } = useGetHistoryQuery(id);
//   const [messages, setMessages] = useState([]);
//   const { chatList } = useOutletContext();
//   const token = localStorage.getItem("access_token");

//   const reconnectAttempts = useRef(0);
//   const maxReconnectAttempts = 5;
//   const reconnectInterval = 3000;

//   const connectWebSocket = () => {
//     if (!token || !id) {
//       console.log("Token or chat ID missing, cannot connect WebSocket");
//       setConnectionStatus("disconnected");
//       return;
//     }

//     if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
//       console.log("WebSocket already open");
//       return;
//     }

//     console.log(
//       `Connecting WebSocket for chat ${id} (Attempt ${reconnectAttempts.current + 1}/${maxReconnectAttempts})`
//     );
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
//         console.log("Received WebSocket payload:", payload);

//         if (payload.type === "connection_established") {
//           setConnectionStatus("connected");
//           return;
//         }
//         if (payload.type === "message_sent") {
//           return;
//         }

//         // Ignore chat_history from WebSocket since we use API
//         if (payload.type === "chat_history") {
//           console.log("Ignoring WebSocket chat_history, using API instead");
//           return;
//         }

//         if (payload.type === "chat_message") {
//           const incoming = {
//             id: payload.websocket_message_id || Date.now() + Math.random(),
//             from: payload.senderType === "user" ? "user" : "admin",
//             text: payload.message?.content || "",
//             time: payload.timestamp || new Date(),
//             senderName: payload.sender_name || payload.sender?.username || "",
//           };

//           // Prevent duplicates by checking if message ID already exists
//           setMessages((prev) => {
//             if (prev.some((msg) => msg.id === incoming.id)) {
//               console.log("Duplicate message ignored:", incoming.id);
//               return prev;
//             }
//             return [...prev, incoming];
//           });
//         }
//       } catch (err) {
//         console.warn("Failed to parse WebSocket message:", err, event.data);
//       }
//     };

//     socketRef.current.onclose = (event) => {
//       console.log("Message WebSocket closed:", event.reason, event.code);
//       setConnectionStatus("disconnected");
//       if (reconnectAttempts.current < maxReconnectAttempts) {
//         reconnectAttempts.current += 1;
//         setTimeout(connectWebSocket, reconnectInterval);
//       } else {
//         console.error("Max reconnect attempts reached");
//         setConnectionStatus("disconnected");
//       }
//     };

//     socketRef.current.onerror = (err) => {
//       console.error("Message WebSocket error:", err);
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

//   // Retry pending messages
//   useEffect(() => {
//     if (
//       !socketRef.current ||
//       socketRef.current.readyState !== WebSocket.OPEN ||
//       pendingMessages.length === 0
//     ) {
//       return;
//     }

//     console.log("Retrying", pendingMessages.length, "pending messages");
//     pendingMessages.forEach((msg) => {
//       const payload = {
//         message: msg.text,
//         websocket_chat_id: id,
//         senderType: "user",
//         timestamp: new Date().toISOString(),
//       };
//       try {
//         socketRef.current.send(JSON.stringify(payload));
//         setPendingMessages((prev) => prev.filter((m) => m.id !== msg.id));
//         console.log("Sent pending message:", msg.text);
//       } catch (err) {
//         console.warn("Failed to resend pending message:", err);
//       }
//     });
//   }, [pendingMessages, id]);

//   // Auto-scroll to bottom
//   useEffect(() => {
//     if (listRef.current) {
//       listRef.current.scrollTop = listRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // Set current user
//   useEffect(() => {
//     if (chatList) {
//       const chat = chatList.chats.find((c) => c.websocket_chat_id === id);
//       setCurrentUser(chat || {});
//     }
//     inputRef.current?.focus();
//   }, [chatList, id]);

//   // Load chat history from API
//   useEffect(() => {
//     if (!chatHistory) return;
//     const msgs = Array.isArray(chatHistory)
//       ? chatHistory
//       : chatHistory.messages || chatHistory.data || [];

//     const mapped = msgs.map((m) => ({
//       id: m.websocket_message_id || m.id,
//       from: m.senderType === "user" ? "user" : "admin",
//       text: m.content || m.text || m.message || JSON.stringify(m),
//       time: m.timestamp || m.created_at || new Date(),
//       senderName:
//         m.sender?.username ||
//         `${m.sender?.first_name || ""} ${m.sender?.last_name || ""}`.trim(),
//     }));

//     // Prevent duplicates by filtering out messages already in state
//     setMessages((prev) => {
//       const existingIds = new Set(prev.map((msg) => msg.id));
//       const newMessages = mapped.filter((msg) => !existingIds.has(msg.id));
//       return [...prev, ...newMessages];
//     });
//   }, [chatHistory]);

//   const sendMessage = (text) => {
//     if (!text.trim()) return;
//     const msg = {
//       id: Date.now() + Math.random(),
//       from: "user",
//       text: text.trim(),
//       time: new Date(),
//     };

//     const payload = {
//       message: text.trim(),
//       websocket_chat_id: id,
//       senderType: "user",
//       timestamp: new Date().toISOString(),
//     };

//     const trySend = () => {
//       if (
//         socketRef.current &&
//         socketRef.current.readyState === WebSocket.OPEN
//       ) {
//         try {
//           socketRef.current.send(JSON.stringify(payload));
//           console.log("Message sent:", payload);
//           return true;
//         } catch (err) {
//           console.warn("Socket send error:", err);
//           return false;
//         }
//       }
//       console.log("Socket unavailable, state:", socketRef.current?.readyState);
//       return false;
//     };

//     const sent = trySend();
//     if (!sent) {
//       console.warn("Marking message as pending");
//       setPendingMessages((prev) => {
//         if (prev.some((m) => m.text === msg.text)) {
//           console.log("Duplicate pending message ignored:", msg.text);
//           return prev;
//         }
//         return [...prev, { ...msg, pending: true }];
//       });
//       connectWebSocket();
//     }

//     // Add message to state only if not already present
//     setMessages((prev) => {
//       if (prev.some((m) => m.id === msg.id)) {
//         console.log("Duplicate message ignored:", msg.id);
//         return prev;
//       }
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

//   return (
//     <div className="flex flex-col h-full bg-white rounded shadow overflow-hidden">
//       <div className="px-4 py-3 border-b flex justify-between items-center">
//         <div>
//           <h2 className="text-lg font-medium">Live Chat</h2>
//           <p className="text-sm text-gray-500">
//             {currentUser?.user?.full_name || currentUser?.user?.username}
//           </p>
//         </div>
//         <div
//           className={`text-sm font-medium ${
//             connectionStatus === "connected"
//               ? "text-green-600"
//               : connectionStatus === "connecting"
//                 ? "text-yellow-600"
//                 : "text-red-600"
//           }`}
//         >
//           {connectionStatus.charAt(0).toUpperCase() + connectionStatus.slice(1)}
//         </div>
//       </div>

//       <div
//         ref={listRef}
//         className="flex-1 p-4 space-y-3 overflow-auto bg-gray-50"
//       >
//         {messages?.map((m) => (
//           <div
//             key={m.id}
//             className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
//           >
//             <div
//               className={`max-w-[70%] px-3 py-2 rounded-lg shadow-sm text-sm ${
//                 m.from === "user"
//                   ? "bg-blue-600 text-white"
//                   : "bg-white text-gray-800 border"
//               }`}
//             >
//               <div className="whitespace-pre-wrap">
//                 {typeof m.text === "string" ? m.text : JSON.stringify(m.text)}
//                 {m.pending && (
//                   <span className="ml-2 text-[11px] font-medium text-yellow-600">
//                     (pending)
//                   </span>
//                 )}
//               </div>
//               <div className="text-[11px] text-gray-400 mt-1 text-right">
//                 {formatTime(m.time)}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <form onSubmit={handleSubmit} className="px-4 py-3 border-t bg-white">
//         <div className="flex items-center gap-2">
//           <input
//             ref={inputRef}
//             className="flex-1 px-3 dark:bg-white py-2 border rounded-full pl-5"
//             placeholder="Type a message..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             aria-label="Message input"
//             disabled={connectionStatus === "disconnected"}
//           />
//           <button
//             type="submit"
//             className="px-[10px] cursor-pointer py-[10px] bg-[#0A3161] text-white rounded-full hover:bg-[#0A3161] disabled:opacity-60"
//             disabled={
//               isSending || !input.trim() || connectionStatus === "disconnected"
//             }
//           >
//             {isSending ? "Sending..." : <Send size={20} />}
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
  console.log(id, "mannan");

  const { data: chatHistory } = useGetHistoryQuery(id);
  console.log(chatHistory, "checking chat history layout");
  const [messages, setMessages] = useState([]);
  const { chatList } = useOutletContext();
  const token = localStorage.getItem("access_token");

  // **FIX: Respect ChatInterface search focus**
  useEffect(() => {
    const handleFocus = (e) => {
      // Only auto-focus inputRef when LiveChat is actually selected
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

  // WebSocket logic remains the same...
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
        if (payload.type === "message_sent") return;
        if (payload.type === "chat_history") return;

        if (payload.type === "chat_message") {
          const incoming = {
            id: payload.websocket_message_id || Date.now() + Math.random(),
            from: payload?.messages?.senderType === "user" ? "user" : "admin",
            text: payload.message?.content || "",
            time: payload.timestamp || new Date(),
            senderName: payload.sender_name || payload.sender?.username || "",
          };

          setMessages((prev) => {
            if (prev.some((msg) => msg.id === incoming.id)) return prev;
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
        senderType: "user",
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

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (chatList) {
      const chat = chatList.chats.find((c) => c.websocket_chat_id === id);
      setCurrentUser(chat || {});
    }
  }, [chatList, id]);

  useEffect(() => {
    if (!chatHistory) return;
    const msgs = Array.isArray(chatHistory)
      ? chatHistory
      : chatHistory.messages || chatHistory.data || [];

    const mapped = msgs.map((m) => ({
      id: m.websocket_message_id || m.id,
      from: m.senderType === "user" ? "user" : "admin",
      text: m.content || m.text || m.message || JSON.stringify(m),
      time: m.timestamp || m.created_at || new Date(),
      senderName:
        m.sender?.username ||
        `${m.sender?.first_name || ""} ${m.sender?.last_name || ""}`.trim(),
    }));

    setMessages((prev) => {
      const existingIds = new Set(prev.map((msg) => msg.id));
      const newMessages = mapped.filter((msg) => !existingIds.has(msg.id));
      return [...prev, ...newMessages];
    });
  }, [chatHistory]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const msg = {
      id: Date.now() + Math.random(),
      from: "user",
      text: text.trim(),
      time: new Date(),
    };

    const payload = {
      message: text.trim(),
      websocket_chat_id: id,
      senderType: "user",
      timestamp: new Date().toISOString(),
    };

    const trySend = () => {
      if (
        socketRef.current &&
        socketRef.current.readyState === WebSocket.OPEN
      ) {
        try {
          socketRef.current.send(JSON.stringify(payload));
          return true;
        } catch (err) {
          return false;
        }
      }
      return false;
    };

    const sent = trySend();
    if (!sent) {
      setPendingMessages((prev) => {
        if (prev.some((m) => m.text === msg.text)) return prev;
        return [...prev, { ...msg, pending: true }];
      });
      connectWebSocket();
    }

    setMessages((prev) => {
      if (prev.some((m) => m.id === msg.id)) return prev;
      return [...prev, { ...msg, pending: !sent }];
    });
    setInput("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    sendMessage(input);
    setIsSending(false);
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
        return "bg-emerald-500 shadow-emerald-500/50";
      case "connecting":
        return "bg-amber-500 shadow-amber-500/50";
      case "disconnected":
        return "bg-red-500 shadow-red-500/50";
      default:
        return "bg-slate-500 shadow-slate-500/50";
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-white via-slate-50 to-blue-50 border border-white/50 overflow-hidden">
      {/* **Premium Header** */}
      <div className="px-8 py-6 border-b border-white/50 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 ">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-xl ring-4 ring-white/50 flex items-center justify-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {currentUser?.user?.first_name?.[0]?.toUpperCase()}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                {currentUser?.user?.first_name || "Live Chat"}
              </h2>
              <p className="text-sm text-slate-500 font-medium">
                {currentUser?.user?.full_name || currentUser?.user?.username}
              </p>
            </div>
          </div>

          {/* Connection Status */}
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50`}
            >
              <div
                className={`w-3 h-3 rounded-full shadow-lg ${getStatusStyle(connectionStatus)}`}
              />
              <span className="text-sm font-semibold text-slate-700">
                {connectionStatus.charAt(0).toUpperCase() +
                  connectionStatus.slice(1)}
              </span>
            </div>

            {/* Action Buttons */}
            <button className="p-3 bg-white/50 hover:bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/50">
              <Phone size={20} className="text-slate-600" />
            </button>
            <button className="p-3 bg-white/50 hover:bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/50">
              <Video size={20} className="text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={listRef}
        className="flex-1 p-8 space-y-4 overflow-auto bg-gradient-to-b from-slate-50/50 to-white/70 backdrop-blur-sm"
      >
        {messages?.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.from === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}
          >
            <div
              className={`max-w-[75%] px-6 py-4 rounded-3xl shadow-2xl text-sm backdrop-blur-sm border border-white/50 ${
                m.from === "user"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-indigo-500/25 translate-y-0 hover:translate-y-[-2px]"
                  : "bg-white/80 shadow-slate-200/50 hover:shadow-slate-300/75"
              } transition-all duration-300 hover:scale-[1.01]`}
            >
              <div className="whitespace-pre-wrap leading-relaxed">
                {typeof m.text === "string" ? m.text : JSON.stringify(m.text)}
                {m.pending && (
                  <span className="ml-3 px-2 py-1 bg-yellow-400/80 text-xs font-bold text-yellow-900 rounded-full shadow-md">
                    pending
                  </span>
                )}
              </div>
              <div
                className={`text-xs font-medium mt-3 flex items-center justify-end gap-1 ${
                  m.from === "user" ? "text-white/90" : "text-slate-500"
                }`}
              >
                {formatTime(m.time)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* **Premium Input Area** */}
      <form
        onSubmit={handleSubmit}
        className="px-8 py-3 border-t border-white/50 bg-white/80 backdrop-blur-xl shadow-2xl"
      >
        <div className="flex items-center gap-3  rounded-3xl border border-white/50   transition-all duration-300">
          <button className="p-3 text-slate-500 hover:text-slate-700 hover:bg-white/50 rounded-2xl transition-all duration-300 hover:scale-105">
            <Paperclip size={20} />
          </button>

          <input
            ref={inputRef}
            className="flex-1 px-6 py-3 bg-transparent border rounded-full border-gray-300 outline-none text-lg placeholder-slate-500 font-medium focus:placeholder-transparent"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={connectionStatus === "disconnected"}
          />

          <button
            type="submit"
            className={`p-4 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-105 ${
              isSending || !input.trim() || connectionStatus === "disconnected"
                ? "bg-slate-300 text-slate-500 shadow-md cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-500/25 hover:from-indigo-700 hover:to-purple-700"
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
