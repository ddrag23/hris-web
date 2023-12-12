<script setup lang="ts">
import type { Header, Item } from 'vue3-easy-data-table'
const headers: Header[] = [
  {
    text: 'NAMA POSISI',
    value: 'name'
  }
]
const items: Item[] = []
</script>
<template>
  <ElCard class="box-card">
    <template #header>
      <div class="flex justify-between">
        <span>Posisi</span>
        <ElButton type="primary">Tambah</ElButton>
      </div>
    </template>
    <EasyDataTable :headers="headers" :items="items" />
  </ElCard>
</template>
