export type APIBaseResponse<T> = {
  data: T
}

export type APIErrorResponse = {
  message: string
  code: number | undefined
}
