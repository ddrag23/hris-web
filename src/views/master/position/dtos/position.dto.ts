export type CreatePositionDto = {
  name: string
}

export type UpdatePositionDto = {
  id: number
} & CreatePositionDto
