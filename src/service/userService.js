import {
  collection,
  addDoc,
  serverTimestamp,
  where,
  getDocs,
  query,
  doc,
  setDoc,
  writeBatch,
  getDoc,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../Config/firebase";
import { toast } from "react-toastify";

export const createChatRoom = async (currentUserId, friendId) => {
  try {
    // bikin chatRoomId
    const createChatsRoomId = (userId1, userId2) => {
      return userId1 < userId2
        ? `${userId1}_${userId2}`
        : `${userId2}_${userId1}`;
    };
    const chatRoomId = createChatsRoomId(currentUserId, friendId);

    // bikin chatRoom
    const chatRoomRef = doc(db, "chats", chatRoomId);
    await setDoc(chatRoomRef, {
      members: [currentUserId, friendId],
      lastMessage: "",
      lastMessageTimestamp: serverTimestamp(),
    });
    const chatRoomSnapshot = await getDoc(chatRoomRef);
    if (!chatRoomSnapshot.exists()) {
      throw new Error("Chat room creation failed!");
    }
    await sendMessage(currentUserId, chatRoomId, "P!");
    // default message
    console.log("Chat room created with ID:", chatRoomId);
    return chatRoomId;
  } catch (error) {
    console.error("Error creating chat room:", error);
  }
};

export const sendMessage = async (
  currentUserId,
  chatRoomId,
  message,
  avatar = null
) => {
  try {
    if (!currentUserId) throw new Error("User not authenticated");
    if (!chatRoomId || !message.trim())
      throw new Error("Invalid chatRoomId or empty message");

    // format waktu
    const date = new Date();
    const formattedDate = () => {
      const milliseconds = date.getTime();
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      return `${day}-${month}-${year}_${milliseconds}`;
    };

    const batch = writeBatch(db);

    const messagesRef = collection(db, "chats", chatRoomId, "messages");
    const newMessageRef = doc(
      messagesRef,
      `${currentUserId}_${formattedDate()}`
    );
    // bikin message
    batch.set(newMessageRef, {
      senderId: currentUserId,
      message: message.trim(),
      avatar: avatar,
      timestamp: serverTimestamp(),
    });

    // update last message
    const chatRoomRef = doc(db, "chats", chatRoomId);
    batch.update(chatRoomRef, {
      lastMessage: message.trim(),
      lastMessageTimestamp: serverTimestamp(),
    });

    await batch.commit();

    console.log("Message sent!");
  } catch (error) {
    console.error("Error sending message:", error.message);
  }
};

export const listenToMessages = (chatRoomId, callback) => {
  const messagesRef = collection(db, "chats", chatRoomId, "messages");
  const q = query(messagesRef, orderBy("timestamp", "asc"));

  // terjemahan timeStamp
  const translatedTime = (timestamp) => {
    const date = timestamp.toDate();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes() + 1).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return onSnapshot(q, (querySnapshot) => {
    const messages = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timestamp: translatedTime(doc.data().timestamp),
    }));
    callback(messages);
  });
};

export const findUserByEmail = async (email) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    const userData = querySnapshot.docs[0].data();
    const userid = querySnapshot.docs[0].id;

    const user = { ...userData, id: userid };
    return user;
  } catch (error) {
    toast.error("User dengan email tersebut tidak ditemukan.");
    console.error("Error finding user by email: ", error);
    return null;
  }
};

export const getCurrentChatRoom = async (chatRoomId, friendId) => {
  try {
    // cari friend
    const userRef = doc(db, "users", friendId);
    const userSnapshot = await getDoc(userRef);
    const userData = userSnapshot.data();
    const roomData = {
      ...userData,
      id: chatRoomId,
    };
    return roomData;
  } catch (error) {
    console.log(error);
  }
};
