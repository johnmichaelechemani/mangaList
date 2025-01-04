// store.js
import { ref } from "vue";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

export const manga = ref([]);
export const isMangaLoading = ref(false);

export const getManga = async () => {
  const db = getFirestore();
  try {
    isMangaLoading.value = true;
    const mangaQuery = query(
      collection(db, "manga"),
      orderBy("timestamp", "desc")
    );
    const querySnapshot = await getDocs(mangaQuery);
    manga.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    onSnapshot(mangaQuery, (snapshot) => {
      manga.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
  } catch (error) {
    //console.error("Error fetching manga:", error);
    return [];
  } finally {
    isMangaLoading.value = false;
    //  console.log("Finished fetching manga.");
  }
};

export const generateMangaRatingData = () => {
  if (manga.value.length === 0)
    return {
      labels: [],
      datasets: [{ data: [], backgroundColor: [] }],
    };

  const ratingCategories = {
    Best: 0,
    Good: 0,
    Average: 0,
    Poor: 0,
    "Very Poor": 0,
  };

  // Count ratings
  manga.value.forEach((item) => {
    if (item.rating === 5) ratingCategories["Best"]++;
    else if (item.rating === 4) ratingCategories["Good"]++;
    else if (item.rating === 3) ratingCategories["Average"]++;
    else if (item.rating === 2) ratingCategories["Poor"]++;
    else ratingCategories["Very Poor"]++;
  });

  return {
    labels: Object.keys(ratingCategories),
    datasets: [
      {
        backgroundColor: [
          "#41B883",
          "#3498db",
          "#f39c12",
          "#e74c3c",
          "#9b59b6",
        ],
        data: Object.values(ratingCategories),
      },
    ],
  };
};
export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
  },
};
