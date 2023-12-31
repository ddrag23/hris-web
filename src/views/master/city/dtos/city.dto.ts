export type CreateCityDto = {
  code: string
  name: string
  province_id: number | string
}

export type UpdateCityDto = {
  id: number
} & CreateCityDto
