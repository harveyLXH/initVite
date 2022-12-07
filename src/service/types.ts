export interface IDataType<T = any> {
  code: number
  message: string
  result: T
  timestamp: T
}
