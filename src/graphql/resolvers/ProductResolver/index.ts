import mongoose from 'mongoose'; // Import mongoose

import { getProducts } from './GetProducts';
import { searchProducts } from './SearchProducts';
import { getProductSourceCounts } from './GetProductSourceCounts';

export const ProductResolver = {
  Query: {
    getProducts,
    searchProducts,
    getProductSourceCounts,
  },
  Mutation: {
    increaseProductClick: async (_, { productId }) => {
      const product = await mongoose.model('Product').findOneAndUpdate(
        { uniqueId: productId },
        { $inc: { productClickCount: 1 } },
        { returnDocument: 'after' }
      );

      if (!product) {
        throw new Error('Product not found');
      }

      return product;
    },
  }
};
