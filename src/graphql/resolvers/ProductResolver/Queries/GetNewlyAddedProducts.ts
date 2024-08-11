import { ObjectId } from 'mongodb';
import { IProduct } from 'types';
import { subMonths } from 'date-fns'; 

export const getNewlyAddedProducts = async (_, { limit = 10, offset = 0 }, { db }) => {
  const fourMonthsAgo = subMonths(new Date(), 4);

  const newlyAddedProducts: IProduct[] = await db.collection('products')
    .find({
      createdAt: { $gte: fourMonthsAgo }
    })
    .sort({ createdAt: -1 })
    .skip(offset)
    .limit(limit)
    .toArray();

  return newlyAddedProducts.map((product: IProduct) => ({
    id: product.id.toString(),
    uniqueId: product.uniqueId,
    productSourceUrl: product.productSourceUrl,
    productDetails: product.productDetails,
    productClickCount: product.productClickCount,
    createdAt: product.createdAt,
  }));
};
