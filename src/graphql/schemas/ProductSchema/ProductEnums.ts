import { gql } from 'apollo-server-express';

export const ProductEnums = gql`
  enum ProductGender {
    male
    female
    unisex
  }

  enum ProductType {
    fragrance
    bath
    skincare
    makeup
  }

  enum ProductCurrency {
    AUD
    USD
    EUR
  }
`;
