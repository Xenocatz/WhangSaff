import { createSlice } from "@reduxjs/toolkit";

const currenrRoomSlice = createSlice({
  name: "cuurentRoom",
  initialState: { currentRoom: null },
  reducers: {
    setCurrentRoom: (state, action) => {
      state.currentRoom = action.payload;
    },
  },
});

export const { setCurrentRoom } = currenrRoomSlice.actions;
export default currenrRoomSlice.reducer;
