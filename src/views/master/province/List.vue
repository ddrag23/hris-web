<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import type { UpdateProvinceDto } from './dtos/province.dto'
import { useProvinceStore } from '@/stores/province'
const state = useProvinceStore()
const dialogVisible = ref<boolean>()
const form = reactive<UpdateProvinceDto>({ name: '', code: '', id: 0 })
const formRef = ref<FormInstance>()
const rules = reactive<FormRules<UpdateProvinceDto>>({
  name: [{ required: true, message: 'Tolong masukkan nama provinsi', trigger: 'blur' }],
  code: [{ required: true, message: 'Tolong masukkan kode provinsi', trigger: 'blur' }]
})
function editDialog(item: UpdateProvinceDto) {
  form.name = item.name
  form.code = item.code
  form.id = item.id
  dialogVisible.value = true
}
const loading = ref<boolean>()
onMounted(async () => await state.load())
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
</script>
<template>
  <ElCard class="box-card">
    <template #header>
      <div class="flex justify-between items-center">
        <h5 class="text-xl font-semibold">Province</h5>
        <ElButton type="primary" @click="dialogVisible = true">Tambah</ElButton>
      </div>
    </template>
    <EasyDataTable :headers="state.headers" :items="state.items">
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
    <ElDialog v-model="dialogVisible" title="Form Province">
      <ElForm :model="form" label-position="top" ref="formRef" :rules="rules">
        <ElFormItem label="Kode" required prop="code">
          <ElInput v-model="form.code" size="large" />
        </ElFormItem>
        <ElFormItem label="Nama Province" required prop="name">
          <ElInput v-model="form.name" size="large" />
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
