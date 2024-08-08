import { gql } from 'apollo-server-express';

export const ProductSchema = gql`
  type ProductDetails {
    productName: String
    productBrand: String
    productSizeAvailable: String
    productDiscountPrice: String
    productRetailPrice: String
    productLink: String
    productImage: String
    productGender: String
  }

  type Product {
    id: ID!
    uniqueId: String
    productSource: String
    productSourceUrl: String
    productDetails: ProductDetails
  }

  type Query {
    getProducts: [Product]
    getProductById(id: String!): Product
    searchProducts(brand: String, name: String): [Product]
  }
`;