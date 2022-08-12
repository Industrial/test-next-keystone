import { BuildQuery, BuildQueryFactory } from 'ra-data-graphql'

import { createOne, deleteOne, getList, getOne, updateOne } from '.'

export const buildQueryFactory: BuildQueryFactory = (introspectionResults) => {
  const buildQuery: BuildQuery = (fetchType, resourceName, params) => {
    const resource = introspectionResults.resources.find((r) => {
      return r.type.name === resourceName
    })

    if (!resource) {
      throw new Error(`Resource '${resourceName}' not found`)
    }

    switch (fetchType) {
      case 'GET_LIST':
        return getList(resource, params)

      case 'GET_ONE':
        return getOne(resource, params)

      case 'CREATE':
        return createOne(resource, params)

      case 'UPDATE':
        return updateOne(resource, params)

      case 'DELETE':
        return deleteOne(resource, params)

      default:
        throw new Error(`Fetch type '${fetchType}' not supported`)
    }
  }

  return buildQuery
}
