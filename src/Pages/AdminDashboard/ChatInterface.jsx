// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useParams, Outlet } from "react-router-dom";
// import {
//   useApproveChatMutation,
//   useGetActiveChatsQuery,
// } from "../../redux/features/baseApi";
// import { Check, MessageSquarePlus, MessageSquareText } from "lucide-react";

// const ChatInterface = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { data: chatList, refetch: refetchChats } = useGetActiveChatsQuery();
//   const [approveChat] = useApproveChatMutation();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [chatRequest, setChatRequest] = useState([]);
//   const [localChatList, setLocalChatList] = useState([]);
//   const socketRef = useRef(null);
//   const token = localStorage.getItem("access_token");

//   // WebSocket for chat list updates
//   useEffect(() => {
//     if (!token) return;

//     const wsUrl = `wss://backend.valrpro.com/ws/admin/chat-list/?Authorization=Bearer ${token}`;
//     socketRef.current = new WebSocket(wsUrl);

//     socketRef.current.onopen = () => {
//       console.log("Chat list WebSocket connected");
//     };

//     socketRef.current.onmessage = (event) => {
//       try {
//         const response = JSON.parse(event.data);
//         if (response.type === "active_chats") {
//           const chatRequest = response?.chats || [];
//           setChatRequest(chatRequest);
//           setLocalChatList((prev) => {
//             const existingIds = new Set(
//               prev.map((chat) => chat.websocket_chat_id)
//             );
//             const newChats = chatRequest.filter(
//               (chat) => !existingIds.has(chat.websocket_chat_id)
//             );
//             return [...prev, ...newChats];
//           });
//           console.log("Chat requests:", chatRequest);
//         }
//         if (response.type === "new_chat") {
//           console.log(response);
//           setChatRequest((prev) => {
//             return [...prev, response.chat];
//           });
//         }
//       } catch (err) {
//         console.error("Error parsing WebSocket message:", err);
//       }
//     };

//     socketRef.current.onclose = (event) => {
//       console.log("Chat list WebSocket disconnected:", event.reason);
//     };

//     socketRef.current.onerror = (error) => {
//       console.error("Chat list WebSocket error:", error);
//     };

//     return () => {
//       if (socketRef.current) {
//         socketRef.current.close();
//       }
//     };
//   }, [token]);

//   // Merge RTK Query chatList with localChatList
//   useEffect(() => {
//     if (chatList?.chats) {
//       setLocalChatList((prev) => {
//         const existingIds = new Set(prev.map((chat) => chat.websocket_chat_id));
//         const newChats = chatList.chats.filter(
//           (chat) => !existingIds.has(chat.websocket_chat_id)
//         );
//         return [...prev, ...newChats];
//       });
//     }
//   }, [chatList]);

//   const filteredConversations = localChatList.filter((conv) => {
//     const fullName =
//       `${conv?.user?.first_name || ""} ${conv?.user?.last_name || ""}`.toLowerCase();
//     return fullName.includes(searchTerm.toLowerCase());
//   });

//   const handleChatSelect = (chatId) => {
//     setSelectedChat(chatId);
//     navigate(`/admin/livechat/${chatId}`);

//     if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
//       const joinMessage = JSON.stringify({
//         action: "join_room",
//         room_id: chatId,
//       });
//       socketRef.current.send(joinMessage);
//       console.log("Joined room:", chatId);
//     }
//   };

//   const approveChatHandler = async (chatId) => {
//     try {
//       await approveChat(chatId).unwrap();
//       refetchChats();
//       setChatRequest((prev) =>
//         prev.filter((req) => req.websocket_chat_id !== chatId)
//       );
//       console.log("Chat approved:", chatId);
//     } catch (err) {
//       console.error("Error approving chat:", err);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "online":
//         return "bg-green-500";
//       case "offline":
//         return "bg-gray-400";
//       case "away":
//         return "bg-yellow-500";
//       default:
//         return "bg-gray-400";
//     }
//   };

//   return (
//     <div className="flex h-[83vh] bg-gray-50 border border-gray-200">
//       <div className="w-1/3 border-r border-gray-200 bg-white flex flex-col">
//         <div className="p-4 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
//           <div className="mt-3 relative">
//             <input
//               type="text"
//               placeholder="Search conversations..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//             <svg
//               className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//           </div>

