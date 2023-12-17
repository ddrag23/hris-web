<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import type { UpdateCityDto } from './dtos/city.dto'
import type { Province } from '@/views/master/province/entities/province.entity'
import { useProvinceStore } from '@/stores/province'
import { useCityStore } from '@/stores/city'
const state = useCityStore()
const dialogVisible = ref<boolean>()
const form = reactive<UpdateCityDto>({ name: '', code: '', id: 0, province_id: '' })
const formRef = ref<FormInstance>()
const rules = reactive<FormRules<UpdateCityDto>>({
  name: [{ required: true, message: 'Tolong masukkan nama provinsi', trigger: 'blur' }],
  code: [{ required: true, message: 'Tolong masukkan kode provinsi', trigger: 'blur' }],
  province_id: [{ required: true, message: 'Tolong pilih provinsi', trigger: 'blur' }]
})
function editDialog(item: UpdateCityDto) {
  form.name = item.name
  form.code = item.code
  form.id = item.id
  dialogVisible.value = true
}
const loading = ref<boolean>()
const loadingProvince = ref<boolean>()
const stateProvince = useProvinceStore()
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
const options = ref<Province[]>([])
async function remoteMethod(query: string) {
  if (query) {
    loadingProvince.value = true
    options.value = await stateProvince.load(
      { name: { contains: query, mode: 'insensitive' } },
      true
    )
    loadingProvince.value = false
  }
}
</script>
<template>
  <ElCard class="box-card">
    <template #header>
      <div class="flex justify-between items-center">
        <h5 class="text-xl font-semibold">Kota/Kabupaten</h5>
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
            cancel-button-text="No, Thanks"
            icon="InfoFilled"
            icon-color="#626AEF"
            title="Are you sure to delete this?"
            @confirm="state.destroy(item.id)"
          >
            <template #reference>
              <ElButton type="danger" size="small" text circle><VIcon name="fa-trash" /></ElButton>
            </template>
          </ElPopconfirm>
        </div>
      </template>
    </EasyDataTable>
    <ElDialog v-model="dialogVisible" title="Form Kota/Kabupaten">
      <ElForm :model="form" label-position="top" ref="formRef" :rules="rules">
        <ElFormItem label="Pilih Province" required prop="province_id">
          <ElSelect
            class="w-full"
            v-model="form.province_id"
            filterable
            remote
            reserve-keyword
            placeholder="Please enter a keyword"
            :remote-method="remoteMethod"
            :loading="loadingProvince"
          >
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="Kode" required prop="code">
          <ElInput v-model="form.code" />
        </ElFormItem>
        <ElFormItem label="Nama Kota / Kabupaten" required prop="name">
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
