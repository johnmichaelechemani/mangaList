<template>
  <div v-if="showModal" class="fixed inset-0 z-50 bg-gray-800/30 backdrop-blur">
    <div class="relative flex justify-center items-center h-full text-gray-800">
      <div
        class="relative bg-gray-200/70 max-w-96 min-w-80 backdrop-blur-2xl border p-5"
      >
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
                class="border border-gray-700/50 p-2 text-xs w-full outline-none bg-transparent"
              />
            </div>
            <div class="my-1">
              <p class="text-xs font-semibold">Chapter</p>
              <input
                v-model="chapter"
                type="number"
                required
                class="border p-2 border-gray-700/50 text-xs w-full outline-none bg-transparent"
              />
            </div>
            <div class="my-1">
              <p class="text-xs font-semibold">Status</p>
              <select
                name=""
                id=""
                required
                v-model="status"
                class="border p-2 border-gray-700/50 outline-none text-xs w-full bg-transparent"
              >
                <option value="ongoing">Ongoing</option>
                <option value="finished">Finished</option>
              </select>
            </div>
            <div class="my-1">
              <p class="text-xs font-semibold">Rating</p>

              <select
                name=""
                id=""
                required
                v-model="rating"
                class="border p-2 border-gray-700/50 outline-none text-xs w-full bg-transparent"
              >
                <option :value="1">1</option>
                <option :value="2">2</option>
                <option :value="3">3</option>
                <option :value="4">4</option>
                <option :value="5">5</option>
              </select>
            </div>
          </div>
          <div class="flex justify-start w-full items-center gap-2 my-2">
            <button
              @click.prevent="clear"
              class="w-full border bg-gray-300 font-semibold text-sm py-2"
            >
              Clear
            </button>
            <button
              type="submit"
              class="w-full bg-gray-800 text-white font-semibold text-sm py-2"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, defineEmits } from "vue";
import { Icon } from "@iconify/vue";

// Define Props
const props = defineProps({
  /**
   * Controls the visibility of the modal
   * @type {boolean}
   */
  showModal: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// Define Emits
const emit = defineEmits([
  /**
   * Emitted when the modal should be closed
   */
  "close",

  /**
   * Emitted when a new manga is added
   */
  "add-manga",
]);

// Reactive form data
const name = ref("");
const chapter = ref(null);
const status = ref("");
const rating = ref(0);

// Methods
const addManga = () => {
  emit("close");
};

const add = () => {
  const newManga = {
    name: name.value,
    chapter: chapter.value,
    status: status.value,
    rating: rating.value,
  };

  emit("add-manga", newManga);
  clear();
};

const clear = () => {
  name.value = "";
  chapter.value = null;
  status.value = "";
  rating.value = 0;
};
</script>
