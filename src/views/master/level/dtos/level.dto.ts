export type CreateLevelDto = {
  name: string
}

export type UpdateLevelDto = {
  id: number
} & CreateLevelDto
