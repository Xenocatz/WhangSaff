import { createSlice } from "@reduxjs/toolkit";
import { auth, database, db } from "../Config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { onDisconnect, ref, set, update } from "firebase/database";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    loading: true,
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.loading = false;
    },
  },
});
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

export const listenToAuthChanges = () => (dispatch) => {
  const updateStatusUser = (userId) => {
    const statusRef = ref(database, `status/${userId}`);

    update(statusRef, {
      online: true,
      lastSeen: null,
    });

    onDisconnect(statusRef).set({
      online: false,
      lastSeen: Date.now(),
    });
  };

  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      updateStatusUser(currentUser.uid);
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);

      dispatch(setUser({ uid: currentUser.uid, ...userSnap.data() }));
    } else {
      dispatch(clearUser());
    }
  });

  return unsubscribe;
};
