import { gql } from 'graphql-tag'
import pluralize from 'pluralize'
import { IntrospectedResource } from 'ra-data-graphql'

import { buildFieldList } from './buildFieldList'
import { createParseListResponse } from './parseResponse'

export type ListQueryParams = {
  filter: Record<string, unknown>
  meta: unknown
  pagination: {
    page: number
    perPage: number
  }
  sort: {
    field: string
    order: 'ASC' | 'DESC'
  }
}

export const getList = (resource: IntrospectedResource, params: ListQueryParams) => {
  const queryName = pluralize(resource.type.name.toLowerCase())
  const countName = `${queryName}Count`
  const fieldList = buildFieldList(resource)

  const order = params.sort.order === 'ASC' ? 'asc' : 'desc'
  const take = params.pagination.perPage
  const skip = (params.pagination.page - 1) * params.pagination.perPage

  const query = `
    query ${queryName} {
      ${queryName}(
        where: {
        },
        orderBy: {
          ${params.sort.field}: ${order}
        },
        take: ${take},
        skip: ${skip},
      ) {
        ${fieldList}
      }
      ${countName}
    }
  `

  return {
    query: gql(query),
    parseResponse: createParseListResponse(queryName, countName),
  }
}
