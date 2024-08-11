import mongoose from 'mongoose'; // Import mongoose

import { increaseProductClick, updateTopSellersProduct } from './Mutations';
import { searchProducts, getProductSourceCounts, getProducts, getProduct } from './Queries/';

export const ProductResolver = {
  Query: {
    getProducts,
    searchProducts,
    getProductSourceCounts,
    getProduct
  },
  Mutation: {
    increaseProductClick,
    updateTopSellersProduct
  }
};