//           {chatRequest?.length > 0 && (
//             <div className="pt-3 flex items-center justify-end">
//               <button
//                 onClick={() =>
//                   document.getElementById("pending_request_modal").showModal()
//                 }
//               >
//                 <h1 className="text-sm font-semibold flex items-center gap-1 bg-gradient-to-r from-[#0A3161] to-purple-600 bg-clip-text text-transparent">
//                   <MessageSquarePlus size={16} />
//                   Request: {chatRequest.length}
//                 </h1>
//               </button>
//               <dialog id="pending_request_modal" className="modal">
//                 <div className="modal-box dark:bg-white">
//                   <h3 className="font-bold text-lg">Pending Requests</h3>
//                   <div>
//                     {chatRequest?.map((request) => (
//                       <div
//                         key={request.id}
//                         className="p-4 border-b border-gray-100"
//                       >
//                         <div className="flex items-center gap-3">
//                           <div className="avatar">
//                             <div className="w-10 rounded-full">
//                               <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
//                             </div>
//                           </div>
//                           <div className="flex items-center justify-between w-full">
//                             <div>
//                               <p>{request?.user_name}</p>
//                               <p className="capitalize text-sm text-gray-600">
//                                 {request?.subject}
//                               </p>
//                             </div>
//                             <div>
//                               <button
//                                 onClick={() =>
//                                   approveChatHandler(request.websocket_chat_id)
//                                 }
//                                 className="flex gap-1 items-center bg-gray-400 text-white text-sm rounded-md px-2 py-1"
//                               >
//                                 <Check size={14} />
//                                 Approve
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <form method="dialog" className="modal-backdrop">
//                   <button>close</button>
//                 </form>
//               </dialog>
//             </div>
//           )}
//         </div>

//         <div className="flex-1 overflow-y-auto">
//           {filteredConversations?.map((conversation) => (
//             <div
//               key={conversation.id}
//               onClick={() => handleChatSelect(conversation.websocket_chat_id)}
//               className={`p-4 border-b border-gray-100 cursor-pointer transition-colors duration-200 ${
//                 selectedChat === conversation.websocket_chat_id
//                   ? "bg-blue-50 border-blue-200"
//                   : "hover:bg-gray-50"
//               }`}
//             >
//               <div className="flex items-start space-x-3">
//                 <div className="relative">
//                   <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
//                     {conversation.avatar || conversation?.user?.first_name?.[0]}
//                   </div>
//                   <div
//                     className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(
//                       conversation.status
//                     )}`}
//                   />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <h3 className="font-semibold text-gray-900 truncate text-base">
//                     {conversation?.user?.first_name}
//                   </h3>
//                   <h3 className="font-semibold text-gray-600 truncate italic text-[10px]">
//                     {conversation?.subject}
//                   </h3>
//                   <p className="text-sm text-gray-600 truncate mt-1">
//                     {conversation.lastMessage}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex-1 flex flex-col">
//         {id ? (
//           <Outlet context={{ chatList: { chats: localChatList } }} />
//         ) : (
//           <div className="flex-1 flex items-center justify-center bg-gray-50">
//             <div className="text-center">
//               <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
//                 <MessageSquareText
//                   size={40}
//                   className="text-gradient-to-r from-blue-100 to-purple-100"
//                 />
//               </div>
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                 Select a conversation
//               </h3>
//               <p className="text-gray-500">
//                 Choose a chat from the sidebar to start messaging
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatInterface;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import {
  useApproveChatMutation,
  useGetActiveChatsQuery,
} from "../../redux/features/baseApi";
import {
  Check,
  MessageSquarePlus,
  MessageSquareText,
  Search,
} from "lucide-react";

