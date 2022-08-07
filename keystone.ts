import { config, list } from '@keystone-6/core'
import { text } from '@keystone-6/core/fields'

import { Lists } from '.keystone/types'

const Post: Lists.Post = list({
  fields: {
    title: text({ validation: { isRequired: true } }),
    slug: text({ isIndexed: 'unique', isFilterable: true }),
    content: text(),
  },
})

export default config({
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
  },
})
