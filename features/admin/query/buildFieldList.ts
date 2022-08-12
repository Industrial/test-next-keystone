import { IntrospectedResource } from 'ra-data-graphql'

export const buildFieldList = (resource: IntrospectedResource) => {
  const fieldNames = resource.type.fields
    .filter((entry) => {
      return !entry.isDeprecated
    })
    .map((entry) => {
      return entry.name
    })

  return fieldNames.join('\n')
}
