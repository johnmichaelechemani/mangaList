<template>
  <div
    class="border p-1 text-gray-800 mb-1"
    :class="item.status === 'reading' ? 'border-blue-500/50 bg-blue-500/5' : ''"
    v-for="(item, index) in manga"
    :key="index"
  >
    <div class="flex justify-between items-center gap-1">
      <div class="flex justify-start items-center gap-1">
        <p class="text-xs font-medium text-gray-500">
          Added: {{ Time(item.timestamp) }}
        </p>
        <div
          v-if="item.status === 'reading'"
          class="flex items-center border border-blue-500/50 px-1 py-0.5"
        >
          <span
            ><Icon
              icon="stash:reading-time-light"
              width="16"
              height="16"
              class="text-blue-500"
          /></span>
          <span class="text-xs px-1.5 py-0.5 font-medium">Reading</span>
        </div>
      </div>
      <div>
        <Icon
          v-if="item.country"
          :icon="`twemoji:flag-${item.country}`"
          width="24"
          height="24"
        />
      </div>
    </div>
    <div class="text-sm font-semibold uppercase">{{ item.name }}</div>
    <div class="flex justify-between items-center my-1 gap-1">
      <div class="flex justify-start items-center gap-2">
        <div
          class="flex justify-start items-center gap-1 text-xs border px-2 py-0.5 font-medium"
        >
          <Icon
            icon="material-symbols-light:menu-book-outline"
            width="20"
            height="20"
            class="text-blue-500"
          />
          {{ item.chapter }}
        </div>
        <div
          class="flex capitalize justify-start items-center gap-1 text-xs border px-2 py-0.5 font-medium"
        >
          <Icon
            :icon="getStatusIcon(item.status)"
            width="20"
            height="20"
            :class="getStatusClass(item.status)"
          />
          {{ item.status }}
        </div>
        <div
          class="flex justify-start items-center gap-1 text-xs border px-2 py-0.5 font-medium"
        >
          <Icon
            icon="material-symbols-light:star-outline"
            width="20"
            height="20"
            class="text-yellow-400"
          />{{ item.rating }}/5
        </div>
      </div>
      <div class="gap-1 flex">
        <button
          @click="editManga(item)"
          class="text-green-500 border border-green-500/20 px-1 py-0.5"
        >
          <Icon
            icon="material-symbols-light:edit-outline"
            width="20"
            height="20"
          />
        </button>
        <button
          @click="deleteManga(item)"
          class="text-red-500 border border-red-500/20 px-1 py-0.5"
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

  <transition>
    <EditModal
      :show-modal="showEditModal"
      :manga="selected"
      @close="showEditModal = false"
      @edit-manga="close"
    />
  </transition>
  <transition>
    <DeleteModal
      :show-modal="showModalDelete"
      :manga="selected"
      @close="showModalDelete = false"
      @delete-manga="close"
    />
  </transition>
</template>
<script setup>
import { Icon } from "@iconify/vue";
import { ref, defineProps } from "vue";
import { Time } from "@/composables";
import EditModal from "./editModal.vue";
import DeleteModal from "./deleteModal.vue";
const props = defineProps({
  manga: {
    type: Object,
    required: true,
  },
});
const showEditModal = ref(false);
const showModalDelete = ref(false);
const selected = ref([]);

const getStatusIcon = (status) => {
  const statusIcons = {
    reading: "stash:reading-time-light",
    finished: "material-symbols-light:done",
    dropped: "material-symbols-light:trending-down",
    ongoing: "material-symbols-light:downloading",
  };
  return statusIcons[status] || "material-symbols-light:downloading";
};
const getStatusClass = (status) => {
  const statusClasses = {
    reading: "text-blue-500",
    finished: "text-green-500",
    dropped: "text-red-500",
    ongoing: "text-orange-500",
  };
  return statusClasses[status] || "text-gray-500";
};

const editManga = (item) => {
  selected.value = item;
  showEditModal.value = !showEditModal.value;
};
const deleteManga = (item) => {
  selected.value = item;
  showModalDelete.value = !showModalDelete.value;
};
const close = () => {
  selected.value = [];
  showEditModal.value = false;
  showModalDelete.value = false;
};
</script>
