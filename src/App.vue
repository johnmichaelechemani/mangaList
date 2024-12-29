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
      <!-- table -->
      <div class="flex flex-wrap gap-2">
        <div class="relative overflow-x-auto shadow-sm w-full">
          <table class="w-full text-sm text-left">
            <thead class="text-xs text-gray-800 border">
              <tr>
                <th scope="col" class="px-2 py-3">Name</th>
                <th scope="col" class="px-2 py-3">Latest Chapter</th>
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
                <td class="px-2 py-3">
                  <p
                    :class="
                      item.status === 'ongoing'
                        ? 'bg-orange-500'
                        : 'bg-green-500'
                    "
                    class="px-2 capitalize font-semibold text-white text-center w-20 rounded-full py-0.5"
                  >
                    {{ item.status }}
                  </p>
                </td>
                <td class="px-2 py-3">
                  <p
                    :class="getRatingClass(item.rating)"
                    class="px-2 font-semibold text-white text-center w-20 rounded-full py-0.5"
                  >
                    {{ getRatingText(item.rating) }}
                  </p>
                </td>
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
