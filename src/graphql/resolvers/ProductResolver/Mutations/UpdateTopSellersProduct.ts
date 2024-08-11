import mongoose from "mongoose";
import { Product, TopSellersProduct } from "../../../../models";

export const updateTopSellersProduct = async (uniqueId: string) => {
  try {
    const product = await Product.findOne({ uniqueId });

    if (!product) {
      console.log("No products found with this uniqueId");
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
      console.log("No products found with this productIdentifier");
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

    console.log(
      `TopSellersProducts updated/inserted for uniqueId: ${uniqueId}`
    );
  } catch (error) {
    console.error("Error updating TopSellersProducts:", error);
  }
};
