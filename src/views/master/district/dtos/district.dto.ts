export type CreateDistrictDto = {
  code: string
  name: string
  city_id: number | string
}

export type UpdateDistrictDto = {
  id: number
} & CreateDistrictDto
