export type CreateProvinceDto = {
  code: string
  name: string
}

export type UpdateProvinceDto = {
  id: number
} & CreateProvinceDto
