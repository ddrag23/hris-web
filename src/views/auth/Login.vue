<script setup lang="ts">
import { reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { ElFormItem } from 'element-plus'
import { useAuthStore } from '@/stores/auth'
import type { AuthRequest } from './dtos/auth.dto'
import type { FormInstance, FormRules } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
const state = useAuthStore()
const form = reactive<AuthRequest>({ email: '', password: '' })
const router = useRouter()
const loading = ref<boolean>()
const rules = reactive<FormRules<AuthRequest>>({
  email: [{ required: true, message: 'Please input email', trigger: 'blur' }],
  password: [{ required: true, message: 'Please input password', trigger: 'blur' }]
})
async function login() {
  if (!ruleFormRef.value) return

  await ruleFormRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true
      await state.login(form)
      loading.value = false

      if (state.isLogin) {
        router.push({ name: 'home' })
      }
    }
  })
}
</script>
<template>
  <section class="flex justify-center items-center w-full h-screen">
    <ElCard class="box-card w-full md:w-1/3 mx-2 md:mx-0">
      <p class="text-lg font-bold mt-3">Login to your account</p>
      <p class="text-sm font-semibold mb-5 text-slate-400">Welcome back, Select method to login</p>
      <ElDivider />
      <ElForm :model="form" label-position="top" ref="ruleFormRef" :rules="rules">
        <ElFormItem label="Email" required prop="email">
          <ElInput v-model="form.email" size="large" />
        </ElFormItem>
        <ElFormItem label="Password" required prop="password">
          <ElInput v-model="form.password" type="password" show-password size="large" />
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" class="w-full" size="large" @click="login" :loading="loading"
            >Login</ElButton
          >
        </ElFormItem>
      </ElForm>
      <div class="flex flex-col justify-center items-center w-full">
        <RouterLink to="/" class="text-sm">Forgot password?</RouterLink>
      </div>
    </ElCard>
  </section>
</template>
