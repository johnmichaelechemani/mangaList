<script setup>
import { manga, getManga, options, data } from "./store";
import { Icon } from "@iconify/vue";
import { ref, onMounted, Transition } from "vue";
import { getRatingClass, getRatingText } from "./composables";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";
import AddModal from "./components/addModal.vue";
import listCard from "./components/listCard.vue";

const db = getFirestore();
const showModal = ref(false);
ChartJS.register(ArcElement, Tooltip, Legend);

const add = async (mangaData) => {
  try {
    await addDoc(collection(db, "manga"), {
      name: mangaData.name,
      chapter: mangaData.chapter,
      status: mangaData.status,
      rating: mangaData.rating,
      timestamp: serverTimestamp(),
    });
    console.log("Adding Success");
    showModal.value = false;
  } catch (e) {
    console.log("Error", e);
  }
};

onMounted(() => {
  getManga();
});
const addManga = () => {
  showModal.value = !showModal.value;
};
</script>

<template>
  <div class="flex justify-center items-start text-gray-800">
    <div class="border p-5 w-full sm:max-w-96">
      <h1
        class="font-semibold text-center border p-2 text-xs hidden sm:block mb-2"
      >
        Designed in Phone Screen
      </h1>
      <h1 class="font-bold text-lg mb-2">Manga Ratings by Me</h1>

      <div class="flex justify-center items-center">
        <div class="size-48">
          <Pie :data="data" :options="options" />
        </div>
      </div>
      <div>
        <button
          @click="addManga"
          class="w-32 bg-gray-800 my-2 text-white font-semibold text-sm py-2"
        >
          Add Manga
        </button>
      </div>

      <h1 class="font-bold text-lg my-2">
        Manga Lists
        <span class="text-sm bg-gray-800 text-white px-2 rounded-full">{{
          manga.length
        }}</span>
      </h1>

      <listCard :manga="manga" />
    </div>
  </div>

  <!-- modal -->
  <transition>
    <AddModal
      :show-modal="showModal"
      @close="showModal = false"
      @add-manga="add"
    />
  </transition>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap");
:root {
  font-family: "Manrope", serif;
  font-optical-sizing: auto;
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
