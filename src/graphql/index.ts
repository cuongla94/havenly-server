import { makeExecutableSchema } from '@graphql-tools/schema';
import { ProductSchema, SearchSchema } from './schemas';
import { ProductResolver, SearchResolver } from './resolvers';

export const GraphqlSchema = makeExecutableSchema({
  typeDefs: [ProductSchema, SearchSchema],
  resolvers: [ProductResolver, SearchResolver],
});
