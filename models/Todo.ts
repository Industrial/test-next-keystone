import { list } from '@keystone-6/core'
import { checkbox, relationship, select, text, timestamp } from '@keystone-6/core/fields'

import { allowOwnerAndAdmin, isAdminAccessOperation, isOwnerAccessOperation } from '../lib/keystone/authentication'
import { Lists } from '.keystone/types'

export const Todo: Lists.Todo = list({
  hooks: {
    resolveInput: async ({ resolvedData, context: { session } }) => {
      // return resolvedData
      console.log('resolveInput:resolvedData', resolvedData)
      return {
        ...resolvedData,
        user: {
          connect: {
            id: session.data.id,
          },
        },
      }
    },
  },

  access: {
    item: {
      create: ({ session, inputData }) => {
        if (isAdminAccessOperation({ session })) {
          return true
        }

        if (!inputData.list?.connect) {
          return false
        }

        return true
      },

      update: ({ session, item }) => {
        if (isAdminAccessOperation({ session })) {
          return true
        }

        if (!isOwnerAccessOperation({ session, item })) {
          return false
        }

        return true
      },

      delete: allowOwnerAndAdmin,
    },
  },

  fields: {
    label: text({
      label: 'Label',
      isIndexed: 'unique',
      isFilterable: true,
      isOrderable: true,
      validation: {
        isRequired: true,
        length: {
          min: 3,
          max: 50,
        },
      },

      access: {
        read: allowOwnerAndAdmin,
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
          max: 50,
        },
      },

      access: {
        read: allowOwnerAndAdmin,
      },
    }),

    description: text({
      label: 'Description',
      isFilterable: true,
      isOrderable: true,
      validation: {
        isRequired: false,
        length: {
          min: 3,
        },
      },
      access: {
        read: allowOwnerAndAdmin,
      },
    }),

    isCompleted: checkbox({
      label: 'Completed',
      isFilterable: true,
      isOrderable: true,
      defaultValue: false,

      access: {
        read: allowOwnerAndAdmin,
      },
    }),

    priority: select({
      label: 'Priority',
      isFilterable: true,
      isOrderable: true,
      options: [
        {
          label: 'Low',
          value: 'low',
        },
        {
          label: 'Medium',
          value: 'medium',
        },
        {
          label: 'High',
          value: 'high',
        },
      ],

      access: {
        read: allowOwnerAndAdmin,
      },
    }),

    dueDate: timestamp({
      label: 'Due Date',
      isIndexed: true,
      isFilterable: true,
      isOrderable: true,

      access: {
        read: allowOwnerAndAdmin,
      },
    }),

    startDate: timestamp({
      label: 'Start Date',
      isIndexed: true,
      isFilterable: true,
      isOrderable: true,

      access: {
        read: allowOwnerAndAdmin,
      },
    }),

    endDate: timestamp({
      label: 'End Date',
      isIndexed: true,
      isFilterable: true,
      isOrderable: true,

      access: {
        read: allowOwnerAndAdmin,
      },
    }),

    creationDate: timestamp({
      label: 'Creation Date',
      isIndexed: false,
      isFilterable: true,
      isOrderable: true,
      defaultValue: {
        kind: 'now',
      },
      validation: {
        isRequired: true,
      },

      access: {
        read: allowOwnerAndAdmin,
      },
    }),

    updateDate: timestamp({
      label: 'Update Date',
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

      access: {
        read: allowOwnerAndAdmin,
      },
    }),

    user: relationship({
      label: 'User',
      ref: 'User',
      many: false,
      isFilterable: true,
      isOrderable: true,

      access: {
        read: allowOwnerAndAdmin,
      },
    }),

    list: relationship({
      label: 'List',
      ref: 'List',
      many: false,
      isFilterable: true,
      isOrderable: true,

      access: {
        read: allowOwnerAndAdmin,
      },
    }),

    tags: relationship({
      label: 'Tags',
      ref: 'Tag',
      many: true,
      isFilterable: true,
      isOrderable: true,

      access: {
        read: allowOwnerAndAdmin,
      },
    }),
  },
})
