import { Lists, UserRelateToOneForCreateInput, UserRelateToOneForUpdateInput } from '.keystone/types'

export type Session = {
  data: {
    id: string
    isAdmin: boolean
  }
}

export type ObjectWithUserId = {
  userId: string | null
}

export const hasSessionAccessOperation = ({ session }: { session: Session }): boolean => {
  return Boolean(session?.data.id)
}

export const isAdminAccessOperation = ({ session }: { session: Session }): boolean => {
  return Boolean(session?.data.isAdmin)
}

export const isCurrentUserAccessOperation = ({ session, item }: { session: Session; item: Lists.User.Item }): boolean => {
  return session.data.id === item.id
}

export const isOwnerAccessOperation = <T extends ObjectWithUserId>({ session, item }: { session: Session; item: T }): boolean => {
  return session.data.id === item.userId
}

export const willCreateUserItemOperation = (user: UserRelateToOneForCreateInput | UserRelateToOneForUpdateInput) => {
  return Boolean(user.create)
}

export const willConnectUserItemOperation = (user: UserRelateToOneForCreateInput | UserRelateToOneForUpdateInput) => {
  return Boolean(user.connect)
}

export const willDisconnectUserItemOperation = (user: UserRelateToOneForUpdateInput) => {
  return Boolean(user.disconnect)
}

export const willConnectCurrentUserItemOperation = ({
  session,
  user,
}: {
  session: Session
  user: UserRelateToOneForCreateInput | UserRelateToOneForUpdateInput
}) => {
  return user.connect?.id === session.data.id
}

export const allowAdmin = ({ session }: { session: Session }) => {
  if (isAdminAccessOperation({ session })) {
    return true
  }

  return false
}

export const allowCurrentUserAndAdmin = ({ session, item }: { session: Session; item: Lists.User.Item }) => {
  if (isAdminAccessOperation({ session })) {
    return true
  }

  if (!isCurrentUserAccessOperation({ session, item })) {
    return false
  }

  return true
}

export const allowOwnerAndAdmin = ({ session, item }: { session: Session; item: ObjectWithUserId }) => {
  if (isAdminAccessOperation({ session })) {
    return true
  }

  if (!isOwnerAccessOperation({ session, item })) {
    return false
  }

  return true
}
