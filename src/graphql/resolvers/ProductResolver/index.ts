import mongoose from 'mongoose'; // Import mongoose

import { getProducts } from './GetProducts';
import { searchProducts } from './SearchProducts';
import { getProductSourceCounts } from './GetProductSourceCounts';
import { increaseProductClick } from './Mutations';

export const ProductResolver = {
  Query: {
    getProducts,
    searchProducts,
    getProductSourceCounts,
  },
  Mutation: {
    increaseProductClick,
  }
};
