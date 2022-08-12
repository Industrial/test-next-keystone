export type KeystoneResponse = {
  loading: boolean
  networkStatus: number
  data: Record<string, unknown>
}

export const createParseOneResponse = (queryName: string) => {
  return (response: KeystoneResponse) => {
    return {
      ...response,
      data: response.data[queryName],
    }
  }
}

export const createParseListResponse = (queryName: string, countName: string) => {
  return (response: KeystoneResponse) => {
    return {
      ...response,
      data: response.data[queryName],
      total: response.data[countName],
    }
  }
}
