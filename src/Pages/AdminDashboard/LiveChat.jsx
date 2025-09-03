import React, { useState, useEffect, useRef } from "react";
import { Search, Send, ArrowLeft } from "lucide-react";
import {
  useGetActiveChatsQuery,
  useGetLoggedUserQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
} from "../../redux/features/baseApi";
import { db } from "../../firebase/firebase.config";
import {
  ref,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  off,
} from "firebase/database";
import { HiOutlineChatAlt2 } from "react-icons/hi";

// Format time safely
const formatTime = (dateString) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch (e) {
    return "";
  }
};

const ChatListItem = React.memo(
  ({ chat, selectedChatId, handleSelectChat }) => (
    <div
      className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
        selectedChatId === chat.firebase_chat_id
          ? "bg-blue-50 border-l-4 border-l-blue-500"
          : ""
      }`}
      onClick={() => handleSelectChat(chat.firebase_chat_id)}
    >
      <div className="flex items-center space-x-3">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content rounded-full w-10">
            <span className="text-xl">
              {chat.user_name ? chat.user_name.charAt(0).toUpperCase() : "?"}
            </span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {chat.user_name || "Unknown User"}
          </p>
          <p className="text-xs text-gray-600 truncate">
            {chat.subject?.subject || "No Subject"}
          </p>
          <p className="text-xs text-gray-400">
            {formatTime(chat.last_message_at)}
          </p>
        </div>
      </div>
    </div>
  )
);

const LiveChat = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [activeChats, setActiveChats] = useState([]);
  const [showChatList, setShowChatList] = useState(true);
  const displayedMessageIds = useRef(new Set());
  const messagesEndRef = useRef(null);

  // RTK Query Hooks (declared once)
  const { data: initialChatsData, isLoading: isLoadingInitialChats } =
    useGetActiveChatsQuery(undefined, { pollingInterval: 1000 });
  useGetLoggedUserQuery();
  const { data: fetchedMessages, isLoading: isLoadingMessages } =
    useGetMessagesQuery(selectedChatId, { skip: !selectedChatId });
  const [sendMessage] = useSendMessageMutation();

  // EFFECT 1: Set initial chats list and listen for real-time updates
  useEffect(() => {
    if (initialChatsData?.active_chats) {
      setActiveChats(initialChatsData.active_chats);
    }

    const activeChatsRef = ref(db, "active_support_chats");
    const handleChildAdded = (snapshot) => {
      const newChat = { firebase_chat_id: snapshot.key, ...snapshot.val() };
      setActiveChats((currentChats) =>
        currentChats.some(
          (c) => c.firebase_chat_id === newChat.firebase_chat_id
        )
          ? currentChats
          : [...currentChats, newChat]
      );
    };
    const handleChildChanged = (snapshot) => {
      const updatedData = { firebase_chat_id: snapshot.key, ...snapshot.val() };
      setActiveChats((currentChats) =>
        currentChats.map((chat) =>
          chat.firebase_chat_id === updatedData.firebase_chat_id
            ? updatedData
            : chat
        )
      );
    };
    const handleChildRemoved = (snapshot) => {
      const removedChatId = snapshot.key;
      setActiveChats((currentChats) =>
        currentChats.filter((chat) => chat.firebase_chat_id !== removedChatId)
      );
      if (selectedChatId === removedChatId) {
        setSelectedChatId(null);
        setShowChatList(true);
      }
    };

    onChildAdded(activeChatsRef, handleChildAdded);
    onChildChanged(activeChatsRef, handleChildChanged);
    onChildRemoved(activeChatsRef, handleChildRemoved);

    return () => {
      off(activeChatsRef, "child_added", handleChildAdded);
      off(activeChatsRef, "child_changed", handleChildChanged);
      off(activeChatsRef, "child_removed", handleChildRemoved);
    };
  }, [initialChatsData, selectedChatId]);

  // EFFECT 2: Load historical messages for a selected chat
  useEffect(() => {
    if (fetchedMessages?.messages) {
      const formatted = fetchedMessages.messages.map((m) => ({
        id: m.firebase_message_id,
        content: m.content,
        timestamp: new Date(m.timestamp),
        isSentByAdmin: m.sender.senderType === "admin",
      }));
      setMessages(formatted);
      displayedMessageIds.current.clear();
      formatted.forEach((m) => displayedMessageIds.current.add(m.id));
    }
  }, [fetchedMessages]);

  // EFFECT 3: Real-time listener for new messages
  useEffect(() => {
    if (db && selectedChatId) {
      const messagesRef = ref(db, `support_chats/${selectedChatId}/messages`);
      const handleMessageAdded = (snapshot) => {
        const messageData = snapshot.val();
        const messageId = snapshot.key;
        if (messageData && !displayedMessageIds.current.has(messageId)) {
          displayedMessageIds.current.add(messageId);
          const newMessage = {
            id: messageId,
            content: messageData.content,
            timestamp: new Date(messageData.timestamp),
            isSentByAdmin: messageData.senderType === "admin",
          };
          setMessages((prev) => [
            ...prev.filter((m) => !m.optimistic),
            newMessage,
          ]);
        }
      };
      onChildAdded(messagesRef, handleMessageAdded);
      return () => off(messagesRef, "child_added", handleMessageAdded);
    }
  }, [selectedChatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSelectChat = (firebaseChatId) => {
    setMessages([]);
    displayedMessageIds.current.clear();
    setSelectedChatId(firebaseChatId);
    setShowChatList(false);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChatId) return;
    const messageToSend = newMessage;
    const tempId = `optimistic-${Date.now()}`;
    const optimisticMessage = {
      id: tempId,
      content: messageToSend,
      timestamp: new Date(),
      isSentByAdmin: true,
      optimistic: true,
    };
    setMessages((prev) => [...prev, optimisticMessage]);
    setNewMessage("");
    try {
      await sendMessage({
        chatId: selectedChatId,
        message: messageToSend,
      }).unwrap();
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
      setNewMessage(messageToSend);
    }
  };

  const filteredChats = Array.isArray(activeChats)
    ? activeChats.filter(
        (chat) =>
          chat.user_name &&
          chat.user_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  const selectedChatDetails = Array.isArray(activeChats)
    ? activeChats.find((chat) => chat.firebase_chat_id === selectedChatId)
    : null;

  return (
    <div className="w-full h-full bg-gray-50">
      <div className="w-full h-full sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6 h-[80vh]">
          {/* Chat List */}
          <div
            className={`${
              showChatList ? "block" : "hidden"
            } lg:block lg:col-span-1 bg-white rounded-lg border shadow-sm flex flex-col h-[80vh]`}
          >
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Active Chats
              </h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="overflow-y-auto h-[85%] flex-1">
              {isLoadingInitialChats && activeChats.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  Loading Chats...
                </div>
              ) : (
                filteredChats.map((chat) => (
                  <ChatListItem
                    key={chat.firebase_chat_id}
                    chat={chat}
                    selectedChatId={selectedChatId}
                    handleSelectChat={handleSelectChat}
                  />
                ))
              )}
            </div>
          </div>

          {showChatList && window.innerWidth < 500 ? (
            ""
          ) : (
            <div
              className={`${
                !showChatList || selectedChatDetails ? "block" : "hidden"
              } lg:block lg:col-span-3 bg-white rounded-lg border shadow-sm flex flex-col h-[80vh]`}
            >
              {selectedChatDetails ? (
                <div className="h-full border relative">
                  <div className="p-4 border-b flex items-center justify-between absolute top-0 left-0 right-0 bg-white h-[10%]">
                    <div className="flex items-center space-x-3">
                      <button
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
                        onClick={() => setShowChatList(true)}
                      >
                        <ArrowLeft className="h-5 w-5 text-gray-500" />
                      </button>
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-10 m-auto">
                          <div className="text-xl w-fit ">
                            {selectedChatDetails.user_name
                              ? selectedChatDetails.user_name
                                  .charAt(0)
                                  .toUpperCase()
                              : "?"}
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm md:text-lg font-semibold text-gray-900">
                          {selectedChatDetails.user_name || "Unknown User"}
                        </h3>
                        <p className="text-xs hidden md:block md:text-sm text-gray-500">
                          {selectedChatDetails.subject?.subject || "No Subject"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-y-auto p-4 space-y-4 h-[90%]">
                    {isLoadingMessages ? (
                      <div className="flex justify-center items-center h-full">
                        Loading...
                      </div>
                    ) : (
                      <>
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${
                              message.isSentByAdmin
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <div
                              className={`max-w-[80%] sm:max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${
                                message.isSentByAdmin
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-100 text-gray-900"
                              } ${message.optimistic ? "opacity-60" : ""}`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p
                                className={`text-xs text-right mt-1 ${
                                  message.isSentByAdmin
                                    ? "text-blue-100"
                                    : "text-gray-500"
                                }`}
                              >
                                {formatTime(message.timestamp)}
                              </p>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </>
                    )}
                  </div>

                  <div className="p-4 border-t bg-gray-50 absolute bottom-0 left-0 right-0">
                    <div className="flex space-x-2">
                      <textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        placeholder="Type your message..."
                        className="flex-1 resize-none border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        rows={2}
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors inline-flex items-center justify-center disabled:opacity-50"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center h-[10%]">
                  <div className="text-center">
                    <HiOutlineChatAlt2 className="mx-auto text-6xl text-gray-300" />
                    <p className="text-gray-500 mt-2">
                      Select a chat to see the conversation
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
