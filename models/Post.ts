import { list } from '@keystone-6/core'
import { checkbox, relationship, text, timestamp } from '@keystone-6/core/fields'

import { isAdminAccessOperation, queryPostsFilterOperation } from '../lib/keystone/authentication'
import { Lists } from '.keystone/types'

export const Post: Lists.Post = list({
  access: {
    operation: {
      create: isAdminAccessOperation,
      update: isAdminAccessOperation,
      delete: isAdminAccessOperation,
    },
    filter: {
      query: queryPostsFilterOperation,
    },
  },

  fields: {
    title: text({
      label: 'Title',
      isIndexed: 'unique',
      isFilterable: true,
      isOrderable: true,
      validation: {
        isRequired: true,
        length: {
          min: 3,
        },
      },
    }),

    slug: text({
      label: 'Slug',
      isIndexed: 'unique',
      isFilterable: true,
      isOrderable: true,
      validation: {
        isRequired: true,
        length: {
          min: 3,
        },
      },
    }),

    content: text({
      label: 'Content',
      isFilterable: true,
      isOrderable: true,
      validation: {
        isRequired: true,
        length: {
          min: 3,
        },
      },
    }),

    dateCreated: timestamp({
      label: 'Date Created',
      isIndexed: false,
      isFilterable: true,
      isOrderable: true,
      defaultValue: {
        kind: 'now',
      },
      validation: {
        isRequired: true,
      },
    }),

    dateUpdated: timestamp({
      label: 'Date Updated',
      isIndexed: false,
      isFilterable: true,
      isOrderable: true,
      db: {
        updatedAt: true,
      },
      defaultValue: {
        kind: 'now',
      },
      validation: {
        isRequired: true,
      },
    }),

    datePublished: timestamp({
      label: 'Date Published',
      isIndexed: true,
      isFilterable: true,
      isOrderable: true,
      defaultValue: {
        kind: 'now',
      },
      validation: {
        isRequired: true,
      },
    }),

    isPublished: checkbox({
      label: 'Published',
      isFilterable: true,
      isOrderable: true,
      defaultValue: false,
    }),

    author: relationship({
      label: 'Author',
      ref: 'User',
      many: false,
      isFilterable: true,
      isOrderable: true,
    }),
  },
})
