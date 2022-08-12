import { Lists } from '.keystone/types'

export type Session = {
  data: {
    id: string
    isAdmin: boolean
  }
}

export const isUserAccessOperation = (props: { session?: Session }) => {
  return Boolean(props.session?.data.id)
}

export const isAdminAccessOperation = (props: { session?: Session }) => {
  return Boolean(props.session?.data.isAdmin)
}

export const isCurrentUserAccessOperation = (props: { session?: Session; item: Lists.User.Item }) => {
  return Boolean(props.session?.data.id === props.item.id)
}

export const isAdminOrCurrentUserAccessOperation = (props: { session?: Session; item: Lists.User.Item }) => {
  return (
    isAdminAccessOperation({
      session: props.session,
    }) ||
    isCurrentUserAccessOperation({
      session: props.session,
      item: props.item,
    })
  )
}

export const queryPostsFilterOperation = (props: { session?: Session }) => {
  if (props.session?.data.isAdmin) {
    return true
  }

  return {
    isPublished: {
      equals: true,
    },
  }
}
