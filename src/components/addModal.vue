<template>
  <div v-if="showModal" class="fixed inset-0 z-50 bg-gray-800/30 backdrop-blur">
    <div class="relative flex justify-center items-center h-full text-gray-300">
      <div
        class="relative bg-gray-800/70 max-w-96 min-w-80 backdrop-blur-2xl border border-gray-500/20 p-5"
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
                <option value="ongoing" class="bg-gray-800">Ongoing</option>
                <option value="reading" class="bg-gray-800">Reading</option>
                <option value="finished" class="bg-gray-800">Finished</option>
                <option value="dropped" class="bg-gray-800">Dropped</option>
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
                <option :value="1" class="bg-gray-800">1</option>
                <option :value="2" class="bg-gray-800">2</option>
                <option :value="3" class="bg-gray-800">3</option>
                <option :value="4" class="bg-gray-800">4</option>
                <option :value="5" class="bg-gray-800">5</option>
              </select>
            </div>
            <div class="my-1">
              <p class="text-xs font-semibold">Country</p>

              <select
                name=""
                id=""
                required
                v-model="country"
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
              @click.prevent="clear"
              class="w-full border bg-gray-800/80 border-gray-500/50 font-semibold text-sm py-2"
            >
              Clear
            </button>
            <button
              type="submit"
              class="w-full border bg-green-500/20 border-green-500/50 text-green-500 font-semibold text-sm py-2"
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

const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
    default: false,
  },
});
const emit = defineEmits(["close", "add-manga"]);
const name = ref("");
const chapter = ref(null);
const status = ref("");
const rating = ref(0);
const country = ref("");

const addManga = () => {
  emit("close");
};

const add = () => {
  const newManga = {
    name: name.value,
    chapter: chapter.value,
    status: status.value,
    rating: rating.value,
    country: country.value,
  };

  emit("add-manga", newManga);
  clear();
};

const clear = () => {
  name.value = "";
  chapter.value = null;
  status.value = "";
  rating.value = 0;
  country.value = "";
};
</script>
