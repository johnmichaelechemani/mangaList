<script setup>
import {
  manga,
  getManga,
  isMangaLoading,
  options,
  generateMangaRatingData,
} from "./store";
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
import ChartLoading from "./components/ChartLoading.vue";
import InfoLoading from "./components/InfoLoading.vue";
import ListLoading from "./components/ListLoading.vue";
import Pagination from "./components/pagination.vue";

const db = getFirestore();
const showModal = ref(false);
ChartJS.register(ArcElement, Tooltip, Legend);
const statusFilter = ref("");
const ratingFilter = ref("");
const sortBy = ref("");
const search = ref("");

// search function
const searchList = () => {};

const ongoing = computed(() => {
  return manga.value.filter((item) => item.status === "ongoing").length;
});
const finished = computed(() => {
  return manga.value.filter((item) => item.status === "finished").length;
});
const dropped = computed(() => {
  return manga.value.filter((item) => item.status === "dropped").length;
});

const filteredAndSortedManga = computed(() => {
  const filterManga = (items) => {
    return items
      .filter(
        (item) =>
          !search.value ||
          item.name.toLowerCase().includes(search.value.toLowerCase())
      )
      .filter(
        (item) => !statusFilter.value || item.status === statusFilter.value
      )
      .filter(
        (item) =>
          !ratingFilter.value || item.rating === Number(ratingFilter.value)
      );
  };

  const sortManga = (items) => {
    return items.sort((a, b) => {
      const aIsReading = a.status === "reading";
      const bIsReading = b.status === "reading";

      if (aIsReading && !bIsReading) return -1;
      if (!aIsReading && bIsReading) return 1;
      switch (sortBy.value) {
        case "rating-asc":
          return a.rating - b.rating;
        case "rating-desc":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  };

  return sortManga(filterManga(manga.value));
});
const add = async (mangaData) => {
  try {
    await addDoc(collection(db, "manga"), {
      name: mangaData.name,
      chapter: mangaData.chapter,
      status: mangaData.status || "reading",
      rating: mangaData.rating || 0,
      country: mangaData.country,
      timestamp: serverTimestamp(),
    });
    console.log("Adding Success");
    showModal.value = false;
  } catch (e) {
    console.log("Error", e);
  }
};

const resetFilters = () => {
  search.value = "";
  statusFilter.value = "";
  ratingFilter.value = "";
  sortBy.value = "";
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

      <div class="flex justify-center items-start pt-3">
        <div v-if="!isMangaLoading" class="w-full border p-2">
          <div
            class="text-xs font-semibold flex justify-start items-center gap-1"
          >
            Manga Total:
            <span class="text-sm font-extrabold">{{ manga.length }}</span>
          </div>
          <div class="flex justify-start items-center gap-1">
            <div
              class="text-xs flex justify-start items-center border p-1 font-semibold"
            >
              <Icon
                icon="material-symbols-light:downloading"
                width="20"
                height="20"
                class="text-orange-500"
              /><span class="">{{ ongoing }}</span>
            </div>
            <div
              class="text-xs flex justify-start items-center border p-1 font-semibold"
            >
              <Icon
                icon="material-symbols-light:done"
                width="20"
                height="20"
                class="text-green-500"
              />
              <span class="">{{ finished }}</span>
            </div>
            <div
              class="text-xs flex justify-start items-center border p-1 font-semibold"
            >
              <Icon
                icon="material-symbols-light:trending-down"
                width="20"
                height="20"
                class="text-red-500"
              />
              <span class="">{{ dropped }}</span>
            </div>
          </div>
        </div>
        <InfoLoading v-else />
        <div class="size-48">
          <Pie
            v-if="!isMangaLoading"
            :data="generateMangaRatingData()"
            :options="options"
          />
          <ChartLoading v-if="isMangaLoading" />
        </div>
      </div>
      <div>
        <button
          @click="addManga"
          class="bg-gray-800 my-2 w-full text-white font-semibold text-sm py-2"
        >
          Add Manga
        </button>
      </div>

      <div class="font-bold flex justify-start items-center gap-2 text-lg my-2">
        Manga Lists
        <span
          v-if="!isMangaLoading"
          class="text-sm bg-gray-800 text-white px-2 rounded-full"
          >{{ manga.length }}</span
        >
        <div
          v-else
          class="w-5 h-5 animate-pulse bg-gray-300 rounded-full"
        ></div>
      </div>

      <div class="border my-2 p-2">
        <div class="text-xs font-semibold flex justify-start items-center">
          <Icon
            icon="material-symbols:filter-alt-outline"
            width="24"
            height="24"
            class="text-blue-400"
          />
          Filter:
        </div>
        <div class="grid grid-cols-2 gap-1">
          <div
            class="border px-1 text-xs font-semibold flex justify-start items-center"
          >
            <Icon
              icon="material-symbols-light:detector-status"
              width="24"
              height="24"
              class="text-cyan-500"
            />
            <select v-model="statusFilter" class="text-xs border w-full px-1">
              <option value="">All Status</option>
              <option value="reading">Reading</option>
              <option value="ongoing">Ongoing</option>
              <option value="finished">Finished</option>
              <option value="dropped">Dropped</option>
            </select>
          </div>
          <div
            class="border px-1 text-xs font-semibold flex justify-start items-center"
          >
            <Icon
              icon="material-symbols:filter-list-rounded"
              width="24"
              height="24"
            />
            <select v-model="sortBy" class="text-xs border w-full px-1">
              <option value="">Sort</option>
              <option value="rating-asc">Low to High</option>
              <option value="rating-desc">High to Low</option>
            </select>
          </div>

          <div
            class="border px-1 text-xs font-semibold flex justify-start items-center"
          >
            <Icon
              icon="material-symbols-light:star"
              width="24"
              height="24"
              class="text-yellow-500"
            />
            <select v-model="ratingFilter" class="text-xs w-full border px-1">
              <option value="">All Ratings</option>
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
          </div>
          <button
            @click="resetFilters"
            class="border px-1 gap-1 text-xs font-semibold flex justify-start items-center"
          >
            <Icon
              icon="material-symbols-light:reset-wrench-outline-rounded"
              width="24"
              height="24"
              class="text-red-500"
            />
            Reset Filters
          </button>
        </div>
      </div>

      <!-- pagination -->
      <Pagination />
      <!--  -->

      <div v-if="!isMangaLoading">
        <template v-if="filteredAndSortedManga.length > 0">
          <listCard :manga="filteredAndSortedManga" />
        </template>
        <div
          v-else
          class="text-center p-4 bg-gray-100 rounded-lg text-gray-500"
        >
          <Icon
            icon="mdi:book-search-outline"
            class="mx-auto mb-2"
            width="48"
            height="48"
          />
          <p class="text-xs">
            No manga found matching
            <span class="font-semibold">{{ search }}</span>
          </p>
          <button
            @click="resetFilters"
            class="mt-2 text-xs text-blue-500 font-semibold border p-2"
          >
            Clear Search
          </button>
        </div>
      </div>
      <ListLoading v-else />
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
