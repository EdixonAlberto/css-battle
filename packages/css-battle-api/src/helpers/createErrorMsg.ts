export function createErrorMsg(title: string, error: unknown): string {
  let errorMessage = ''

  if (typeof error === 'string') errorMessage = error
  if (error instanceof Error) errorMessage = error.message
  if (errorMessage) return `>> ${title} -> ${errorMessage}`
  else {
    console.error(error)
    return errorMessage
  }
}
