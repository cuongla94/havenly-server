import { gql } from 'apollo-server-express';

export const ProductTypes = gql`
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
    productPriceHistory: [ProductPriceHistory]
  }

  type Product {
    id: ID!
    uniqueId: String
    productSourceUrl: String
    productDetails: ProductDetails
    clickCount: Int 
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
`;
