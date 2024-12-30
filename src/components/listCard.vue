<template>
  <div
    class="border p-1 text-gray-800 mb-1"
    v-for="(item, index) in manga"
    :key="index"
  >
    <div class="text-sm font-semibold capitalize">{{ item.name }}</div>
    <div class="flex justify-between items-center gap-1">
      <div class="flex justify-start items-center gap-2">
        <div
          class="flex justify-start items-center gap-1 text-sm border px-1 text-blue-500 font-semibold"
        >
          <Icon icon="material-symbols-light:book" width="24" height="24" />
          {{ item.chapter }}
        </div>
        <div
          :class="
            item.status === 'ongoing' ? 'text-orange-500' : 'text-green-500'
          "
          class="flex capitalize justify-start items-center gap-1 text-sm border px-1 font-semibold"
        >
          <Icon
            icon="material-symbols-light:detector-status"
            width="24"
            height="24"
          />{{ item.status }}
        </div>
        <div
          class="flex justify-start items-center gap-1 text-sm border px-1 text-yellow-500 font-semibold"
        >
          <Icon icon="material-symbols-light:star" width="24" height="24" />{{
            item.rating
          }}/5
        </div>
      </div>
      <div class="gap-1 flex">
        <button
          @click="editList(item.id)"
          class="font-medium text-green-500 border border-green-500/20 px-1 py-0.5"
        >
          <Icon
            icon="material-symbols-light:edit-outline"
            width="20"
            height="20"
          />
        </button>
        <button
          @click="deleteList(item.id)"
          class="font-medium text-red-500 border border-red-500/20 px-1 py-0.5"
        >
          <Icon
            icon="material-symbols-light:restore-from-trash-outline"
            width="20"
            height="20"
          />
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
import { ref, defineProps } from "vue";
import { editList, deleteList } from "@/composables";
const props = defineProps({
  manga: {
    type: Object,
    required: true,
  },
});
</script>
