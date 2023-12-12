import AdminLayout from '@/layouts/AdminLayout.vue'

export default [
  {
    path: '/master/posisi',
    name: 'posisi',
    component: () => import('@/views/master/position/List.vue'),
    meta: { layout: AdminLayout, auth: true }
  }
]
