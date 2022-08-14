import { list } from '@keystone-6/core'
import { relationship, text, timestamp } from '@keystone-6/core/fields'

import {
  allowOwnerAndAdmin,
  isAdminAccessOperation,
  isOwnerAccessOperation,
  willConnectCurrentUserItemOperation,
  willCreateUserItemOperation,
  willDisconnectUserItemOperation,
} from '../lib/keystone/authentication'
import { Lists } from '.keystone/types'

export const List: Lists.List = list({
  access: {
    item: {
      create: ({ session, inputData }) => {
        if (isAdminAccessOperation({ session })) {
          return true
        }

        if (!inputData.user) {
          return false
        }

        if (willCreateUserItemOperation(inputData.user)) {
          return false
        }

        if (willDisconnectUserItemOperation(inputData.user)) {
          return false
        }

        if (!willConnectCurrentUserItemOperation({ session, user: inputData.user })) {
          return false
        }

        return true
      },

      update: ({ session, item, inputData }) => {
        if (isAdminAccessOperation({ session })) {
          return true
        }

        if (!isOwnerAccessOperation({ session, item })) {
          return false
        }

        if (inputData.user) {
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

    todos: relationship({
      label: 'Todos',
      ref: 'Todo',
      many: true,
      isFilterable: true,
      isOrderable: true,

      access: {
        read: allowOwnerAndAdmin,
      },
    }),
  },
})
