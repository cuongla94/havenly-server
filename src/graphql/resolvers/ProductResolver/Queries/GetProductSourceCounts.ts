import Logger from '../../../../loaders/logger';

export const getProductSourceCounts = async (_, __, { db }) => {
  try {
    const productSourceCounts = await db.collection('products').countDocuments({});
    return [{ count: productSourceCounts }];
  } catch (error: any) {
    Logger.error(`Error fetching product source counts: ${error.message}`, error);
    throw new Error('Failed to fetch product source counts');
  }
};
