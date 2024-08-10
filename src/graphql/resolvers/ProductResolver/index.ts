import { getProducts } from './GetProducts';
import { searchProducts } from './SearchProducts';
import { getProductSourceCounts } from './GetProductSourceCounts';

export const ProductResolver = {
  Query: {
    getProducts,
    searchProducts,
    getProductSourceCounts,
  }
};
