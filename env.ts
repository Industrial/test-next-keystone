import { loadEnvConfig } from '@next/env'

import { isDevelopment } from './lib/environment'

const development = isDevelopment()

export const env = loadEnvConfig('.', development).combinedEnv
