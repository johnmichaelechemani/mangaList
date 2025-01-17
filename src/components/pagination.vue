<template>
  <div class="flex justify-between gap-2 mb-2">
    <select class="text-xs border w-full rounded-full px-2 font-semibold">
      <option value="">All</option>
      <option value="reading">10</option>
      <option value="ongoing">25</option>
      <option value="dropped">50</option>
    </select>
    <div class="flex justify-center items-center gap-2">
      <button class="p-1 border rounded-full bg-gray-400/5">
        <Icon
          icon="material-symbols-light:arrow-back-2-rounded"
          width="20"
          height="20"
        />
      </button>
      <div class="px-2 border rounded-full py-1 text-xs font-semibold">2/3</div>
      <button class="p-1 border rounded-full bg-gray-400/5">
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

</script>
