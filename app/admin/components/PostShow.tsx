import { Show, SimpleShowLayout, TextField } from 'react-admin'

export const PostShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="slug" />
        <TextField source="content" />
      </SimpleShowLayout>
    </Show>
  )
}
