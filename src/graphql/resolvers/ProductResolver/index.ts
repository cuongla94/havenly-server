import { GetProducts } from './GetProducts';
import { SearchProducts } from './SearchProducts';
import { GetProductSourceCounts } from './GetProductSourceCounts';

export const ProductResolver = {
  Query: {
    GetProducts,
    SearchProducts,
    GetProductSourceCounts,
  }
};
