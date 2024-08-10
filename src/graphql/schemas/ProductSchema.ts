import { gql } from 'apollo-server-express';

export const ProductSchema = gql`
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

  input ProductFilterInput {
    gender: ProductGender
    brand: String
    productType: ProductType
    searchTerm: String
  }

  type ProductDetails {
    productName: String
    productBrand: String
    productSizeAvailable: String
    productDiscountPrice: String
    productRetailPrice: String
    productLink: String
    productImage: String
    productGender: ProductGender
    productType: ProductType  
    productRating: Float
    productCategories: [String]
  }

  type Product {
    id: ID!
    uniqueId: String
    productSource: String
    productSourceUrl: String
    productDetails: ProductDetails
  }

  type BrandCount {
    productBrand: String
    count: Int
  }

  type SourceCount {
    productSource: String
    count: Int
  }

  type ProductResponse {
    products: [Product]
    totalCount: Int
    brandCounts: [BrandCount]
  }

  type Query {
    getProducts(filter: ProductFilterInput, limit: Int, offset: Int): ProductResponse
    getProductById(id: String!): Product
    searchProducts(searchTerm: String!, filter: ProductFilterInput, limit: Int, offset: Int): ProductResponse
    getSourceCounts: [SourceCount]
  }
`;