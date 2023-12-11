<script setup lang="ts">
type DropdownState = {
  [key: number]: boolean
}
type RouteMenu = {
  title: string
  route: string
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
const sideMenu = ref<SideMenu[]>([
  {
    title: 'Home',
    route: 'home'
  },
  {
    title: 'About',
    route: 'about'
  },
  {
    title: 'Multi Level',
    route: 'multi_level',
    children: [
      {
        title: 'User',
        route: 'user'
      }
    ]
  },
  {
    title: 'Mext level',
    route: 'multi_level_2',
    children: [
      {
        title: 'Master',
        route: 'master'
      }
    ]
  }
])
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
          <div>{{ item.title }}</div>
          <VIcon name="hi-chevron-up" v-if="dropdownOpen[index]"></VIcon>
          <VIcon name="hi-chevron-down" v-else></VIcon>
        </div>
        <Transition>
          <ul class="w-full mt-3" v-if="dropdownOpen[index]">
            <li class="py-2 px-5 rounded-md active w-full" v-for="child of item.children">
              {{ child.title }}
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
        {{ item.title }}
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
