import { gql } from 'graphql-tag'
import { IntrospectedResource } from 'ra-data-graphql'

import { buildFieldList } from './buildFieldList'
import { createParseOneResponse } from './parseResponse'

type GetOneQueryParams = {
  id: string
}

export const getOne = (resource: IntrospectedResource, params: GetOneQueryParams) => {
  const queryName = resource.type.name.toLowerCase()
  const fieldList = buildFieldList(resource)

  const query = `
    query ${queryName}($id: ID!) {
      ${queryName}(
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
