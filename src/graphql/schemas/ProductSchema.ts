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

  enum ProductCurrency {
    AUD
    USD
    EUR
  }

  input ProductFilterInput {
    gender: ProductGender
    brand: String
    productType: ProductType
    searchTerm: String
  }

  type ProductPriceHistory {
    price: String
    date: String
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
    productSubType: String
    productSKU: String
    productUPC: String
    productStockQuantity: Int
    productInStock: Boolean
    productCurrency: ProductCurrency
    productShippingCost: String
    productRetailer: String
    priceHistory: [ProductPriceHistory]
  }

  type Product {
    id: ID!
    uniqueId: String
    productSourceUrl: String
    productDetails: ProductDetails
  }

  type ProductBrandCount {
    count: Int
  }

  type ProductSourceCount {
    count: Int
  }

  type ProductResponse {
    products: [Product]
    totalCount: Int
    productBrandCounts: [ProductBrandCount]
    productSourceCounts: [ProductSourceCount]
  }

  type Query {
    getProducts(filter: ProductFilterInput, limit: Int, offset: Int): ProductResponse
    getProductById(id: String!): Product
    searchProducts(searchTerm: String!, filter: ProductFilterInput, limit: Int, offset: Int): ProductResponse
    getProductSourceCounts: [ProductSourceCount]
  }
`;
