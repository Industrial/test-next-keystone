import { Datagrid, List, TextField } from 'react-admin'

export const PostList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="slug" />
        <TextField source="title" />
      </Datagrid>
    </List>
  )
}
