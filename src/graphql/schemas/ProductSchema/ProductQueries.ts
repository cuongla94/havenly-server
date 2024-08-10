import { gql } from 'apollo-server-express';

export const ProductQueries = gql`
  type Query {
    getProducts(filter: ProductFilterInput, limit: Int, offset: Int): ProductResponse
    getProductById(id: String!): Product
    searchProducts(searchTerm: String!, filter: ProductFilterInput, limit: Int, offset: Int): ProductResponse
    getProductSourceCounts: [ProductSourceCount]
  }
`;