const ChatInterface = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: chatList, refetch: refetchChats } = useGetActiveChatsQuery();
  const [approveChat] = useApproveChatMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatRequest, setChatRequest] = useState([]);
  const [localChatList, setLocalChatList] = useState([]);
  const socketRef = useRef(null);
  const token = localStorage.getItem("access_token");
  const searchInputRef = useRef(null);

  // **FIX: Prevent LiveChat input from stealing focus**
  useEffect(() => {
    const handleFocus = (e) => {
      if (e.target === searchInputRef.current) {
        e.stopPropagation();
      }
    };

    document.addEventListener("focusin", handleFocus);
    return () => {
      document.removeEventListener("focusin", handleFocus);
    };
  }, []);

  // WebSocket for chat list updates (unchanged)
  useEffect(() => {
    if (!token) return;

    const wsUrl = `wss://backend.valrpro.com/ws/admin/chat-list/?Authorization=Bearer ${token}`;
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      console.log("Chat list WebSocket connected");
    };

    socketRef.current.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);
        if (response.type === "active_chats") {
          const chatRequest = response?.chats || [];
          setChatRequest(chatRequest);
          setLocalChatList((prev) => {
            const existingIds = new Set(
              prev.map((chat) => chat.websocket_chat_id)
            );
            const newChats = chatRequest.filter(
              (chat) => !existingIds.has(chat.websocket_chat_id)
            );
            return [...prev, ...newChats];
          });
        }
        if (response.type === "new_chat") {
          setChatRequest((prev) => [...prev, response.chat]);
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    socketRef.current.onclose = (event) => {
      console.log("Chat list WebSocket disconnected:", event.reason);
    };

    socketRef.current.onerror = (error) => {
      console.error("Chat list WebSocket error:", error);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [token]);

  useEffect(() => {
    if (chatList?.chats) {
      setLocalChatList((prev) => {
        const existingIds = new Set(prev.map((chat) => chat.websocket_chat_id));
        const newChats = chatList.chats.filter(
          (chat) => !existingIds.has(chat.websocket_chat_id)
        );
        return [...prev, ...newChats];
      });
    }
  }, [chatList]);

  const filteredConversations = localChatList.filter((conv) => {
    const fullName =
      `${conv?.user?.first_name || ""} ${conv?.user?.last_name || ""}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
    navigate(`/admin/livechat/${chatId}`);

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const joinMessage = JSON.stringify({
        action: "join_room",
        room_id: chatId,
      });
      socketRef.current.send(joinMessage);
    }
  };

  const approveChatHandler = async (chatId) => {
    try {
      await approveChat(chatId).unwrap();
      refetchChats();
      setChatRequest((prev) =>
        prev.filter((req) => req.websocket_chat_id !== chatId)
      );
    } catch (err) {
      console.error("Error approving chat:", err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-emerald-400 shadow-emerald-400/50";
      case "offline":
        return "bg-slate-400 shadow-slate-400/50";
      case "away":
        return "bg-amber-400 shadow-amber-400/50";
      default:
        return "bg-slate-400 shadow-slate-400/50";
    }
  };

  return (
    <div className="flex h-[83vh] bg-gradient-to-br from-slate-50 via-white to-blue-50 border border-white/50 shadow-md ">
      {/* Sidebar */}
      <div className="w-80 border-r border-white/30 bg-white/80 backdrop-blur-xl flex flex-col ">
        <div className="p-6 border-b border-white/50 bg-gradient-to-r from-indigo-600/10 to-purple-600/10">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Messages
          </h2>

          {/* **Premium Search Bar** */}
          <div className="mt-6 relative group">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 pl-12 bg-white/70 backdrop-blur-sm border-2 border-white/50 rounded-2xl text-lg font-medium shadow-xl transition-all duration-300 focus:outline-none focus:border-indigo-400/80 focus:ring-4 focus:ring-indigo-500/20 focus:shadow-2xl hover:shadow-2xl hover:border-indigo-300/80 hover:bg-white/90"
            />
            <Search className="absolute left-4 top-3.5 h-6 w-6 text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-300" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 scale-0 group-focus-within:scale-100 transition-transform duration-300" />
          </div>

          {/* Pending Requests */}
          {chatRequest?.length > 0 && (
            <div className="mt-6">
              <button
                onClick={() =>
                  document.getElementById("pending_request_modal").showModal()
                }
                className="group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
              >
                <MessageSquarePlus size={18} />
                <span>Requests: {chatRequest.length}</span>
                <div className="absolute inset-0 bg-white/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <dialog id="pending_request_modal" className="modal">
                <div className="modal-box bg-white/95 backdrop-blur-xl shadow-2xl border border-white/50">
                  <h3 className="font-bold text-xl bg-gradient-to-r from-gray-800 to-slate-700 bg-clip-text text-transparent">
                    Pending Requests
                  </h3>
                  <div className="mt-4 space-y-3">
                    {chatRequest?.map((request) => (
                      <div
                        key={request.id}
                        className="p-4 bg-gradient-to-r from-slate-50 to-white/50 backdrop-blur-sm rounded-2xl border border-white/50 shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <div className="w-12 h-12 rounded-2xl ring-2 ring-white/50 shadow-lg">
                              <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-xl">
                                {request?.user_name?.[0]?.toUpperCase()}
                              </div>
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-lg text-slate-800 capitalize">
                              {request?.user_name}
                            </p>
                            <p className="text-sm text-slate-600 capitalize mt-1">
                              {request?.subject}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              approveChatHandler(request.websocket_chat_id)
                            }
                            className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-semibold rounded-xl px-4 py-2 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                          >
                            <Check size={16} />
                            Approve
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </div>
          )}
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredConversations?.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => handleChatSelect(conversation.websocket_chat_id)}
              className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 group hover:scale-[1.02] hover:shadow-2xl hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10 hover:border-indigo-200/50 border border-transparent ${
                selectedChat === conversation.websocket_chat_id
                  ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-indigo-300/50 shadow-xl scale-[1.01] ring-2 ring-indigo-500/30"
                  : "hover:border-white/30"
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-xl flex items-center justify-center text-white font-bold text-lg ring-2 ring-white/50">
                    {conversation?.user?.first_name?.[0]?.toUpperCase()}
                  </div>
                  <div
                    className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-3 border-white shadow-lg ${getStatusColor(conversation.status)}`}
                  />
                </div>
                <div className="flex-1 min-w-0 py-1">
                  <h3 className="font-bold text-lg bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent truncate">
                    {conversation?.user?.first_name}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 italic uppercase tracking-wide truncate mt-0.5">
                    {conversation?.subject}
                  </p>
                  <p className="text-sm text-slate-600 truncate mt-1 leading-tight">
                    {conversation.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white/70 backdrop-blur-xl border-l-4">
        {id ? (
          <Outlet context={{ chatList: { chats: localChatList } }} />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 to-white/50">
            <div className="text-center p-12">
              <div className="w-28 h-28 mx-auto mb-8 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl flex items-center justify-center shadow-2xl ring-2 ring-white/50 backdrop-blur-sm">
                <MessageSquareText
                  size={48}
                  className="text-indigo-500 shadow-lg"
                />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
                Select a conversation
              </h3>
              <p className="text-lg text-slate-500 font-medium">
                Choose a chat from the sidebar to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
