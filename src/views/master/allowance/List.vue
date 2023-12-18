<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { useCityStore } from '@/stores/city'
import type { UpdateAllowanceDto } from './dtos/allowance.dto'
import { useAllowanceStore } from '@/stores/allowance'
import { usePositionStore } from '@/stores/position'
import type { Position } from '@/views/master/position/entities/position.entity'
const state = useAllowanceStore()
const dialogVisible = ref<boolean>()
const form = reactive<UpdateAllowanceDto>({ name: '', price: 0, id: 0, position_id: '' })
const formRef = ref<FormInstance>()
const rules = reactive<FormRules<UpdateAllowanceDto>>({
  name: [{ required: true, message: 'Tolong masukkan tunjangan', trigger: 'blur' }],
  price: [{ required: true, message: 'Tolong masukkan nominal', trigger: 'blur' }],
  position_id: [{ required: true, message: 'Tolong pilih posisi', trigger: 'blur' }]
})
function editDialog(item: UpdateAllowanceDto) {
  form.name = item.name
  form.price = item.price
  form.id = item.id
  dialogVisible.value = true
}
const loading = ref<boolean>()
const loadingPosition = ref<boolean>()
const statePosition = usePositionStore()
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
const options = ref<Position[]>([])
async function remoteMethod(query: string) {
  if (query) {
    loadingPosition.value = true
    const data = await statePosition.load()
    options.value = data as Position[]
    loadingPosition.value = false
  }
}
</script>
<template>
  <ElCard class="box-card">
    <template #header>
      <div class="flex justify-between items-center">
        <h5 class="text-xl font-semibold">Tunjangan</h5>
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
      theme-color="#409EFF"
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
    <ElDialog v-model="dialogVisible" title="Form Tunjangan">
      <ElForm :model="form" label-position="top" ref="formRef" :rules="rules">
        <ElFormItem label="Pilih Kabupaten" required prop="position_id">
          <ElSelect
            class="w-full"
            v-model="form.position_id"
            filterable
            remote
            reserve-keyword
            placeholder="Masukkan nama posisi"
            :remote-method="remoteMethod"
            :loading="loadingPosition"
          >
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="Tunjangan" required prop="name">
          <ElInput v-model="form.name" />
        </ElFormItem>
        <ElFormItem label="Nominal" required prop="price">
          <ElInput v-model="form.price" />
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
./dtos/allowance.dto
