import { IntrospectedResource } from 'ra-data-graphql'

export const buildFieldList = (resource: IntrospectedResource) => {
  const fieldNames = resource.type.fields
    .filter((entry) => {
      return !entry.isDeprecated
    })
    .map((entry) => {
      if (entry.type.kind === 'SCALAR') {
        return entry.name
      }

      if (entry.type.kind === 'OBJECT') {
        return `${entry.name} { id }`
      }

      return entry.name
    })

  return fieldNames.join('\n')
}
