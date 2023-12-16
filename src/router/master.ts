import AdminLayout from '@/layouts/AdminLayout.vue'

export default [
  {
    path: '/master/posisi',
    name: 'posisi',
    component: () => import('@/views/master/position/List.vue'),
    meta: { layout: AdminLayout, auth: true }
  },
  {
    path: '/master/level',
    name: 'level',
    component: () => import('@/views/master/level/List.vue'),
    meta: { layout: AdminLayout, auth: true }
  },
  {
    path: '/master/division',
    name: 'division',
    component: () => import('@/views/master/division/List.vue'),
    meta: { layout: AdminLayout, auth: true }
  },
  {
    path: '/master/area/division',
    name: 'province',
    component: () => import('@/views/master/province/List.vue'),
    meta: { layout: AdminLayout, auth: true }
  }
]
