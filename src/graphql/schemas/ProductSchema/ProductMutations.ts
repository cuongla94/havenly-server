import { gql } from "apollo-server-core";

export const ProductMutations = gql`
  type Mutation {
    increaseProductClick(productId: ID!): Product!
    updateTopSellersProduct(uniqueId: ID!): Boolean!
  }
`;
