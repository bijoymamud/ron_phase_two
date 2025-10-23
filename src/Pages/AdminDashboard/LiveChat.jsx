// import React, { useEffect, useRef, useState } from "react";
// import { useOutletContext, useParams } from "react-router-dom";
// import { useGetHistoryQuery } from "../../redux/features/baseApi";

// const LiveChat = () => {
//   const [input, setInput] = useState("");
//   const [isSending, setIsSending] = useState(false);
//   const [pendingMessages, setPendingMessages] = useState([]);
//   const [connectionStatus, setConnectionStatus] = useState("connecting");
//   const listRef = useRef(null);
//   const inputRef = useRef(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const socketRef = useRef(null); // Local WebSocket management
//   const { id } = useParams();

//   const { data: chatHistory } = useGetHistoryQuery(id);
//   const [messages, setMessages] = useState([]);
//   const { chatList } = useOutletContext();
//   const token = localStorage.getItem("access_token");

//   // WebSocket reconnection logic
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

//         if (payload.type === "chat_history") {
//           // if you don't need history from socket just comment it out  next to
//           // const historyMessages = payload.messages || [];
//           // const mapped = historyMessages.map((m) => ({
//           //   id: m.websocket_message_id || m.id || Date.now() + Math.random(),
//           //   from: m.senderType === "user" ?   "agent":"user",
//           //   text: m.content || m.text || m.message || JSON.stringify(m),
//           //   time: m.timestamp || m.created_at || new Date(),
//           //   senderName:
//           //     m.sender?.username ||
//           //     `${m.sender?.first_name || ""} ${m.sender?.last_name || ""}`.trim(),
//           // }));
//           // setMessages((prev) => [...prev, ...mapped]);

//           // if you want history from api (useGetHistoryQuery)

//           console.log(mapped, "messages history kkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
//           return;
//         }

//         if (payload.type === "chat_message") {
//           console.log(payload.message.content, "lllllllllllllllllllllllllllll");
//           let messageText = "";
//           if (payload.message) {
//             messageText = payload.message.content;
//           }
//           const incoming = {
//             id: payload.websocket_message_id || Date.now() + Math.random(),
//             from: payload.senderType === "user" ? "user" : "admin",
//             text: messageText,
//             time: payload.timestamp || new Date(),
//             senderName: payload.sender_name || payload.sender?.username || "",
//           };
//           setMessages((prev) => [...prev, incoming]);
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

//   // Initialize WebSocket on mount or when id/token changes
//   useEffect(() => {
//     connectWebSocket();
//     return () => {
//       if (socketRef.current) {
//         socketRef.current.close();
//         socketRef.current = null;
//       }
//     };
//   }, [id, token]);

//   // Retry pending messages when socket connects
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

//     const mapped = msgs.map((m) => {
//       let messageText = m.content || m.text || m.message || "";
//       if (typeof messageText === "object") {
//         messageText = JSON.stringify(messageText);
//       }

//       return {
//         id: m.websocket_message_id || m.id,
//         from: m.senderType === "user" ? "user" : "agent",
//         text: messageText,
//         time: m.timestamp || m.created_at || new Date(),
//         senderName:
//           m.sender?.username ||
//           `${m.sender?.first_name || ""} ${m.sender?.last_name || ""}`.trim(),
//       };
//     });

//     setMessages(mapped);
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
//       setPendingMessages((prev) => [...prev, msg]);
//       msg.pending = true;
//       connectWebSocket(); // Attempt reconnect if send fails
//     }

