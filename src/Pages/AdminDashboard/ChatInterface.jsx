import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import {
  useApproveChatMutation,
  useGetActiveChatsQuery,
} from "../../redux/features/baseApi";
import { Check, MessageSquarePlus } from "lucide-react";

const ChatInterface = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: chatList } = useGetActiveChatsQuery();
  const [approveChat] = useApproveChatMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatRequest, setChatRequest] = useState([]);

  const socketRef = useRef(null);
  const newSocketRef = useRef(null);
  const token = localStorage.getItem("access_token");
  // per-chat message socket (created when `id` changes)
  const messageSocketRef = useRef(null);

  useEffect(() => {
    if (!token) return;

    const wsUrl = `wss://backend.valrpro.com/ws/admin/chat-list/?Authorization=Bearer ${token}`;
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    socketRef.current.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data);
        const chatRequest = response?.chats;
        setChatRequest(chatRequest);
        console.log(chatRequest, "pending_request");
        console.log("chatData:", response);
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    socketRef.current.onclose = (event) => {
      console.log("WebSocket disconnected:", event.reason);
    };

    socketRef.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [token]);
  useEffect(() => {
    // create per-chat websocket when `id` is available
    try {
      if (!id || !token) return;

      // close existing socket if any
      if (messageSocketRef.current) {
        try {
          messageSocketRef.current.close();
        } catch (e) {}
        messageSocketRef.current = null;
      }

      const ws = new WebSocket(
        `wss://backend.valrpro.com/ws/support-chat/${id}/?Authorization=Bearer ${token}`
      );
      messageSocketRef.current = ws;

      ws.onopen = () => {
        console.log("message socket opened for chat:", id);
      };

      ws.onmessage = (event) => {
        try {
          console.log(event, "message received event");
          const res = JSON.parse(event.data);
          console.log(res, "the message i got");
        } catch (err) {
          console.error("Error parsing message event:", err);
        }
      };

      ws.onclose = (ev) => {
        console.log("message socket closed:", ev.reason || ev);
      };

      ws.onerror = (err) => {
        console.error("message socket error:", err);
      };
    } catch (err) {
      console.log("error on message socket. Error:", err);
    }
    // cleanup when id/token changes
    return () => {
      if (messageSocketRef.current) {
        try {
          messageSocketRef.current.close();
        } catch (e) {}
        messageSocketRef.current = null;
      }
    };
  }, [id]);

  const filteredConversations = chatList?.chats?.filter((conv) => {
    const fullName =
      `${conv?.user?.first_name || ""} ${conv?.user?.last_name || ""}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
    navigate(`/admin/livechat/${chatId}`);

    // ✅ join room (custom event via backend)
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const joinMessage = JSON.stringify({
        action: "join_room",
        room_id: chatId,
      });
      socketRef.current.send(joinMessage);
      console.log("Joined room:", chatId);
    }
  };

  //approve chat requestq
  const approveChatHandler = (chatId, test) => {
    !test && approveChat(chatId);
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "offline":
        return "bg-gray-400";
      case "away":
        return "bg-yellow-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="flex h-[calc(100vh-100px)] bg-gray-50 rounded-lg border border-gray-200">
      {/* Sidebar - Conversation List */}
      <div className="w-1/3 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
          <div className="mt-3 relative">
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 pl-10 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* for pending request */}
          {chatRequest?.length > 0 && (
            <div className="pt-3 flex items-center justify-end">
              <button
                className=""
                onClick={() =>
                  document.getElementById("pending_request_modal").showModal()
                }
              >
                <button>
                  <h1 className="text-sm font-semibold flex items-center gap-1 bg-gradient-to-r from-[#0A3161] to-purple-600 bg-clip-text text-transparent">
                    <MessageSquarePlus size={16} />
                    Request: {chatRequest.length}
                  </h1>
                </button>
              </button>
              <dialog id="pending_request_modal" className="modal bijoyvhai">
                <div className="modal-box dark:bg-white">
                  <h3 className="font-bold text-lg">Hello!</h3>
                  <div>
                    {chatRequest?.map((request) => (
                      <div
                        key={request.id}
                        onClick={() => {
                          console.log(request, "bijoy");
                          approveChatHandler(request.websocket_chat_id, true);
                        }}
                        className="p-4 border-b border-gray-100"
                      >
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="w-10 rounded-full">
                              <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                            </div>
                          </div>
                          <div className="flex items-center justify-between w-full">
                            <div>
                              <p>{request?.user_name}</p>
                              <p className="capitalize text-sm text-gray-600">
                                {request?.subject}
                              </p>
                            </div>

                            <div>
                              <button
                                onClick={() =>
                                  approveChatHandler(request.websocket_chat_id)
                                }
                                className="flex gap-1 items-center bg-gray-400 text-white text-sm rounded-md px-2 py-1"
                              >
                                <Check size={14} />
                                Approve
                              </button>
                            </div>
                          </div>
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

        <div className="flex-1 overflow-y-auto">
          {filteredConversations?.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => handleChatSelect(conversation.websocket_chat_id)}
              className={`p-4 border-b border-gray-100 cursor-pointer transition-colors duration-200 ${
                selectedChat === conversation.id
                  ? "bg-blue-50 border-blue-200"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {conversation.avatar}
                  </div>
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(
                      conversation.status
                    )}`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate text-base">
                    {conversation?.user?.first_name}
                  </h3>
                  <h3 className="font-semibold text-gray-600 truncate italic text-[10px]">
                    {conversation?.subject}
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

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {id ? (
          <Outlet
            context={{
              socket: socketRef.current,
              // pass the ref itself so children can read .current when it becomes available
              messageSocket: messageSocketRef,
              chatList,
            }}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-500">
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
