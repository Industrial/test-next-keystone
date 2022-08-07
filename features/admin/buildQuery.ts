import { gql } from 'graphql-tag'
import pluralize from 'pluralize'
import { BuildQuery, BuildQueryFactory, IntrospectedResource } from 'ra-data-graphql'

export const buildQueryFactory: BuildQueryFactory = (introspectionResults) => {
  const buildFieldList = (resource: IntrospectedResource, fetchType: string) => {
    const fieldNames = resource.type.fields
      .filter((entry) => {
        return !entry.isDeprecated
      })
      .map((entry) => {
        return entry.name
      })

    return fieldNames.join('\n')
  }

  const buildQuery: BuildQuery = (fetchType, resourceName, params) => {
    const resource = introspectionResults.resources.find((r) => {
      return r.type.name === resourceName
    })

    if (!resource) {
      throw new Error(`Resource '${resourceName}' not found`)
    }

    type KeystoneResponse = {
      loading: boolean
      networkStatus: number
      data: Record<string, unknown>
    }

    const getList = () => {
      const queryName = pluralize(resource.type.name.toLowerCase())
      const countName = `${queryName}Count`
      const fieldList = buildFieldList(resource, fetchType)

      return {
        query: gql`
          query ${queryName} {
            ${queryName} {
              ${fieldList}
            }
            ${countName}
          }
        `,
        variables: params,
        parseResponse: (response: KeystoneResponse) => {
          return {
            ...response,
            data: response.data[queryName],
            total: response.data[countName],
          }
        },
      }
    }

    const getOne = () => {
      const queryName = resource.type.name.toLowerCase()
      const fieldList = buildFieldList(resource, fetchType)

      return {
        query: gql`
          query ${queryName} ($id: ID) {
            ${queryName}(where:{
              id: $id
            }) {
              ${fieldList}
            }
          }
        `,
        variables: params,
        parseResponse: (response: KeystoneResponse) => {
          return {
            ...response,
            data: response.data[queryName],
          }
        },
      }
    }

    const createOne = () => {
      const queryName = `create${resource.type.name}`
      const fieldList = buildFieldList(resource, fetchType)

      return {
        query: gql`
          mutation ${queryName}($data:${resource.type.name}CreateInput!) {
            ${queryName}(data:$data) {
              ${fieldList}
            }
          }
        `,
        variables: params,
        parseResponse: (response: KeystoneResponse) => {
          return {
            ...response,
            data: response.data[queryName],
          }
        },
      }
    }

    const updateOne = () => {
      const queryName = `update${resource.type.name}`
      const fieldList = buildFieldList(resource, fetchType)

      delete params.data.__typename
      delete params.data.id

      return {
        query: gql`
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
        `,
        variables: params,
        parseResponse: (response: KeystoneResponse) => {
          return {
            ...response,
            data: response.data[queryName],
          }
        },
      }
    }

    const deleteOne = () => {
      const queryName = `delete${resource.type.name}`
      const fieldList = buildFieldList(resource, fetchType)

      return {
        query: gql`
          mutation ${queryName} ($id: ID) {
            ${queryName} (where:{
              id: $id
            }) {
              ${fieldList}
            }
          }
        `,
        variables: params,
        parseResponse: (response: KeystoneResponse) => {
          return {
            ...response,
            data: response.data[queryName],
          }
        },
      }
    }

    switch (fetchType) {
      case 'GET_LIST':
        return getList()

      case 'GET_ONE':
        return getOne()

      case 'CREATE':
        return createOne()

      case 'UPDATE':
        return updateOne()

      case 'DELETE':
        return deleteOne()

      default:
        debugger
        throw new Error(`Fetch type '${fetchType}' not supported`)
    }
  }

  return buildQuery
}
