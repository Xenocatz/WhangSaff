import { createSlice } from "@reduxjs/toolkit";

const MAX_MESSAGES = 50;

const currentRoomSlice = createSlice({
  name: "currentRoom",
  initialState: { currentRoom: null },
  reducers: {
    setCurrentRoom: (state, action) => {
      state.currentRoom = action.payload;
    },
  },
});

export const { setCurrentRoom } = currentRoomSlice.actions;
export default currentRoomSlice.reducer;
