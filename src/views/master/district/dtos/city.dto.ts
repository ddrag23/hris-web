export type CreateCityDto = {
  code: string
  name: string
  province_id: number
}

export type UpdateCityDto = {
  id: number
} & CreateCityDto
