<template>
  <div class="flex justify-between gap-2 mb-2">
    <select
      class="text-xs border w-full outline-none rounded-full px-2 font-semibold"
    >
      <option value="">All ({{ totalItems }})</option>
      <option value="reading">10</option>
      <option value="ongoing">25</option>
      <option value="dropped">50</option>
    </select>
    <div class="flex justify-center items-center gap-1">
      <button @click="prev" class="p-1 hover:bg-gray-400/20 rounded-full">
        <Icon
          icon="material-symbols-light:arrow-back-2-rounded"
          width="20"
          height="20"
        />
      </button>
      <div
        class="px-2 border rounded-full py-1 text-xs flex gap-0.5 shadow-sm font-semibold"
      >
        {{ currentPage }}<span class="text-gray-300">/</span>{{ totalPage }}
      </div>
      <button @click="next" class="p-1 hover:bg-gray-400/20 rounded-full">
        <Icon
          icon="material-symbols-light:play-arrow-rounded"
          width="20"
          height="20"
        />
      </button>
    </div>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const currentPage = ref(1);
const totalPage = ref(10);
const totalItems = ref(500);

const page = ref([
  { id: 1, title: "Item 1" },
  { id: 2, title: "Item 2"},
  { id: 3, title: "Item 3" },
]);

const prev = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    console.log(`Previous Page: ${currentPage.value}`);
    console.log(page.value);
  } else {
    console.log("Already on the first page");
  }
};
const next = () => {
  if (currentPage.value < totalPage.value) {
    currentPage.value++;
    console.log(`Next Page: ${currentPage.value}`);
    console.log(page.value);
  } else {
    console.log("Already on the last page");
  }
};
</script>
