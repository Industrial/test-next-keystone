import { list } from '@keystone-6/core'
import { checkbox, password, text } from '@keystone-6/core/fields'
import bcrypt from 'bcryptjs'

import { allowAdmin, allowCurrentUserAndAdmin } from '../lib/keystone/authentication'
import { Lists } from '.keystone/types'

export const User: Lists.User = list({
  access: {
    item: {
      create: allowAdmin,
      update: allowCurrentUserAndAdmin,
      delete: allowCurrentUserAndAdmin,
    },
  },

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
        read: allowCurrentUserAndAdmin,
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
        },
      },
      access: {
        read: allowCurrentUserAndAdmin,
      },
      bcrypt,
    }),

    isAdmin: checkbox({
      label: 'Admin',
      isFilterable: true,
      isOrderable: true,
      access: {
        read: allowCurrentUserAndAdmin,
      },
    }),
  },
})
