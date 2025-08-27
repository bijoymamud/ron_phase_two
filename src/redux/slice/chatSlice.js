



import { createSlice } from "@reduxjs/toolkit";

const getInitialChatId = () => {
	try {
		const savedChatId = localStorage.getItem("currentChatId");
		return savedChatId ? JSON.parse(savedChatId) : null;
	} catch (error) {
		console.error("Could not parse chat ID from localStorage", error);
		return null;
	}
};

const getInitialUser = () => {
	try {
		const savedUser = localStorage.getItem("chatUser");
		return savedUser ? JSON.parse(savedUser) : null;
	} catch (error) {
		console.error("Could not parse user data from localStorage", error);
		return null;
	}
};

const chatSlice = createSlice({
	name: "chatSlice",
	initialState: {
		currentChatId: getInitialChatId(),
		user: getInitialUser(),
		messages: [],
		activeChats: [],
		showNewChatForm: false,
		chatSubject: "",
	},
	reducers: {
		setCurrentChatId(state, action) {
			const chatId = action.payload;
			state.currentChatId = chatId;
			if (chatId) {
				localStorage.setItem("currentChatId", JSON.stringify(chatId));
			} else {
				localStorage.removeItem("currentChatId");
			}
		},
		setUser(state, action) {
			const user = action.payload;
			state.user = user;
			if (user) {
				localStorage.setItem("chatUser", JSON.stringify(user));
			} else {
				localStorage.removeItem("chatUser");
			}
		},
		setMessages(state, action) {
			state.messages = action.payload;
		},
		addMessage(state, action) {
			state.messages.push(action.payload);
		},
		setActiveChats(state, action) {
			state.activeChats = action.payload;
		},
		setShowNewChatForm(state, action) {
			state.showNewChatForm = action.payload;
		},
		setChatSubject(state, action) {
			state.chatSubject = action.payload;
		},
		clearChatState(state) {
			localStorage.removeItem("currentChatId");
			localStorage.removeItem("chatUser");
			state.currentChatId = null;
			state.user = null;
			state.messages = [];
			state.showNewChatForm = false;
			state.chatSubject = "";
		},
	},
});

export const {
	setCurrentChatId,
	setUser,
	setMessages,
	addMessage,
	setActiveChats,
	setShowNewChatForm,
	setChatSubject,
	clearChatState,
} = chatSlice.actions;

export default chatSlice.reducer;
