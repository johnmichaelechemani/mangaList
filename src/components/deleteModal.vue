<template>
  <div
    v-if="showModal"
    class="fixed inset-0 z-50 bg-gray-800/30 text-gray-300 backdrop-blur"
  >
    <div class="relative flex justify-center items-center h-full">
      <div
        class="relative bg-gray-800/50 min-w-80 max-w-96 backdrop-blur-2xl border border-gray-500/20 p-5"
      >
        <p class="text-lg font-extrabold">Delete Manga</p>
        <p class="text-xs font-semibold text-gray-400">
          Are you sure to delete
          <span class="text-sm capitalize">{{ manga.name }}</span>
        </p>
        <div class="mt-4 flex justify-start items-center gap-2 w-full">
          <button
            @click="close"
            class="border border-gray-500/20 text-sm w-full font-semibold py-2"
          >
            Cancel
          </button>
          <button
            @click="deleteManga"
            class="border text-sm border-red-500/20 w-full bg-red-500/10 text-red-500 font-semibold py-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
import { deleteList } from "@/composables";
const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
    default: false,
  },
  manga: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["close", "edit-manga"]);

const close = () => {
  emit("close");
};

const deleteManga = () => {
  deleteList(props.manga.id);
  close();
};
</script>
