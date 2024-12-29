<script setup>
import { manga, getManga } from "./store";
import { Icon } from "@iconify/vue";
import { ref, onMounted } from "vue";

onMounted(() => {
  getManga();
});
</script>

<template>
  <div
    class="flex justify-center items-center h-screen bg-gray-100 text-gray-800"
  >
    <div class="border p-5">
      <h1 class="font-semibold text-lg my-2">Manga Lists</h1>

      <!-- add manga -->
      <div class="grid sm:grid-cols-2 grid-cols-1 gap-2">
        <div class="my-1">
          <p class="text-xs font-semibold">Name</p>
          <input
            type="text"
            class="border p-1 text-xs w-full outline-none bg-transparent"
          />
        </div>
        <div class="my-1">
          <p class="text-xs font-semibold">Chapter</p>
          <input
            type="text"
            class="border p-1 text-xs w-full outline-none bg-transparent"
          />
        </div>
        <div class="my-1">
          <p class="text-xs font-semibold">Status</p>
          <input
            type="text"
            class="border p-1 text-xs w-full outline-none bg-transparent"
          />
        </div>
        <div class="my-1">
          <p class="text-xs font-semibold">Rating</p>
          <input
            type="text"
            class="border p-1 text-xs w-full outline-none bg-transparent"
          />
        </div>
      </div>
      <div>
        <button>Clear</button>
        <button>Add</button>
      </div>

      <!-- table -->
      <div>
        <div class="relative overflow-x-auto shadow-sm w-full">
          <table class="w-full text-sm text-left">
            <thead class="text-xs text-gray-800 border">
              <tr>
                <th scope="col" class="px-2 py-3">Name</th>
                <th scope="col" class="px-2 py-3">Chapter</th>
                <th scope="col" class="px-2 py-3">Status</th>
                <th scope="col" class="px-2 py-3">Rating</th>

                <th scope="col" class="px-2 py-3">Action</th>
              </tr>
            </thead>
            <tbody v-for="(item, index) in manga" :key="index">
              <tr class="border-b">
                <th scope="row" class="px-2 py-2 font-medium whitespace-nowrap">
                  {{ item.name }}
                </th>
                <td class="px-6 py-4">{{ item.chapter }}</td>
                <td class="px-6 py-4">{{ item.status }}</td>
                <td class="px-6 py-4">{{ item.rating }}</td>
                <td class="px-6 py-4 flex justify-start items-center gap-2">
                  <button
                    class="font-medium text-green-500 border border-green-500/20 p-1"
                  >
                    <Icon
                      icon="material-symbols-light:edit-outline"
                      width="20"
                      height="20"
                    />
                  </button>
                  <button
                    class="font-medium text-red-500 border border-red-500/20 p-1"
                  >
                    <Icon
                      icon="material-symbols-light:restore-from-trash-outline"
                      width="20"
                      height="20"
                    />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap");
:root {
  font-family: "Manrope", serif;
  font-optical-sizing: auto;
}
</style>