//     setMessages((prev) => [...prev, msg]);
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
//             className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
//             placeholder="Type a message..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             aria-label="Message input"
//             disabled={connectionStatus === "disconnected"}
//           />
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
//             disabled={
//               isSending || !input.trim() || connectionStatus === "disconnected"
//             }
//           >
//             {isSending ? "Sending..." : "Send"}
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

  const { data: chatHistory } = useGetHistoryQuery(id);
  const [messages, setMessages] = useState([]);
  const { chatList } = useOutletContext();
  const token = localStorage.getItem("access_token");

  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  const reconnectInterval = 3000;

  const connectWebSocket = () => {
    if (!token || !id) {
      console.log("Token or chat ID missing, cannot connect WebSocket");
      setConnectionStatus("disconnected");
      return;
    }

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      console.log("WebSocket already open");
      return;
    }

    console.log(
      `Connecting WebSocket for chat ${id} (Attempt ${reconnectAttempts.current + 1}/${maxReconnectAttempts})`
    );
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
        console.log("Received WebSocket payload:", payload);

        if (payload.type === "connection_established") {
          setConnectionStatus("connected");
          return;
        }
        if (payload.type === "message_sent") {
          return;
        }

        // Ignore chat_history from WebSocket since we use API
        if (payload.type === "chat_history") {
          console.log("Ignoring WebSocket chat_history, using API instead");
          return;
        }

        if (payload.type === "chat_message") {
          const incoming = {
            id: payload.websocket_message_id || Date.now() + Math.random(),
            from: payload.senderType === "user" ? "user" : "admin",
            text: payload.message?.content || "",
            time: payload.timestamp || new Date(),
            senderName: payload.sender_name || payload.sender?.username || "",
          };

          // Prevent duplicates by checking if message ID already exists
          setMessages((prev) => {
            if (prev.some((msg) => msg.id === incoming.id)) {
              console.log("Duplicate message ignored:", incoming.id);
              return prev;
            }
            return [...prev, incoming];
          });
        }
      } catch (err) {
        console.warn("Failed to parse WebSocket message:", err, event.data);
      }
    };

    socketRef.current.onclose = (event) => {
      console.log("Message WebSocket closed:", event.reason, event.code);
      setConnectionStatus("disconnected");
      if (reconnectAttempts.current < maxReconnectAttempts) {
        reconnectAttempts.current += 1;
        setTimeout(connectWebSocket, reconnectInterval);
      } else {
        console.error("Max reconnect attempts reached");
        setConnectionStatus("disconnected");
      }
    };

    socketRef.current.onerror = (err) => {
      console.error("Message WebSocket error:", err);
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

  // Retry pending messages
  useEffect(() => {
    if (
      !socketRef.current ||
      socketRef.current.readyState !== WebSocket.OPEN ||
      pendingMessages.length === 0
    ) {
      return;
    }

    console.log("Retrying", pendingMessages.length, "pending messages");
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
        console.log("Sent pending message:", msg.text);
      } catch (err) {
        console.warn("Failed to resend pending message:", err);
      }
    });
  }, [pendingMessages, id]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  // Set current user
  useEffect(() => {
    if (chatList) {
      const chat = chatList.chats.find((c) => c.websocket_chat_id === id);
      setCurrentUser(chat || {});
    }
    inputRef.current?.focus();
  }, [chatList, id]);

  // Load chat history from API
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

    // Prevent duplicates by filtering out messages already in state
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
          console.log("Message sent:", payload);
          return true;
        } catch (err) {
          console.warn("Socket send error:", err);
          return false;
        }
      }
      console.log("Socket unavailable, state:", socketRef.current?.readyState);
      return false;
    };

    const sent = trySend();
    if (!sent) {
      console.warn("Marking message as pending");
      setPendingMessages((prev) => {
        if (prev.some((m) => m.text === msg.text)) {
          console.log("Duplicate pending message ignored:", msg.text);
          return prev;
        }
        return [...prev, { ...msg, pending: true }];
      });
      connectWebSocket();
    }

    // Add message to state only if not already present
    setMessages((prev) => {
      if (prev.some((m) => m.id === msg.id)) {
        console.log("Duplicate message ignored:", msg.id);
        return prev;
      }
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

  return (
    <div className="flex flex-col h-full bg-white rounded shadow overflow-hidden">
      <div className="px-4 py-3 border-b flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium">Live Chat</h2>
          <p className="text-sm text-gray-500">
            {currentUser?.user?.full_name || currentUser?.user?.username}
          </p>
        </div>
        <div
          className={`text-sm font-medium ${
            connectionStatus === "connected"
              ? "text-green-600"
              : connectionStatus === "connecting"
                ? "text-yellow-600"
                : "text-red-600"
          }`}
        >
          {connectionStatus.charAt(0).toUpperCase() + connectionStatus.slice(1)}
        </div>
      </div>

      <div
        ref={listRef}
        className="flex-1 p-4 space-y-3 overflow-auto bg-gray-50"
      >
        {messages?.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] px-3 py-2 rounded-lg shadow-sm text-sm ${
                m.from === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800 border"
              }`}
            >
              <div className="whitespace-pre-wrap">
                {typeof m.text === "string" ? m.text : JSON.stringify(m.text)}
                {m.pending && (
                  <span className="ml-2 text-[11px] font-medium text-yellow-600">
                    (pending)
                  </span>
                )}
              </div>
              <div className="text-[11px] text-gray-400 mt-1 text-right">
                {formatTime(m.time)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-3 border-t bg-white">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="Message input"
            disabled={connectionStatus === "disconnected"}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
            disabled={
              isSending || !input.trim() || connectionStatus === "disconnected"
            }
          >
            {isSending ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LiveChat;
