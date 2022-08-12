import { gql } from 'graphql-tag'
import { IntrospectedResource } from 'ra-data-graphql'

import { buildFieldList } from './buildFieldList'
import { createParseOneResponse } from './parseResponse'

type UpdateOneQueryParams = {
  id: string
  data: Record<string, unknown>
}

export const updateOne = (resource: IntrospectedResource, params: UpdateOneQueryParams) => {
  const queryName = `update${resource.type.name}`
  const fieldList = buildFieldList(resource)

  delete params.data.__typename
  delete params.data.id

  const query = `
    mutation ${queryName}($data:${resource.type.name}UpdateInput!) {
      ${queryName}(
        where: {
          id: "${params.id}"
        },
        data: $data
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
