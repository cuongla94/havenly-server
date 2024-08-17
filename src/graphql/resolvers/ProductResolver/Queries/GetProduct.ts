import { ObjectId } from 'mongodb';
import { IProduct } from 'types';
import Logger from '../../../../loaders/logger';
import { redisClient } from '../../../../services';

export const getProduct = async (_, { productId }, { db }) => {
  const cacheKey = `product:${productId}`;

  try {
    const cachedProduct = await redisClient.get(cacheKey);
    if (cachedProduct) {
      Logger.info(`Serving product ${productId} from cache`);
      return JSON.parse(cachedProduct);
    }
  } catch (error: any) {
    Logger.error(`Error retrieving product ${productId} from Redis:`, error.message);
  }

  try {
    const product: IProduct = await db.collection('products').findOne({ _id: new ObjectId(productId) });

    if (!product) {
      Logger.warn(`Product ${productId} not found`);
      throw new Error('Product not found');
    }

    const relatedProducts = await db.collection('products').find({
      "productDetails.productType": product.productDetails.productType,
      "productDetails.productBrand": product.productDetails.productBrand,
      _id: { $ne: product.id }
    }).limit(5).toArray();

    const result = {
      ...product,
      relatedProducts: relatedProducts.map((relatedProduct: IProduct) => ({
        id: relatedProduct.id.toString(),
        uniqueId: relatedProduct.uniqueId,
        productSourceUrl: relatedProduct.productSourceUrl,
        productDetails: relatedProduct.productDetails,
      }))
    };

    try {
      await redisClient.set(cacheKey, JSON.stringify(result), {
        EX: 300,
      });
      Logger.info(`Product ${productId} cached successfully`);
    } catch (error: any) {
      Logger.error(`Error caching product ${productId} in Redis:`, error.message);
    }

    return result;
  } catch (error: any) {
    Logger.error(`Error fetching product ${productId} from database:`, error.message);
    throw new Error('Failed to fetch product');
  }
};
