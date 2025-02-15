<template>
  <div v-if="showModal" class="fixed inset-0 z-50 bg-gray-800/30 backdrop-blur">
    <div class="relative flex justify-center items-center h-full text-gray-300">
      <div
        class="relative bg-gray-800/70 min-w-80 max-w-96 backdrop-blur-2xl border border-gray-500/20 p-5"
      >
        <form action="">
          <div class="flex justify-between items-center mb-2">
            <p class="text-lg font-extrabold">Edit Manga</p>
            <div @click="editManga">
              <Icon
                icon="material-symbols-light:close"
                width="24"
                height="24"
                class="cursor-pointer"
              />
            </div>
          </div>
          <div class="grid sm:grid-cols-2 grid-cols-1 gap-2">
            <div class="my-1">
              <p class="text-xs font-semibold">Name</p>
              <input
                type="text"
                v-model="manga.name"
                required
                class="border border-gray-700/50 p-2 text-xs w-full outline-none bg-transparent"
              />
            </div>
            <div class="my-1">
              <p class="text-xs font-semibold">Chapter</p>
              <input
                v-model="manga.chapter"
                type="number"
                required
                class="border p-2 border-gray-700/50 text-xs w-full outline-none bg-transparent"
              />
            </div>
            <div class="my-1">
              <p class="text-xs font-semibold">Status</p>
              <select
                required
                v-model="manga.status"
                class="border p-2 border-gray-700/50 outline-none text-xs w-full bg-transparent"
              >
                <option value="ongoing" class="bg-gray-800">Ongoing</option>
                <option value="reading" class="bg-gray-800">Reading</option>
                <option value="finished" class="bg-gray-800">Finished</option>
                <option value="dropped" class="bg-gray-800">Dropped</option>
              </select>
            </div>
            <div class="my-1">
              <p class="text-xs font-semibold">Rating</p>
              <select
                required
                v-model="manga.rating"
                class="border p-2 border-gray-700/50 outline-none text-xs w-full bg-transparent"
              >
                <option value="1" class="bg-gray-800">1</option>
                <option value="2" class="bg-gray-800">2</option>
                <option value="3" class="bg-gray-800">3</option>
                <option value="4" class="bg-gray-800">4</option>
                <option value="5" class="bg-gray-800">5</option>
              </select>
            </div>
            <div class="my-1">
              <p class="text-xs font-semibold">Country</p>
              <select
                required
                v-model="manga.country"
                class="border p-2 border-gray-700/50 outline-none text-xs w-full bg-transparent"
              >
                <option value="japan" class="bg-gray-800">Japan</option>
                <option value="china" class="bg-gray-800">China</option>
                <option value="for-south-korea" class="bg-gray-800">
                  Korea
                </option>
              </select>
            </div>
          </div>
          <div class="flex justify-start w-full items-center gap-2 my-2">
            <button
              @click.prevent="editManga"
              class="w-full border bg-gray-800/80 border-gray-500/50 font-semibold text-sm py-2 text-gray-300"
            >
              Cancel
            </button>
            <button
              @click.prevent="edit"
              class="w-full border bg-green-500/20 border-green-500/50 text-green-500 font-semibold text-sm py-2"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { Icon } from "@iconify/vue";
import { editList } from "@/composables";

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

const editManga = () => {
  emit("close");
};

const edit = () => {
  editList(props.manga);
  editManga();
};
</script>
