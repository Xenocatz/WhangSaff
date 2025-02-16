import { createSlice } from "@reduxjs/toolkit";

const MAX_MESSAGES = 50;

const currenrRoomSlice = createSlice({
  name: "cuurentRoom",
  initialState: { currentRoom: null, messages: [] },
  reducers: {
    setCurrentRoom: (state, action) => {
      state.currentRoom = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload.slice(0, MAX_MESSAGES);
    },

    addMessages: (state, action) => {
      state.messages.push(action.payload);
      if (state.messages.length > MAX_MESSAGES) {
        state.messages.shift();
      }
    },
  },
});

export const { setCurrentRoom, setMessages, addMessages } =
  currenrRoomSlice.actions;
export default currenrRoomSlice.reducer;
