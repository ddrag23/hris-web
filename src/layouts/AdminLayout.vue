<script setup lang="ts">
import Navbar from '@/components/layout/Navbar.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
const drawer = ref<boolean>()
function navToggle(value: boolean) {
  drawer.value = value
}
</script>
<template>
  <div style="display: block">
    <Navbar @toggle="navToggle" />
    <div class="mx-14 my-8">
      <slot />
    </div>
    <ElDrawer :with-header="false" direction="ltr" v-model="drawer" :size="300" show-close>
      <Sidebar />
    </ElDrawer>
  </div>
</template>
