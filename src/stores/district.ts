import axios from '@/plugins/axios'
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Header, Item, ServerOptions } from 'vue3-easy-data-table'
import { ElNotification } from 'element-plus'
import baseUrl from '@/urls/district.url'
import type { UpdateDistrictDto } from '@/views/master/district/dtos/district.dto'
export const useDistrictStore = defineStore('useDistrictStore', () => {
  const headers: Header[] = [
    { text: 'KODE', value: 'code' },
    { text: 'KECAMATAN', value: 'name' },
    { text: 'KABUPATEN / KOTA', value: 'city.name' },
    { text: 'AKSI', value: 'id' }
  ]
  const items = ref<Item[]>([])
  const loading = ref<boolean>()
  const serverOptions = ref<ServerOptions>({
    page: 1,
    rowsPerPage: 5,
    sortBy: 'created_at',
    sortType: 'asc'
  })
  const totalItem = ref<number>()
  const reRender = ref<number>(1)
  const search = ref<string>('')
  async function load() {
    try {
      const {
        data: { data }
      } = await axios.get(baseUrl.base, {
        params: {
          skip: serverOptions.value.page,
          take: serverOptions.value.rowsPerPage,
          sortBy: serverOptions.value.sortBy,
          sortType: serverOptions.value.sortType,
          ...(search.value && {
            where: JSON.stringify({
              OR: [
                {
                  name: { contains: search.value, mode: 'insensitive' }
                },
                { code: { contains: search.value, mode: 'insensitive' } }
              ]
            })
          })
        }
      })
      items.value = data.data
      totalItem.value = data.totalData
      loading.value = false
    } catch (error: any) {
      loading.value = false
      console.error(error)
    }
  }

  async function store(form: UpdateDistrictDto) {
    try {
      const { id, ...formData } = form
      const {
        data: { message }
      } = await axios.post(baseUrl.base, formData)
      console.log(message)
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
  async function update(id: string | number | undefined, form: UpdateDistrictDto) {
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
      const {
        data: { message }
      } = await axios.delete(`${baseUrl.base}/${id}`)
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
  watch(
    serverOptions,
    (value) => {
      console.log(value)
      reRender.value++
      load()
    },
    { deep: true }
  )
  watchDebounced(
    search,
    (query) => {
      reRender.value++
      load()
    },
    { debounce: 500 }
  )
  return {
    headers,
    load,
    items,
    store,
    update,
    destroy,
    totalItem,
    reRender,
    serverOptions,
    loading,
    search
  }
})
