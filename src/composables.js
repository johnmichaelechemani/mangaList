import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";

export const editList = (id) => {
  const db = getFirestore();
  console.log("edit list", id);
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
