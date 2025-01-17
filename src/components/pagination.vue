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
const totalPage = ref(100);
const totalItems = ref(500);

const page = ref([{}]);

const prev = () => {
  console.log(currentPage.value);
};
const next = () => {
  console.log(totalPage.value);
};
</script>
