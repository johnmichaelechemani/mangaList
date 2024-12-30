<script setup>
import { manga, getManga, options, generateMangaRatingData } from "./store";
import { Icon } from "@iconify/vue";
import { ref, onMounted, Transition, computed } from "vue";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";
import AddModal from "./components/addModal.vue";
import listCard from "./components/listCard.vue";

const db = getFirestore();
const showModal = ref(false);
ChartJS.register(ArcElement, Tooltip, Legend);

const filteredManga = computed(() => {
  if (!search.value) return manga.value;
  return manga.value.filter((item) =>
    item.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

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

const search = ref("");
const searchList = () => {};

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

      <div class="border shadow flex justify-start items-center gap-1">
        <input
          type="search"
          v-model="search"
          placeholder="Search Manga.."
          class="placeholder:text-sm w-full outline-none p-2"
        />
        <button class="p-2" @click="searchList">
          <Icon
            icon="material-symbols-light:search-rounded"
            width="24"
            height="24"
          />
        </button>
      </div>

      <div class="flex justify-center items-center">
        <div class="size-48">
          <Pie :data="generateMangaRatingData()" :options="options" />
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
      <div class="border my-2 p-2 flex justify-start items-center gap-2">
        <p>
          <Icon
            icon="material-symbols:filter-alt-outline"
            width="24"
            height="24"
          />
        </p>
        <div
          class="border px-1 text-xs font-semibold flex justify-start items-center"
        >
          <Icon
            icon="material-symbols-light:detector-status"
            width="24"
            height="24"
          />
          Status
        </div>
        <div
          class="border px-1 text-xs font-semibold flex justify-start items-center"
        >
          <Icon icon="material-symbols-light:star" width="24" height="24" />
          Ratings
        </div>
      </div>

      <template v-if="filteredManga.length > 0">
        <listCard :manga="filteredManga" />
      </template>
      <div v-else class="text-center p-4 bg-gray-100 rounded-lg text-gray-500">
        <Icon
          icon="mdi:book-search-outline"
          class="mx-auto mb-2"
          width="48"
          height="48"
        />
        <p class="text-xs">No manga found matching "{{ search }}"</p>
        <button
          @click="search = ''"
          class="mt-2 text-xs text-blue-500 font-semibold border p-2"
        >
          Clear Search
        </button>
      </div>
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
