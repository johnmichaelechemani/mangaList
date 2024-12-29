// store.js
import { ref } from "vue";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

export const manga = ref([]);

export const getManga = () => {
  const db = getFirestore();

  try {
    const mangaQuery = query(collection(db, "manga"));
    onSnapshot(mangaQuery, (querySnapshot) => {
      manga.value = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });

    return manga.value;
  } catch (error) {
    console.error("Error fetching manga:", error);
    return [];
  }
};

export const data = {
  labels: ["Best", "Normal", "Poor", "Very Poor"],
  datasets: [
    {
      backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
      data: [40, 20, 80, 10],
    },
  ],
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
};
