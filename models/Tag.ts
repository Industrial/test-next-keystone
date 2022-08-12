import { list } from '@keystone-6/core'
import { relationship, text } from '@keystone-6/core/fields'

import { Lists } from '.keystone/types'

export const Tag: Lists.Tag = list({
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
        },
      },
    }),

    posts: relationship({
      label: 'Posts',
      ref: 'Post',
      many: true,
      isFilterable: true,
      isOrderable: true,
    }),
  },
})
