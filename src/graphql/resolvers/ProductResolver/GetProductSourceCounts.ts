export const getProductSourceCounts = async (_, __, { db }) => {
    try {
      const productSourceCounts = await db.collection('products').countDocuments({});
      return [{ count: productSourceCounts }];
    } catch (error: any) {
      console.error(`Error fetching product source counts: ${error.message}`, error);
      throw new Error(`Error fetching product source counts: ${error.message}`);
    }
  };
  