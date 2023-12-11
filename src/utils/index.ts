import type { AxiosResponse } from 'axios'
import lodash from 'lodash'

export function handleDownload(response: AxiosResponse, filename: string) {
  const url = window.URL.createObjectURL(
    new Blob([response.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
  )
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `${filename}.xlsx`) // Specify the file name
  document.body.appendChild(link)
  link.click()
}

export function isType<Type>(variable: any): variable is Type {
  return true
}

export function formatDate(date: Date) {
  const instance = new Date(date)
  return `${instance.getFullYear()}-${instance.getMonth()}-${instance.getDate()}`
}

export function convertToIDR(amount: number) {
  const formattedAmount = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  })

  return formattedAmount.format(amount)
}

export function resetStore({ store }: any) {
  const initialState = lodash.cloneDeep(store.$state)
  store.$reset = () => store.$patch(lodash.cloneDeep(initialState))
}
