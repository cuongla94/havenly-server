import { Product, IProductDocument } from '../../../../models';
import mongoose from 'mongoose';

interface ResolverContext {
  db: mongoose.Connection;
}

interface IncreaseProductClickArgs {
  productId: string;
}

export const increaseProductClick = async (
  _: unknown, 
  { productId }: IncreaseProductClickArgs, 
  { db }: ResolverContext
): Promise<IProductDocument> => {
  const product = await Product.findOneAndUpdate(
    { uniqueId: productId },
    { $inc: { productClickCount: 1 } },
    { returnDocument: 'after' }
  ).exec();

  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};
