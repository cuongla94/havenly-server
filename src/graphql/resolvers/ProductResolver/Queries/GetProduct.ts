import { ObjectId } from 'mongodb';
import { IProduct } from 'types';

export const getProduct = async (_, { productId }, { db }) => {
  const product: IProduct = await db.collection('products').findOne({ _id: new ObjectId(productId) });

  if (!product) {
    throw new Error('Product not found');
  }

  const relatedProducts = await db.collection('products').find({
    "productDetails.productType": product.productDetails.productType,
    "productDetails.productBrand": product.productDetails.productBrand,
    _id: { $ne: product.id }
  }).limit(5).toArray();

  return {
    ...product,
    relatedProducts: relatedProducts.map((relatedProduct: IProduct) => ({
      id: relatedProduct.id.toString(),
      uniqueId: relatedProduct.uniqueId,
      productSourceUrl: relatedProduct.productSourceUrl,
      productDetails: relatedProduct.productDetails,
    }))
  };
};
