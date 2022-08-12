import { list } from '@keystone-6/core'
import { checkbox, password, text } from '@keystone-6/core/fields'
import bcrypt from 'bcryptjs'

import {
  isAdminAccessOperation,
  isAdminOrCurrentUserAccessOperation,
  isCurrentUserAccessOperation,
  isUserAccessOperation,
} from '../lib/keystone/authentication'
import { Lists } from '.keystone/types'

export const User: Lists.User = list({
  ui: {
    labelField: 'username',
  },

  fields: {
    username: text({
      label: 'Username',
      isIndexed: 'unique',
      isFilterable: true,
      isOrderable: true,
      validation: {
        isRequired: true,
        length: {
          min: 3,
          max: 36,
        },
      },
    }),

    email: text({
      label: 'Email',
      isIndexed: 'unique',
      isFilterable: true,
      isOrderable: true,
      validation: {
        isRequired: true,
        length: {
          min: 3,
          max: 254, // http://stackoverflow.com/a/574698/1945631
        },
      },
      access: {
        read: isAdminOrCurrentUserAccessOperation,
        update: isCurrentUserAccessOperation,
      },
    }),

    password: password({
      label: 'Password',
      isFilterable: true,
      isOrderable: true,
      validation: {
        isRequired: true,
        length: {
          min: 3,
          // max: 4096,
        },
      },
      access: {
        read: isAdminOrCurrentUserAccessOperation,
        update: isCurrentUserAccessOperation,
      },
      bcrypt,
    }),

    isAdmin: checkbox({
      label: 'Admin',
      isFilterable: true,
      isOrderable: true,
      access: {
        read: isUserAccessOperation,
        update: isAdminAccessOperation,
      },
    }),
  },
})
