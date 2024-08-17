import { Product, TopSellersProduct } from "../../../../models";
import Logger from "../../../../loaders/logger"; // Adjust the import path for your Logger

export const updateTopSellersProduct = async (uniqueId: string) => {
  try {
    const product = await Product.findOne({ uniqueId });

    if (!product) {
      Logger.warn(`No product found with uniqueId: ${uniqueId}`);
      return;
    }

    const productIdentifier = product.productIdentifier;

    const result = await Product.aggregate([
      { $match: { productIdentifier } },
      {
        $group: {
          _id: "$productIdentifier",
          totalClicks: { $sum: "$productClickCount" },
        },
      },
    ]);

    if (result.length === 0) {
      Logger.warn(`No products found with productIdentifier: ${productIdentifier}`);
      return;
    }

    const totalClicks = result[0].totalClicks;

    await TopSellersProduct.findOneAndUpdate(
      { uniqueId },
      {
        uniqueId,
        numberOfClickCount: totalClicks,
        updatedAt: new Date(),
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    Logger.info(`TopSellersProduct updated/inserted for uniqueId: ${uniqueId}`);
  } catch (error: any) {
    Logger.error(`Error updating TopSellersProduct for uniqueId: ${uniqueId}:`, error.message);
  }
};
