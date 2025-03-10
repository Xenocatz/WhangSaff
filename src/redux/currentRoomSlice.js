import { createSlice } from "@reduxjs/toolkit";

const currentRoomSlice = createSlice({
  name: "currentRoom",
  initialState: { currentRoom: [] },
  reducers: {
    setCurrentRoom: (state, action) => {
      state.currentRoom = action.payload;
    },
  },
});

export const { setCurrentRoom } = currentRoomSlice.actions;
export default currentRoomSlice.reducer;
