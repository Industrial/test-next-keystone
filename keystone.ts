import { createAuth } from '@keystone-6/auth'
import { config } from '@keystone-6/core'
import { statelessSessions } from '@keystone-6/core/session'
import { DatabaseProvider } from '@keystone-6/core/types'

// Can't use tsconfig prefixes here
import { env } from './env'
import { List, Tag, Todo, User } from './models'

const KEYSTONE_SESSION_SECRET = String(env.KEYSTONE_SESSION_SECRET)
const KEYSTONE_DB_PROVIDER = String(env.KEYSTONE_DB_PROVIDER) as DatabaseProvider
const KEYSTONE_DB_URL = String(env.KEYSTONE_DB_URL)
const KEYSTONE_DB_LOGGING = env.KEYSTONE_DB_LOGGING === 'true'

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  sessionData: 'username isAdmin',

  initFirstItem: {
    fields: ['email', 'password'],
    itemData: {
      isAdmin: true,
    },
    skipKeystoneWelcome: false,
  },
})

const session = statelessSessions({
  secret: KEYSTONE_SESSION_SECRET,
})

const configuration = withAuth(
  config({
    graphql: {
      apolloConfig: {
        introspection: true,
        allowBatchedHttpRequests: true,
      },
      queryLimits: {
        maxTotalResults: 100,
      },
    },
    db: {
      provider: KEYSTONE_DB_PROVIDER,
      url: KEYSTONE_DB_URL,
      enableLogging: KEYSTONE_DB_LOGGING,
    },
    experimental: {
      generateNextGraphqlAPI: true,
      generateNodeAPI: true,
    },
    lists: {
      List,
      Tag,
      Todo,
      User,
    },
    session,
  }),
)

export default configuration
