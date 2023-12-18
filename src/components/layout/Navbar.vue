<script setup lang="ts">
import { ElAvatar } from 'element-plus'
const errorHandler = () => true
const router = useRouter()
function logout() {
  localStorage.removeItem('access_token')
  router.push({ name: 'login' })
}
</script>
<template>
  <nav
    class="bg-[#409EFF] h-16 w-full box-border px-6 md:px-12 flex justify-between items-center fixed z-10"
  >
    <button class="text-white" @click="$emit('toggle', true)">
      <VIcon name="hi-menu-alt-3" scale="1.5" />
    </button>
    <h1 class="text-2xl text-white font-bold">YESS HRIS</h1>
    <ElDropdown>
      <span class="el-dropdown-link">
        <ElAvatar :size="40" src="#" @error="errorHandler">
          <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
        </ElAvatar>
      </span>
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem><VIcon name="fa-user" /><span class="ml-2">Profile</span></ElDropdownItem>
          <ElDropdownItem @click="logout"
            ><VIcon name="fa-sign-out-alt" /><span class="ml-2">Sign Out</span></ElDropdownItem
          >
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </nav>
</template>
