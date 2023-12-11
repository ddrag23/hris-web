<script setup lang="ts">
import { ElAvatar } from 'element-plus'
const errorHandler = () => true
</script>
<template>
  <nav class="bg-violet-600 h-16 w-full box-border px-12 flex justify-between items-center">
    <button class="text-white" @click="$emit('toggle', true)">
      <VIcon name="hi-menu-alt-3" scale="1.5" />
    </button>
    <h1 class="text-2xl text-white font-bold">YESS HRIS</h1>
    <ElAvatar :size="40" src="#" @error="errorHandler">
      <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
    </ElAvatar>
  </nav>
</template>
