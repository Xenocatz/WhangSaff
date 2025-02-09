import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";
import friendSliceReducer from "./friendSlice";
import currentRoomReducer from "./currentRoomSlice";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user: userSliceReducer,
  friend: friendSliceReducer,
  currentRoom: currentRoomReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
export const persistor = persistStore(store);
