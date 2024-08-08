import { makeExecutableSchema } from '@graphql-tools/schema';
import { ProductSchema } from './schemas';
import { ProductResolver } from './resolvers/ProductResolver';

export const GraphqlSchema = makeExecutableSchema({
  typeDefs: [ProductSchema],
  resolvers: [ProductResolver],
});
