import mongoose from 'mongoose'; // Import mongoose

import { increaseProductClick, updateTopSellersProduct } from './Mutations';
import { searchProducts, getProductSourceCounts, getProducts } from './Queries/';

export const ProductResolver = {
  Query: {
    getProducts,
    searchProducts,
    getProductSourceCounts,
  },
  Mutation: {
    increaseProductClick,
    updateTopSellersProduct
  }
};
