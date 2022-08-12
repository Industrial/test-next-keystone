import { list } from '@keystone-6/core'
import { checkbox, password, text } from '@keystone-6/core/fields'

import {
  isAdminAccessOperation,
  isAdminOrCurrentUserAccessOperation,
  isCurrentUserAccessOperation,
  isUserAccessOperation,
} from '../lib/keystone/authentication'
import { Lists } from '.keystone/types'

export const User: Lists.User = list({
  fields: {
    username: text({
      isIndexed: 'unique',
    }),

    email: text({
      isIndexed: 'unique',
      access: {
        read: isAdminOrCurrentUserAccessOperation,
        update: isCurrentUserAccessOperation,
      },
    }),

    password: password({
      access: {
        read: isAdminOrCurrentUserAccessOperation,
        update: isCurrentUserAccessOperation,
      },
    }),

    isAdmin: checkbox({
      access: {
        read: isUserAccessOperation,
        update: isAdminAccessOperation,
      },
    }),
  },
})
