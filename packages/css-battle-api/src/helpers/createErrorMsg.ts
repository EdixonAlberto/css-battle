export function createErrorMsg(title: string, error: Error | string): string {
  const errorMessage: string = typeof error === 'string' ? error : error.message

  return `>> ${title} -> ${errorMessage}`
}
