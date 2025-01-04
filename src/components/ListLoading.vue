<template>
  <div class="flex justify-start w-full items-center" v-for="i in 5" :key="i">
    <div class="w-full border my-1 p-2">
      <div
        class="flex animate-pulse flex-wrap justify-start items-center gap-1"
      >
        <div class="flex justify-between w-full gap-4">
          <div class="flex gap-1">
            <div class="h-3 bg-gray-300 w-20"></div>
            <div class="h-3 bg-gray-300 w-10"></div>
          </div>
          <div class="flex justify-end gap-2">
            <div class="h-3 bg-gray-300 w-10"></div>
          </div>
        </div>
        <div class="h-8 bg-gray-300 w-full"></div>
      </div>
      <div class="flex justify-between my-1 gap-4">
        <div class="flex gap-1">
          <div class="h-5 bg-gray-300 w-10"></div>
          <div class="h-5 bg-gray-300 w-10"></div>
          <div class="h-5 bg-gray-300 w-10"></div>
        </div>
        <div class="flex gap-2">
          <div class="h-5 bg-gray-300 w-10"></div>
          <div class="h-5 bg-gray-300 w-10"></div>
        </div>
      </div>
    </div>
  </div>
</template>
