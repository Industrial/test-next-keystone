import buildGraphQLProvider from 'ra-data-graphql'
import { Admin, Resource } from 'react-admin'

import { PostCreate, PostEdit, PostList, PostShow } from '@/app/admin/components'
import { buildQueryFactory } from '@/lib/admin'

const dataProvider = await buildGraphQLProvider({
  buildQuery: buildQueryFactory,

  clientOptions: {
    uri: '/api/graphql',
  },
})

export const Application = () => {
  console.log('Application')

  return (
    <div data-testid="Application">
      <Admin dataProvider={dataProvider}>
        <Resource name="Post" list={PostList} show={PostShow} edit={PostEdit} create={PostCreate} />
      </Admin>
    </div>
  )
}
