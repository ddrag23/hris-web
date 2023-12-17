import axios from '@/plugins/axios'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Header, Item } from 'vue3-easy-data-table'
import { ElNotification } from 'element-plus'
import baseUrl from '@/urls/division.url'
import type { UpdateDivisionDto } from '@/views/master/division/dtos/division.dto'
export const useDivisionStore = defineStore('useDivisionStore', () => {
  const headers: Header[] = [
    { text: 'NAMA DIVISI', value: 'name' },
    { text: 'AKSI', value: 'id' }
  ]
  const items = ref<Item[]>([])
  async function load() {
    try {
      const {
        data: { data }
      } = await axios.get(baseUrl.base)
      items.value = data
      console.log(items.value)
    } catch (error: any) {
      console.error(error)
    }
  }

  async function store(form: UpdateDivisionDto) {
    try {
      const { id, ...formData } = form
      const {
        data: { message }
      } = await axios.post(baseUrl.base, formData)
      ElNotification({
        title: 'Success',
        message: message,
        type: 'success'
      })
      load()
    } catch (error: any) {
      console.error(error)
    }
  }
  async function update(id: string | number | undefined, form: UpdateDivisionDto) {
    try {
      const {
        data: { message }
      } = await axios.patch(`${baseUrl.base}/${id}`, form)
      ElNotification({
        title: 'Success',
        message: message,
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
