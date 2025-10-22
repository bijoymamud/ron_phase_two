import React, { useEffect, useRef, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useGetHistoryQuery } from "../../redux/features/baseApi";

const LiveChat = () => {
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(null);
  const { id } = useParams();

  const { data: chatHistory } = useGetHistoryQuery(id);
  // map API chat history into UI-friendly message objects
  const [messages, setMessages] = useState([]);
  const { messageSocket, chatList } = useOutletContext();

  // helper to get the live socket (support ref or direct socket)
  const getSocket = () =>
    messageSocket && messageSocket.current
      ? messageSocket.current
      : messageSocket;

  // attach incoming handlers to the socket so messages appear immediately
  useEffect(() => {
    const sock = getSocket();
    if (!sock) {
      // poll for a short time if the ref isn't yet populated
      let attempts = 0;
      const poll = setInterval(() => {
        attempts += 1;
        const s = getSocket();
        if (s) {
          attachHandler(s);
          clearInterval(poll);
        }
        if (attempts > 20) clearInterval(poll);
      }, 200);
      return () => clearInterval(poll);
    }

    function attachHandler(s) {
      if (!s) return;
      // socket.io
      if (typeof s.on === "function") {
        s.on("message", (data) => {
          const payload = typeof data === "string" ? JSON.parse(data) : data;
          const incoming = {
            id: payload.websocket_message_id || Date.now() + Math.random(),
            from: payload.senderType === "user" ? "user" : "agent",
            text:
              payload.content ||
              payload.message ||
              payload.text ||
              JSON.stringify(payload),
            time: payload.timestamp || new Date(),
            senderName: payload.sender?.username || payload.sender_name || "",
          };
          setMessages((m) => [...m, incoming]);
        });
      } else {
        // WebSocket
        s.onmessage = (ev) => {
          try {
            const payload = JSON.parse(ev.data);
            const incoming = {
              id: payload.websocket_message_id || Date.now() + Math.random(),
              from: payload.senderType === "user" ? "user" : "agent",
              text:
                payload.content ||
                payload.message ||
                payload.text ||
                JSON.stringify(payload),
              time: payload.timestamp || new Date(),
              senderName: payload.sender?.username || payload.sender_name || "",
            };
            setMessages((m) => [...m, incoming]);
          } catch (err) {
            console.warn("Failed to parse incoming websocket message", err);
          }
        };
      }
    }

    attachHandler(sock);

    return () => {
      try {
        if (typeof sock.off === "function") sock.off("message");
        else if (sock) sock.onmessage = null;
      } catch (e) {}
    };
  }, [messageSocket]);

  useEffect(() => {
    // auto-scroll to bottom whenever messages change
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (chatList) {
      console.log(chatList, id, "kkkkkkkkkkkkkkkkkkk");
      const chat = chatList.chats.find((c) => c.websocket_chat_id === id);
      console.log(chat, "lllllllllllllllllllllll");
      setCurrentUser(chat || {});
    }
    // focus input on mount
    inputRef.current?.focus();
  }, [chatList]);

  // when chatHistory loads, transform messages into the component shape
  useEffect(() => {
    if (!chatHistory) return;
    // support responses shaped like { messages: [...] } or same-level array
    const msgs = Array.isArray(chatHistory)
      ? chatHistory
      : chatHistory.messages || chatHistory.data || [];

    const mapped = msgs.map((m) => ({
      id: m.websocket_message_id || m.id,
      from: m.senderType === "user" ? "user" : "agent",
      text: m.content || m.text || m.message || "",
      time: m.timestamp || m.created_at || new Date(),
      senderName:
        m.sender?.username ||
        `${m.sender?.first_name || ""} ${m.sender?.last_name || ""}`.trim(),
    }));

    setMessages(mapped);
  }, [chatHistory]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const msg = {
      id: Date.now(),
      from: "user",
      text: text.trim(),
      time: new Date(),
    };
    // safe-send: try socket.io emit first, then standard WebSocket send
    const socket = messageSocket;
    const payload = { message: text.trim(), websocket_chat_id: id };
    const trySend = (s, p) => {
      if (!s) return false;
      try {
        // socket.io
        if (typeof s.emit === "function") {
          s.emit("message", p);
          return true;
        }
        // WebSocket
        if (typeof s.send === "function" && s.readyState === WebSocket.OPEN) {
          s.send(JSON.stringify(p));
          return true;
        }
      } catch (err) {
        console.warn("Socket send error:", err);
      }
      return false;
    };

    const sent = trySend(socket, payload);
    if (!sent) {
      console.warn("Socket unavailable or not open — marking message pending");
      msg.pending = true;
    }
    setMessages((m) => [...m, msg]);
    setInput("");

    // simulate an agent reply after a short delay
    setIsSending(true);
    setTimeout(
      () => {
        const reply = {
          id: Date.now() + 1,
          from: "agent",
          text: `Auto-reply: Thanks for your message — we received: "${text.trim()}"`,
          time: new Date(),
        };
        setMessages((m) => [...m, reply]);
        setIsSending(false);
      },
      800 + Math.random() * 1200
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
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
      <div className="px-4 py-3 border-b">
        <h2 className="text-lg font-medium">Live Chat</h2>
        <p className="text-sm text-gray-500">
          {currentUser?.user?.full_name || currentUser?.user?.username}
        </p>
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
                {m.text}
                {m.pending && (
                  <span className="ml-2 text-[11px] font-medium text-yellow-600">
                    (unsent)
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
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
            disabled={isSending || !input.trim()}
          >
            {isSending ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LiveChat;
