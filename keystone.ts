import { createAuth } from '@keystone-6/auth'
import { config } from '@keystone-6/core'
import { statelessSessions } from '@keystone-6/core/session'

import { Post, Tag, User } from './models'

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  sessionData: 'username isAdmin',
})

const session = statelessSessions({
  secret: 'KEYBOARDCATKEYBOARDCATKEYBOARDCAT',
})

export default withAuth(
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
      provider: 'sqlite',
      url: 'file:./app.db',
    },
    experimental: {
      generateNextGraphqlAPI: true,
      generateNodeAPI: true,
    },
    lists: {
      Post,
      Tag,
      User,
    },
    session,
  }),
)
