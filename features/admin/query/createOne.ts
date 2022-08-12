import { gql } from 'graphql-tag'
import { IntrospectedResource } from 'ra-data-graphql'

import { buildFieldList } from './buildFieldList'
import { ListQueryParams } from './getList'
import { createParseOneResponse } from './parseResponse'

export const createOne = (resource: IntrospectedResource, params: ListQueryParams) => {
  const queryName = `create${resource.type.name}`
  const fieldList = buildFieldList(resource)

  const query = `
    mutation ${queryName}($data:${resource.type.name}CreateInput!) {
      ${queryName}(data:$data) {
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
