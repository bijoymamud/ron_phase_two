import { useState, useEffect, useRef } from "react";
import { PiPaperPlaneRightDuotone } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetLoggedUserQuery,
  useSendMessageMutation,
  useStartChatMutation,
  useCloseChatMutation,
} from "../../redux/features/baseApi";
import { setCurrentChatId } from "../../redux/slice/chatSlice";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import { db } from "../../firebase/firebase.config";
import { ref, onChildAdded, off } from "firebase/database";

export default function SupportChat() {
  const [newMessage, setNewMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [messages, setMessages] = useState([]);
  const displayedMessageIds = useRef(new Set());
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);

  const [startChat, { isLoading: isStartingChat }] = useStartChatMutation();
  const [sendMessage] = useSendMessageMutation();
  const [closeChat, { isLoading: isClosingChat }] = useCloseChatMutation();

  useGetLoggedUserQuery();
  const currentChatId = useSelector((state) => state.chatSlice.currentChatId);

  const {
    data: fetchedMessages,
    isLoading, 
    error,
  } = useGetMessagesQuery(currentChatId, {
    skip: !currentChatId,
  });

  useEffect(() => {
    if (fetchedMessages?.messages) {
      const formattedMessages = fetchedMessages.messages.map((message) => ({
        id: message.firebase_message_id,
        content: message.content,
        timestamp: new Date(message.timestamp),
        isSent: message.sender.senderType === "user",
      }));
      setMessages(formattedMessages);
      displayedMessageIds.current.clear();
      formattedMessages.forEach((msg) =>
        displayedMessageIds.current.add(msg.id)
      );
    }
  }, [fetchedMessages]);

  useEffect(() => {
    if (currentChatId) {
      const messagesRef = ref(db, `support_chats/${currentChatId}/messages`);
      const unsubscribe = onChildAdded(messagesRef, (snapshot) => {
        const messageData = snapshot.val();
        const messageId = snapshot.key;

        if (messageData && !displayedMessageIds.current.has(messageId)) {
          displayedMessageIds.current.add(messageId);

          const newMessage = {
            id: messageId,
            content: messageData.content,
            timestamp: new Date(messageData.timestamp),
            isSent: messageData.senderType === "user",
          };

          setMessages((prevMessages) => [
            ...prevMessages.filter((m) => !m.optimistic),
            newMessage,
          ]);
        }
      });

      return () => {
        off(messagesRef, "child_added", unsubscribe);
      };
    }
  }, [currentChatId]); 

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleStartChat = async () => {
    if (!subject.trim()) return;
    try {
      const response = await startChat({ subject }).unwrap();
      const { chat } = response;
      setMessages([]);
      displayedMessageIds.current.clear();
      dispatch(setCurrentChatId(chat.firebase_chat_id));
      setSubject("");
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  const handleCompleteChat = async () => {
    if (!currentChatId) return;
    try {
      await closeChat({ chatId: currentChatId }).unwrap();
      dispatch(setCurrentChatId(null));
      setMessages([]);
      displayedMessageIds.current.clear();
    } catch (error) {
      console.error("Error closing chat:", error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentChatId) return;
    const messageToSend = newMessage;
    const tempId = `optimistic-${Date.now()}`;
    const optimisticMessage = {
      id: tempId,
      content: messageToSend,
      timestamp: new Date(),
      isSent: true,
      optimistic: true,
    };
    setMessages((prevMessages) => [...prevMessages, optimisticMessage]);
    setNewMessage("");
    try {
      await sendMessage({
        chatId: currentChatId,
        message: messageToSend,
      }).unwrap();
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) =>
        prevMessages.filter((m) => m.id !== tempId)
      );
      setNewMessage(messageToSend);
    }
  };

  const formatTime = (date) => {
    if (!date || isNaN(new Date(date))) return "";
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex flex-col h-[60vh]  md:w-[400px] w-[350px] mx-auto bg-base-100 shadow-2xl rounded-xl overflow-hidden">
      <div className="navbar bg-gradient-to-r from-[#0B2A52]/90 to-[#0B2A52] text-base-100 shadow-md px-4">
        <div className="flex-1 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 h-10 rounded-full  bg-white/20"></div>
            </div>
            <div>
              <h2 className="font-bold text-lg dark:text-white">Assistant</h2>
              <p className="text-sm text-success">Online</p>
            </div>
          </div>
          {currentChatId && (
            <button
              onClick={handleCompleteChat}
              disabled={isClosingChat}
              className="bg-green-500 px-2 py-1 rounded-full font-semibold hover:cursor-pointer disabled:bg-gray-500"
            >
              {isClosingChat ? "Closing..." : "Complete"}
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-base-200 bg-gray-300 border border-black/50 dark:bg-gray-300 space-y-4 scroll-smooth">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <span>Loading...</span>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-full text-red-600">
            <span>Error loading messages. Please try again.</span>
          </div>
        ) : !currentChatId ? (
          <div className="flex flex-col items-center justify-center h-full text-base-content/60">
            <div className="text-6xl mb-3 animate-bounce dark:text-black">
              <HiOutlineChatAlt2 />
            </div>
            <p className="text-center text-lg dark:text-gray-900 font-medium">
              Start the conversation!
            </p>
            <div className="w-full h-auto flex flex-col items-center justify-center py-10 gap-4">
              <input
                type="text"
                placeholder="Chat Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="py-3 uppercase w-full input input-bordered flex-1 rounded-md focus-white transition-all"
              />
              <button
                onClick={handleStartChat}
                disabled={isStartingChat || !subject.trim()}
                className={`w-full uppercase rounded-md flex items-center justify-center btn bg-[#0b2a52] text-white cursor-pointer`}
              >
                Start
              </button>
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat ${message.isSent ? "chat-end" : "chat-start"} fade-in-up`}
              >
                {!message.isSent && (
                  <div className="chat-image avatar">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-secondary"></div>
                  </div>
                )}
                <div
                  className={`chat-bubble text-base ${message.isSent ? "chat-bubble-primary" : "chat-bubble-accent"} shadow-md`}
                >
                  {message.content}
                </div>
                <div className="chat-footer text-xs opacity-50 mt-1 text-gray-500">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {currentChatId && (
        <div className="p-4 bg-base-100 border-t border-base-300 dark:border-base-100">
          <form
            onSubmit={handleSendMessage}
            className="flex gap-3 items-center"
          >
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={"Type a message..."}
              className="input input-bordered flex-1 rounded-full focus-white transition-all"
            />
            <button
              type="submit"
              disabled={isStartingChat || !newMessage.trim()}
              className={`btn btn-circle text-white cursor-pointer ${newMessage.trim() && !isStartingChat ? " hover:text-white  hover:scale-105 shadow-lg " : "btn-disabled opacity-80"}`}
            >
              <PiPaperPlaneRightDuotone
                className="text-black dark:text-white "
                size={22}
              />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
