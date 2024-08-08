import { ObjectId } from 'mongodb';

export const ProductResolver = {
  Query: {
    getProducts: async (_, __, { db }) => {
      try {
        const products = await db.collection('products').find().toArray();
        return products.map(product => ({
          id: product._id.toString(),
          uniqueIdentifier: product.uniqueIdentifier,
          productDetails: product.productDetails,
          productSource: product.productSource,
          productSourceUrl: product.productSourceUrl,
        }));
      } catch (error: any) {
        throw new Error(`Error fetching products: ${error.message}`);
      }
    },
    getProductById: async (_, { id }, { db }) => {
      try {
        const product = await db.collection('products').findOne({ _id: new ObjectId(id) });
        if (!product) throw new Error('Product not found');
        return {
          id: product._id.toString(),
          uniqueIdentifier: product.uniqueIdentifier,
          productDetails: product.productDetails,
          productSource: product.productSource,
          productSourceUrl: product.productSourceUrl,
        };
      } catch (error: any) {
        throw new Error(`Error fetching product by ID: ${error.message}`);
      }
    },
    searchProducts: async (_, { brand, name }, { db }) => {
      try {
        const query = {};
        if (brand) {
          query['productDetails.productBrand'] = { $regex: brand, $options: 'i' };
        }
        if (name) {
          query['productDetails.productName'] = { $regex: name, $options: 'i' };
        }
        const products = await db.collection('products').find(query).toArray();
        return products.map(product => ({
          id: product._id.toString(),
          uniqueIdentifier: product.uniqueIdentifier,
          productDetails: product.productDetails,
          productSource: product.productSource,
          productSourceUrl: product.productSourceUrl,
        }));
      } catch (error: any) {
        throw new Error(`Error searching products: ${error.message}`);
      }
    },
  },
};
