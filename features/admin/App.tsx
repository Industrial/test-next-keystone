import buildGraphQLProvider from 'ra-data-graphql'
import { Admin, Resource } from 'react-admin'

import { buildQueryFactory } from '@/features/admin/buildQuery'
import { PostCreate, PostEdit, PostList, PostShow } from '@/features/admin/posts/components'

const dataProvider = await buildGraphQLProvider({
  buildQuery: buildQueryFactory,

  clientOptions: {
    uri: '/api/graphql',
  },

  // client: {
  //   networkInterface: createNetworkInterface({
  //       uri: '/api/graphql',
  //   }),
  // },
})

export default () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="Post" list={PostList} show={PostShow} edit={PostEdit} create={PostCreate} />
      {/* <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} /> */}
    </Admin>
  )
}
