<script setup lang="ts">
import type { UpdateLevelDto } from './dtos/level.dto'
import type { FormInstance, FormRules } from 'element-plus'
import { useLevelStore } from '@/stores/level'
const state = useLevelStore()
const dialogVisible = ref<boolean>()
const form = reactive<UpdateLevelDto>({ name: '', id: 0 })
const formRef = ref<FormInstance>()
const rules = reactive<FormRules<UpdateLevelDto>>({
  name: [{ required: true, message: 'Tolong masukkan nama posisi', trigger: 'blur' }]
})
function editDialog(item: UpdateLevelDto) {
  form.name = item.name
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
      <div class="flex justify-between">
        <span>Level</span>
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
    <ElDialog v-model="dialogVisible" title="Form Level">
      <ElForm :model="form" label-position="top" ref="formRef" :rules="rules">
        <ElFormItem label="Level" required prop="name">
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
