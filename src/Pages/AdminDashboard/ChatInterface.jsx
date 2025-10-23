// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useParams, Outlet } from "react-router-dom";
// import {
//   useApproveChatMutation,
//   useGetActiveChatsQuery,
// } from "../../redux/features/baseApi";
// import {
//   Check,
//   MessageSquarePlus,
//   MessageSquareText,
//   Search,
// } from "lucide-react";

// const ChatInterface = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { data: chatList, refetch: refetchChats } = useGetActiveChatsQuery();
//   const [approveChat] = useApproveChatMutation();

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedChat, setSelectedChat] = useState(id || null);
//   const [chatRequest, setChatRequest] = useState([]);
//   const [localChatList, setLocalChatList] = useState([]);
//   const socketRef = useRef(null);
//   const token = localStorage.getItem("access_token");
//   const searchInputRef = useRef(null);

//   // Handle search input focus
//   useEffect(() => {
//     const handleFocus = (e) => {
//       if (e.target === searchInputRef.current) {
//         e.stopPropagation();
//       }
//     };

//     document.addEventListener("focusin", handleFocus);
//     return () => {
//       document.removeEventListener("focusin", handleFocus);
//     };
//   }, []);

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
//         }
//         if (response.type === "new_chat") {
//           setChatRequest((prev) => [...prev, response.chat]);
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

//   // Update local chat list from API
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

//   // Sync selectedChat with URL param id
//   useEffect(() => {
//     setSelectedChat(id || null);
//   }, [id]);

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
//     }
//   };

//   const approveChatHandler = async (chatId) => {
//     try {
//       await approveChat(chatId).unwrap();
//       refetchChats();
//       setChatRequest((prev) =>
//         prev.filter((req) => req.websocket_chat_id !== chatId)
//       );
//     } catch (err) {
//       console.error("Error approving chat:", err);
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "online":
//         return "bg-emerald-400 shadow-emerald-400/50";
//       case "offline":
//         return "bg-slate-400 shadow-slate-400/50";
//       case "away":
//         return "bg-amber-400 shadow-amber-400/50";
//       default:
//         return "bg-slate-400 shadow-slate-400/50";
//     }
//   };

