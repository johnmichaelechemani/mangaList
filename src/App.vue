<script setup>
import { manga, getManga, options, data } from "./store";
import { Icon } from "@iconify/vue";
import { ref, onMounted, Transition } from "vue";
import { Bar } from "vue-chartjs";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

const db = getFirestore();
const name = ref("");
const chapter = ref("");
const status = ref("");
const rating = ref("");
const showModal = ref(false);

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);
const clear = () => {
  name.value = "";
  chapter.value = "";
  status.value = "";
  rating.value = "";
};
const add = async () => {
  try {
    await addDoc(collection(db, "manga"), {
      name: name.value,
      chapter: chapter.value,
      status: status.value,
      rating: rating.value,
      timestamp: serverTimestamp(),
    });

    console.log("Adding Success");
    clear();
    showModal.value = false;
    clear();
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

const editList = (id) => {
  console.log("edit list", id);
};
const deleteList = (id) => {
  try {
    const itemRef = doc(db, "manga", id);
    deleteDoc(itemRef);
    console.log("Item successfully deleted");
  } catch (error) {
    console.error("Error deleting item:", error);
  }
  console.log("delete list", id);
};
</script>

<template>
  <div
    class="flex justify-center items-start h-screen bg-gray-100 text-gray-800"
  >
    <div class="border p-5 w-full">
      <h1 class="font-bold text-lg mb-2">Manga Ratings by Me</h1>

      <div class="flex justify-center items-center">
        <div class="size-52">
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
      <!-- table -->
      <div class="flex flex-wrap gap-2">
        <div class="relative overflow-x-auto shadow-sm w-full">
          <table class="w-full text-sm text-left">
            <thead class="text-xs text-gray-800 border">
              <tr>
                <th scope="col" class="px-2 py-3">Name</th>
                <th scope="col" class="px-2 py-3">Chapter</th>
                <th scope="col" class="px-2 py-3">Status</th>
                <th scope="col" class="px-2 py-3">Rating</th>

                <th scope="col" class="px-2 py-3">Action</th>
              </tr>
            </thead>
            <tbody v-for="(item, index) in manga" :key="index">
              <tr class="border-b">
                <th scope="row" class="px-2 py-2 font-medium whitespace-nowrap">
                  {{ item.name }}
                </th>
                <td class="px-2 py-3">{{ item.chapter }}</td>
                <td class="px-2 py-3">{{ item.status }}</td>
                <td class="px-2 py-3">{{ item.rating }}</td>
                <td class="px-2 py-3 flex justify-start items-center gap-2">
                  <button
                    @click="editList(item.id)"
                    class="font-medium text-green-500 border border-green-500/20 p-1"
                  >
                    <Icon
                      icon="material-symbols-light:edit-outline"
                      width="20"
                      height="20"
                    />
                  </button>
                  <button
                    @click="deleteList(item.id)"
                    class="font-medium text-red-500 border border-red-500/20 p-1"
                  >
                    <Icon
                      icon="material-symbols-light:restore-from-trash-outline"
                      width="20"
                      height="20"
                    />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- modal -->
  <transition>
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 bg-gray-800/30 backdrop-blur"
    >
      <div
        class="relative flex justify-center items-center h-full text-gray-800"
      >
        <div class="relative bg-gray-200 border p-5">
          <form action="" @submit.prevent="add">
            <!-- add manga -->
            <div class="flex justify-between items-center mb-2">
              <p class="text-lg font-extrabold">Enter Manga Data</p>
              <div @click="addManga">
                <Icon
                  icon="material-symbols-light:close"
                  width="24"
                  height="24"
                />
              </div>
            </div>

            <div class="grid sm:grid-cols-2 grid-cols-1 gap-2">
              <div class="my-1">
                <p class="text-xs font-semibold">Name</p>
                <input
                  type="text"
                  v-model="name"
                  required
                  class="border border-gray-700/50 p-1 text-xs w-full outline-none bg-transparent"
                />
              </div>
              <div class="my-1">
                <p class="text-xs font-semibold">Chapter</p>
                <input
                  v-model="chapter"
                  type="text"
                  required
                  class="border p-1 border-gray-700/50 text-xs w-full outline-none bg-transparent"
                />
              </div>
              <div class="my-1">
                <p class="text-xs font-semibold">Status</p>
                <input
                  type="text"
                  v-model="status"
                  required
                  class="border p-1 border-gray-700/50 text-xs w-full outline-none bg-transparent"
                />
              </div>
              <div class="my-1">
                <p class="text-xs font-semibold">Rating</p>
                <input
                  type="text"
                  v-model="rating"
                  required
                  class="border p-1 border-gray-700/50 text-xs w-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div class="flex justify-start w-full items-center gap-2 my-2">
              <button
                @click="clear"
                class="w-32 border bg-gray-300 font-semibold text-sm py-2"
              >
                Clear
              </button>
              <button
                type="submit"
                class="w-32 bg-gray-800 text-white font-semibold text-sm py-2"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
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
