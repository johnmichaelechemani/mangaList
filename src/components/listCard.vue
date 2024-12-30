<template>
  <div
    class="border p-1 text-gray-800 mb-1"
    v-for="(item, index) in manga"
    :key="index"
  >
    <div>
      <p class="text-xs font-medium text-gray-500">
        Added: {{ Time(item.timestamp) }}
      </p>
    </div>
    <div class="text-sm font-semibold capitalize">{{ item.name }}</div>
    <div class="flex justify-between items-center gap-1">
      <div class="flex justify-start items-center gap-2">
        <div
          class="flex justify-start items-center gap-1 text-sm border px-1 font-semibold"
        >
          <Icon
            icon="material-symbols-light:book"
            width="24"
            height="24"
            class="text-blue-500"
          />
          {{ item.chapter }}
        </div>
        <div
          class="flex capitalize justify-start items-center gap-1 text-sm border px-1 font-semibold"
        >
          <Icon
            icon="material-symbols-light:detector-status"
            width="24"
            height="24"
            :class="{
              'text-orange-500': item.status === 'ongoing',
              'text-green-500': item.status === 'finished',
              'text-red-500':
                item.status !== 'ongoing' && item.status !== 'finished',
            }"
          />{{ item.status }}
        </div>
        <div
          class="flex justify-start items-center gap-1 text-sm border px-1 font-semibold"
        >
          <Icon
            icon="material-symbols-light:star"
            width="24"
            height="24"
            class="text-yellow-500"
          />{{ item.rating }}/5
        </div>
      </div>
      <div class="gap-1 flex">
        <button
          @click="editManga(item)"
          class="font-medium text-green-500 border border-green-500/20 px-1 py-0.5"
        >
          <Icon
            icon="material-symbols-light:edit-outline"
            width="20"
            height="20"
          />
        </button>
        <button
          @click="deleteManga(item)"
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
