import { Create } from 'react-admin'

import { PostForm } from './PostForm'

export const PostCreate = () => {
  return (
    <Create>
      <PostForm />
    </Create>
  )
}
