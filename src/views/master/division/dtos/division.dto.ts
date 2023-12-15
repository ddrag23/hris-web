export type CreateDivisionDto = {
  name: string
}

export type UpdateDivisionDto = {
  id: number
} & CreateDivisionDto
