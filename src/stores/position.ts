import type { UpdatePositionDto } from '@/views/master/position/dtos/position.dto'
import axios from '@/plugins/axios'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Header, Item } from 'vue3-easy-data-table'
import { ElNotification } from 'element-plus'
import baseUrl from '@/urls/position'
export const usePositionStore = defineStore('usePositionStore', () => {
  const headers: Header[] = [
    { text: 'NAMA POSISI', value: 'name' },
    { text: 'AKSI', value: 'id' }
  ]
  const items = ref<Item[]>([])
  async function load() {
    try {
      const { data } = await axios.get(baseUrl.base)
      items.value = data
      console.log(items.value)
    } catch (error: any) {
      console.error(error)
    }
  }

  async function store(form: UpdatePositionDto) {
    try {
      const { id, ...formData } = form
      const { data } = await axios.post(baseUrl.base, formData)
      console.log(data)
      ElNotification({
        title: 'Success',
        message: data,
        type: 'success'
      })
      load()
    } catch (error: any) {
      console.error(error)
    }
  }
  async function update(id: string | number | undefined, form: UpdatePositionDto) {
    try {
      const { data } = await axios.patch(`${baseUrl.base}/${id}`, form)
      console.log(data)
      ElNotification({
        title: 'Success',
        message: data,
        type: 'success'
      })
      load()
    } catch (error: any) {
      console.error(error)
    }
  }

  async function destroy(id: number) {
    try {
      const { data } = await axios.delete(`${baseUrl.base}/${id}`)
      console.log(data)
      ElNotification({
        title: 'Success',
        message: data,
        type: 'success'
      })
      load()
    } catch (error: any) {
      console.error(error)
    }
  }
  return { headers, load, items, store, update, destroy }
})