import { IProduct } from 'types';
import { subMonths } from 'date-fns'; 
import Logger from '../../../../loaders/logger';
import { redisClient } from '../../../../services';

export const getNewlyAddedProducts = async (_, { limit = 10, offset = 0 }, { db }) => {
  const fourMonthsAgo = subMonths(new Date(), 4);
  const cacheKey = `newlyAddedProducts:${limit}:${offset}`;

  try {
    const cachedProducts = await redisClient.get(cacheKey);
    if (cachedProducts) {
      Logger.info('Serving newly added products from cache');
      return JSON.parse(cachedProducts);
    }
  } catch (error: any) {
    Logger.error('Error retrieving newly added products from Redis:', error.message);
  }

  try {
    const newlyAddedProducts: IProduct[] = await db.collection('products')
      .find({
        createdAt: { $gte: fourMonthsAgo }
      })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit)
      .toArray();

    const result = newlyAddedProducts.map((product: IProduct) => ({
      id: product.id.toString(),
      uniqueId: product.uniqueId,
      productSourceUrl: product.productSourceUrl,
      productDetails: product.productDetails,
      productClickCount: product.productClickCount,
      createdAt: product.createdAt,
    }));

    try {
      await redisClient.set(cacheKey, JSON.stringify(result), {
        EX: 300,
      });
      Logger.info('Newly added products cached successfully');
    } catch (error: any) {
      Logger.error('Error caching newly added products in Redis:', error.message);
    }

    return result;
  } catch (error: any) {
    Logger.error('Error fetching newly added products from database:', error.message);
    throw new Error('Failed to fetch newly added products');
  }
};
