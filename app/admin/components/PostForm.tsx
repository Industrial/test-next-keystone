import { SimpleForm, TextInput } from 'react-admin'

export const PostForm = () => {
  return (
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="slug" />
      <TextInput source="content" />
    </SimpleForm>
  )
}
