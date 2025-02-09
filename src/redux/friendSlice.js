import { createSlice } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../Config/firebase";

const friendSlice = createSlice({
  name: "friend",
  initialState: {
    friends: [],
    loading: true,
  },
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload;
      state.loading = false;
    },
  },
});

export const getFriendList = (currentUserId) => (dispatch) => {
  try {
    const q = query(
      collection(db, "chats"),
      where("members", "array-contains", currentUserId)
    );

    return onSnapshot(q, async (querySnapshot) => {
      const friendList = [];

      // terjemahan timeStamp
      const translatedTime = (timestamp) => {
        const date = timestamp.toDate();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes() + 1).padStart(2, "0");
        return `${hours}:${minutes}`;
      };

      // looping chatRoom
      for (const room of querySnapshot.docs) {
        const chatRoom = room.data();
        const roomId = room.id;
        const otherUserId = chatRoom.members.find((id) => id !== currentUserId);

        const messageTimeStamp = translatedTime(chatRoom.lastMessageTimestamp);

        // data friends
        if (otherUserId) {
          const userRef = doc(db, "users", otherUserId);
          const userSnapshot = await getDoc(userRef);
          if (userSnapshot.exists()) {
            friendList.push({
              id: otherUserId,
              roomId,
              lastMessage: chatRoom.lastMessage,
              lastMessageTimestamp: messageTimeStamp,
              ...userSnapshot.data(),
            });
          }
        }
      }

      dispatch(setFriends(friendList));
    });
  } catch (error) {
    console.error("Error getting friend list: ", error);
    return null;
  }
};

export const { setFriends, removeFriends } = friendSlice.actions;
export default friendSlice.reducer;
