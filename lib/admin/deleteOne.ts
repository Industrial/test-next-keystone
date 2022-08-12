import { gql } from 'graphql-tag'
import { IntrospectedResource } from 'ra-data-graphql'

import { buildFieldList } from './buildFieldList'
import { ListQueryParams } from './getList'
import { createParseOneResponse } from './parseResponse'

export const deleteOne = (resource: IntrospectedResource, params: ListQueryParams) => {
  const queryName = `delete${resource.type.name}`
  const fieldList = buildFieldList(resource)

  const query = `
    mutation ${queryName} ($id: ID) {
      ${queryName} (
        where:{
          id: $id
        }
      ) {
        ${fieldList}
      }
    }
  `

  return {
    query: gql(query),
    variables: params,
    parseResponse: createParseOneResponse(queryName),
  }
}
