<template>
  <div v-if="showModal" class="fixed inset-0 z-50 bg-gray-800/30 backdrop-blur">
    <div class="relative flex justify-center items-center h-full text-gray-800">
      <div class="relative bg-gray-200/50 backdrop-blur-2xl border p-5">
        <p class="text-lg font-extrabold">Delete Manga</p>
        <p class="text-xs font-semibold text-gray-700">
          Are you sure to delete
          <span class="text-sm capitalize">{{ manga.name }}</span>
        </p>
        <div class="mt-4 flex justify-start items-center gap-2 w-full">
          <button
            @click="close"
            class="border text-sm w-full font-semibold py-2"
          >
            Cancel
          </button>
          <button
            @click="deleteManga"
            class="border text-sm text-white w-full bg-red-500 font-semibold py-2"
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
