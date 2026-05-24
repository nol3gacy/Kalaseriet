import { type SchemaTypeDefinition } from 'sanity'
import { productType } from './product'

export const schemaTypes: SchemaTypeDefinition[] = [
  productType,
]

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
}
