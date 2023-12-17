<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { useDistrictStore } from '@/stores/district'
import type { UpdateDistrictDto } from './dtos/district.dto'
import type { BaseCity } from '@/views/master/city/entities/city.entity'
import { useCityStore } from '@/stores/city'
const state = useDistrictStore()
const dialogVisible = ref<boolean>()
const form = reactive<UpdateDistrictDto>({ name: '', code: '', id: 0, city_id: '' })
const formRef = ref<FormInstance>()
const rules = reactive<FormRules<UpdateDistrictDto>>({
  name: [{ required: true, message: 'Tolong masukkan nama provinsi', trigger: 'blur' }],
  code: [{ required: true, message: 'Tolong masukkan kode provinsi', trigger: 'blur' }],
  city_id: [{ required: true, message: 'Tolong pilih provinsi', trigger: 'blur' }]
})
function editDialog(item: UpdateDistrictDto) {
  form.name = item.name
  form.code = item.code
  form.id = item.id
  dialogVisible.value = true
}
const loading = ref<boolean>()
const loadingProvince = ref<boolean>()
const stateCity = useCityStore()
onMounted(async () => {
  await state.load()
})
async function submit() {
  if (!formRef.value) return
  await formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true
      form.id ? await state.update(form.id, form) : await state.store(form)
      loading.value = false
      dialogVisible.value = false
    }
  })
}
const options = ref<BaseCity[]>([])
async function remoteMethod(query: string) {
  if (query) {
    loadingProvince.value = true
    const data = await stateCity.loadAll({ name: { contains: query, mode: 'insensitive' } })
    options.value = data as BaseCity[]
    loadingProvince.value = false
  }
}
</script>
<template>
  <ElCard class="box-card">
    <template #header>
      <div class="flex justify-between items-center">
        <h5 class="text-xl font-semibold">Kecamatan</h5>
        <ElButton type="primary" @click="dialogVisible = true">Tambah</ElButton>
      </div>
    </template>

    <div class="flex w-full justify-end my-3">
      <ElInput v-model="state.search" placeholder="Please input" clearable style="width: 30%" />
    </div>
    <EasyDataTable
      v-model:server-options="state.serverOptions"
      :headers="state.headers"
      :loadin="state.loading"
      :items="state.items"
      :server-items-length="state.totalItem"
      buttons-pagination
      :key="state.reRender"
    >
      <template #item-id="item">
        <div class="flex">
          <ElButton type="primary" size="small" text circle @click="editDialog(item)"
            ><VIcon name="fa-edit"
          /></ElButton>
          <ElPopconfirm
            width="220"
            confirm-button-text="OK"
            cancel-button-text="Tidak, Terima kasih"
            icon="InfoFilled"
            icon-color="#626AEF"
            title="Apakah kamu yakin menghapus data ini?"
            @confirm="state.destroy(item.id)"
          >
            <template #reference>
              <ElButton type="danger" size="small" text circle><VIcon name="fa-trash" /></ElButton>
            </template>
          </ElPopconfirm>
        </div>
      </template>
    </EasyDataTable>
    <ElDialog v-model="dialogVisible" title="Form Kecamatan">
      <ElForm :model="form" label-position="top" ref="formRef" :rules="rules">
        <ElFormItem label="Pilih Kabupaten" required prop="city_id">
          <ElSelect
            class="w-full"
            v-model="form.city_id"
            filterable
            remote
            reserve-keyword
            placeholder="Masukkan nama kota/kabupaten"
            :remote-method="remoteMethod"
            :loading="loadingProvince"
          >
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="Kode" required prop="code">
          <ElInput v-model="form.code" />
        </ElFormItem>
        <ElFormItem label="Nama Kecamatan" required prop="name">
          <ElInput v-model="form.name" />
        </ElFormItem>
      </ElForm>
      <template #footer>
        <span class="dialog-footer">
          <ElButton @click="dialogVisible = false">Cancel</ElButton>
          <ElButton type="primary" @click="submit" :loading="loading"> Submit </ElButton>
        </span>
      </template>
    </ElDialog>
  </ElCard>
</template>
