<script setup lang="ts">
import menu from './menu'
type DropdownState = {
  [key: number]: boolean
}
type RouteMenu = {
  title: string
  route: string
  icon: string
}
type SideMenu = {
  children?: RouteMenu[]
} & RouteMenu
const router = useRouter()
function navigateTo(route: string) {
  router.push({ name: route })
}
const dropdownOpen = ref<DropdownState>([])
function toggleMultiLevel(index: number) {
  dropdownOpen.value[index] = !dropdownOpen.value[index]
}
const sideMenu = ref<SideMenu[]>([...menu])
</script>
<template>
  <ul class="space-y-2">
    <template v-for="(item, index) of sideMenu">
      <li
        class="nav-item"
        v-if="item.children && item.children.length > 0"
        @click="toggleMultiLevel(index)"
      >
        <div class="flex justify-between">
          <div>
            <VIcon :name="item.icon" />
            <span class="ml-2">{{ item.title }}</span>
          </div>
          <VIcon name="hi-chevron-up" v-if="dropdownOpen[index]"></VIcon>
          <VIcon name="hi-chevron-down" v-else></VIcon>
        </div>
        <Transition>
          <ul class="w-full mt-3" v-if="dropdownOpen[index]">
            <li
              class="py-2 px-3 rounded-md w-full"
              :class="{ active: child.route == $route.name }"
              v-for="child of item.children"
              @click="navigateTo(child.route)"
            >
              <VIcon :name="child.icon" scale="1" />
              <span class="ml-2">{{ child.title }}</span>
            </li>
          </ul>
        </Transition>
      </li>
      <li
        v-else
        class="nav-item"
        :class="{ active: $route.name == item.route }"
        @click="navigateTo(item.route)"
      >
        <VIcon :name="item.icon" />
        <span class="ml-2">{{ item.title }}</span>
      </li>
    </template>
  </ul>
</template>
<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
