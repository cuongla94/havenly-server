import { gql } from 'apollo-server-express';

export const ProductInputs = gql`
  input ProductFilterInput {
    gender: ProductGender
    brand: String
    productType: ProductType
    searchTerm: String
  }
`;
