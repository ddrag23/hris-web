export type CreateAllowanceDto = {
  price: number
  name: string
  position_id: number | string
}

export type UpdateAllowanceDto = {
  id: number
} & CreateAllowanceDto