//   return (
//     <div className="flex h-[83vh] bg-gradient-to-br from-slate-50 via-white to-blue-50 border border-white/50 shadow-md">
//       {/* Sidebar */}
//       <div className="w-80 border-r border-white/30 bg-white/80 backdrop-blur-xl flex flex-col">
//         <div className="p-6 border-b border-white/50 bg-gradient-to-r from-indigo-600/10 to-purple-600/10">
//           <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//             Messages
//           </h2>
//           <div className="mt-6 relative group">
//             <input
//               ref={searchInputRef}
//               type="text"
//               placeholder="Search conversations..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-5 py-3 pl-12 bg-white/70 backdrop-blur-sm border-2 border-white/50 rounded-2xl text-lg font-medium shadow-xl transition-all duration-300 focus:outline-none focus:border-indigo-400/80 focus:ring-4 focus:ring-indigo-500/20 focus:shadow-2xl hover:shadow-2xl hover:border-indigo-300/80 hover:bg-white/90"
//             />
//             <Search className="absolute left-4 top-3.5 h-6 w-6 text-slate-400 group-focus-within:text-indigo-500 transition-colors duration-300" />
//             <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 to-purple-500/5 scale-0 group-focus-within:scale-100 transition-transform duration-300" />
//           </div>
//           {chatRequest?.length > 0 && (
//             <div className="mt-6">
//               <button
//                 onClick={() =>
//                   document.getElementById("pending_request_modal").showModal()
//                 }
//                 className="group relative flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
//               >
//                 <MessageSquarePlus size={18} />
//                 <span>Requests: {chatRequest.length}</span>
//                 <div className="absolute inset-0 bg-white/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               </button>
//               <dialog id="pending_request_modal" className="modal">
//                 <div className="modal-box bg-white/95 backdrop-blur-xl shadow-2xl border border-white/50">
//                   <h3 className="font-bold text-xl bg-gradient-to-r from-gray-800 to-slate-700 bg-clip-text text-transparent">
//                     Pending Requests
//                   </h3>
//                   <div className="mt-4 space-y-3">
//                     {chatRequest?.map((request) => (
//                       <div
//                         key={request.id}
//                         className="p-4 bg-gradient-to-r from-slate-50 to-white/50 backdrop-blur-sm rounded-2xl border border-white/50 shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 group"
//                       >
//                         <div className="flex items-center gap-4">
//                           <div className="avatar">
//                             <div className="w-12 h-12 rounded-2xl ring-2 ring-white/50 shadow-lg">
//                               <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-xl">
//                                 {request?.user_name?.[0]?.toUpperCase()}
//                               </div>
//                             </div>
//                           </div>
//                           <div className="flex-1">
//                             <p className="font-semibold text-lg text-slate-800 capitalize">
//                               {request?.user_name}
//                             </p>
//                             <p className="text-sm text-slate-600 capitalize mt-1">
//                               {request?.subject}
//                             </p>
//                           </div>
//                           <button
//                             onClick={() =>
//                               approveChatHandler(request.websocket_chat_id)
//                             }
//                             className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-semibold rounded-xl px-4 py-2 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
//                           >
//                             <Check size={16} />
//                             Approve
//                           </button>
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
//         <div className="flex-1 overflow-y-auto p-2 space-y-1">
//           {filteredConversations?.map((conversation) => (
//             <div
//               key={conversation.id}
//               onClick={() => handleChatSelect(conversation.websocket_chat_id)}
//               className={`p-2 flex flex-col gap-5 rounded-2xl cursor-pointer transition-all duration-300 group hover:shadow-md hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10 hover:border-indigo-200/50 border border-b-2 border-as ${
//                 selectedChat === conversation.websocket_chat_id
//                   ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-indigo-300/50 shadow-md ring-1 ring-indigo-500/30"
//                   : "hover:border-white/30"
//               }`}
//             >
//               <div className="flex items-start space-x-4">
//                 <div className="relative flex-shrink-0">
//                   <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-xl flex items-center justify-center text-white font-bold text-lg ring-2 ring-white/50">
//                     {conversation?.user?.first_name?.[0]?.toUpperCase()}
//                   </div>
//                 </div>
//                 <div className="min-w-0">
//                   <p className="text-[12px] font-medium text-slate-500 italic uppercase tracking-wide truncate mt-0.5">
//                     {conversation?.subject}
//                   </p>
//                   <h3 className="font-bold text-sm bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent truncate">
//                     {conversation?.user?.username}
//                   </h3>
//                   <p className="text-sm text-slate-600 truncate mt-1 leading-tight">
//                     {conversation.lastMessage}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="flex-1 flex flex-col bg-white/70 backdrop-blur-xl border-l-4">
//         {id ? (
//           <Outlet context={{ chatList: { chats: localChatList } }} />
//         ) : (
//           <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-slate-50 to-white/50">
//             <div className="text-center p-12">
//               <div className="w-28 h-28 mx-auto mb-8 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl flex items-center justify-center shadow-2xl ring-2 ring-white/50 backdrop-blur-sm">
//                 <MessageSquareText
//                   size={48}
//                   className="text-indigo-500 shadow-lg"
//                 />
//               </div>
//               <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-3">
//                 Select a conversation
//               </h3>
//               <p className="text-lg text-slate-500 font-medium">
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
  const [selectedChat, setSelectedChat] = useState(id || null);
  const [chatRequest, setChatRequest] = useState([]);
  const [localChatList, setLocalChatList] = useState([]);
  const socketRef = useRef(null);
  const token = localStorage.getItem("access_token");
  const searchInputRef = useRef(null);

  // Handle search input focus
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

  // WebSocket for chat list updates
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

  // Update local chat list from API
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

  // Sync selectedChat with URL param id
  useEffect(() => {
    setSelectedChat(id || null);
  }, [id]);

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

  return (
    <div className="flex h-[83vh] bg-white border border-gray-200 shadow-lg">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-[#0A3161]/5 to-[#0A3161]/10">
          <h2 className="text-2xl font-bold text-[#0A3161]">Messages</h2>
          <div className="mt-6 relative group">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 pl-12 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium shadow-sm transition-all duration-300 focus:outline-none focus:border-[#0A3161] focus:ring-2 focus:ring-[#0A3161]/20 hover:border-[#0A3161]/50"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-[#0A3161] transition-colors duration-300" />
          </div>
          {chatRequest?.length > 0 && (
            <div className="mt-6">
              <button
                onClick={() =>
                  document.getElementById("pending_request_modal").showModal()
                }
                className="flex items-center gap-2 px-4 py-2 bg-[#0A3161] text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:bg-[#0A3161]/90 transition-all duration-300"
              >
                <MessageSquarePlus size={18} />
                <span>Requests: {chatRequest.length}</span>
              </button>
              <dialog id="pending_request_modal" className="modal">
                <div className="modal-box bg-white shadow-2xl border border-gray-200">
                  <h3 className="font-bold text-xl text-[#0A3161]">
                    Pending Requests
                  </h3>
                  <div className="mt-4 space-y-3">
                    {chatRequest?.map((request) => (
                      <div
                        key={request.id}
                        className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md hover:border-[#0A3161]/30 transition-all duration-300"
                      >
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <div className="w-12 h-12 rounded-lg ring-2 ring-gray-200">
                              <div className="w-full h-full bg-[#0A3161] rounded-lg flex items-center justify-center text-white font-bold text-lg">
                                {request?.user_name?.[0]?.toUpperCase()}
                              </div>
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-base text-gray-800 capitalize">
                              {request?.user_name}
                            </p>
                            <p className="text-sm text-gray-600 capitalize mt-1">
                              {request?.subject}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              approveChatHandler(request.websocket_chat_id)
                            }
                            className="flex items-center gap-2 bg-[#0A3161] text-white text-sm font-semibold rounded-lg px-4 py-2 shadow-md hover:bg-[#0A3161]/90 transition-all duration-300"
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
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredConversations?.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => handleChatSelect(conversation.websocket_chat_id)}
              className={`p-3 flex flex-col gap-3 rounded-xl cursor-pointer transition-all duration-300 border ${
                selectedChat === conversation.websocket_chat_id
                  ? "bg-[#0A3161]/10 border-[#0A3161]/30 shadow-sm"
                  : "border-transparent hover:bg-gray-50 hover:border-gray-200"
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 bg-[#0A3161] rounded-lg flex items-center justify-center text-white font-bold text-base">
                    {conversation?.user?.first_name?.[0]?.toUpperCase()}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide truncate">
                    {conversation?.subject}
                  </p>
                  <h3 className="font-bold text-sm text-[#0A3161] truncate mt-1">
                    {conversation?.user?.username}
                  </h3>
                  <p className="text-sm text-gray-600 truncate mt-1">
                    {conversation.lastMessage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col bg-white">
        {id ? (
          <Outlet context={{ chatList: { chats: localChatList } }} />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center p-12">
              <div className="w-24 h-24 mx-auto mb-6 bg-[#0A3161]/10 rounded-2xl flex items-center justify-center">
                <MessageSquareText size={40} className="text-[#0A3161]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0A3161] mb-2">
                Select a conversation
              </h3>
              <p className="text-base text-gray-600">
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
