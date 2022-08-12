export const isProduction = () => {
  return process.env.NODE_ENV === 'production'
}

export const isDevelopment = () => {
  return !isProduction()
}

export const isServer = () => {
  return typeof process !== 'undefined'
}

export const isClient = () => {
  return !isServer()
}
