import { z } from 'zod'

export const getErrorMessage = (error: unknown) => {
  if (error instanceof z.ZodError) {
    return error.issues.map((i) => i.message).join(', ')
  }
  if (error instanceof Error) return error.message
  return String(error)
}
