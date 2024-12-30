import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";

export const editList = (item) => {
  const db = getFirestore();
  console.log("edit list", item.id, item.name);
};




export const deleteList = (id) => {
  const db = getFirestore();
  try {
    const itemRef = doc(db, "manga", id);
    deleteDoc(itemRef);
    console.log("Item successfully deleted");
  } catch (error) {
    console.error("Error deleting item:", error);
  }
  console.log("delete list", id);
};


export const Time = (timestamp) => {
  if (timestamp) {
    const date = new Date(timestamp.seconds * 1000);
    const now = new Date();

    const hours = date.getHours() % 12 || 12;
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const period = date.getHours() < 12 ? "am" : "pm";
    const time = `${hours}:${minutes} ${period}`;
    if (date.toDateString() === now.toDateString()) {
      return time;
    }
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday ${time}`;
    }
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayName = days[date.getDay()];

    const lastWeek = new Date(now);
    lastWeek.setDate(lastWeek.getDate() - 7);
    if (date > lastWeek) {
      return `${dayName} ${time}`;
    }
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    return `${month} ${day} ${time}`;
  }
  return "";
};