import { createSlice } from "@reduxjs/toolkit";
import { auth, db } from "../Config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

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
  onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);

      dispatch(setUser({ uid: currentUser.uid, ...userSnap.data() }));
    } else {
      dispatch(clearUser());
    }
  });
};
