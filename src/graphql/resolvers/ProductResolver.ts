import { Document } from 'mongodb';

export const ProductResolver = {
  Query: {
    getProducts: async (_, { gender, brand, productType, searchTerm, limit, offset }, { db }) => {
      const query: Document = { $and: [] };

      if (productType) {
        query.$and.push({ "productDetails.productType": productType });
      }

      if (gender && gender !== "All") {
        query.$and.push({ "productDetails.productGender": gender });
      }

      if (brand) {
        query.$and.push({ "productDetails.productBrand": { $regex: brand, $options: 'i' } });
      }

      if (searchTerm) {
        query.$and.push({
          $or: [
            { "productDetails.productBrand": { $regex: searchTerm, $options: 'i' } },
            { "productDetails.productName": { $regex: searchTerm, $options: 'i' } },
            { "productDetails.productGender": { $regex: searchTerm, $options: 'i' } }
          ]
        });
      }

      if (query.$and.length === 0) {
        delete query.$and;
      }

      const totalCount = await db.collection('products').countDocuments(query);
      const products = await db.collection('products')
        .find(query, {
          projection: {
            _id: 1,
            uniqueId: 1,
            productSource: 1,
            productSourceUrl: 1,
            productDetails: {
              productName: 1,
              productBrand: 1,
              productGender: 1,
              productType: 1,
              productImage: 1,
              productSizeAvailable: 1,
              productRetailPrice: 1,
              productDiscountPrice: 1
            }
          }
        })
        .skip(offset || 0)
        .limit(limit || 10)
        .toArray();

      const brandCounts = await db.collection('products').aggregate([
        { $match: query },
        { $group: { _id: "$productDetails.productBrand", count: { $sum: 1 } } },
        { $project: { productBrand: "$_id", count: 1, _id: 0 } }
      ]).toArray();

      return {
        products: products.map(product => ({
          id: product._id.toString(),
          uniqueId: product.uniqueId,
          productSource: product.productSource,
          productSourceUrl: product.productSourceUrl,
          productDetails: product.productDetails,
        })),
        totalCount,
        brandCounts,
      };
    },

    searchProducts: async (_, { searchTerm, productType, gender, limit, offset }, { db }) => {
      const query: Document = { $and: [] };

      if (productType) {
        query.$and.push({ "productDetails.productType": productType });
      }

      if (gender && gender !== "All") {
        query.$and.push({ "productDetails.productGender": gender });
      }

      if (searchTerm) {
        query.$and.push({
          $or: [
            { "productDetails.productBrand": { $regex: searchTerm, $options: 'i' } },
            { "productDetails.productName": { $regex: searchTerm, $options: 'i' } },
            { "productDetails.productGender": { $regex: searchTerm, $options: 'i' } }
          ]
        });
      }

      if (query.$and.length === 0) {
        delete query.$and;
      }

      const totalCount = await db.collection('products').countDocuments(query);
      const products = await db.collection('products')
        .find(query, {
          projection: {
            _id: 1,
            uniqueId: 1,
            productSource: 1,
            productSourceUrl: 1,
            productDetails: {
              productName: 1,
              productBrand: 1,
              productGender: 1,
              productType: 1,
              productImage: 1,
              productSizeAvailable: 1,
              productRetailPrice: 1,
              productDiscountPrice: 1
            }
          }
        })
        .skip(offset || 0)
        .limit(limit || 10)
        .toArray();

      const brandCounts = await db.collection('products').aggregate([
        { $match: query },
        { $group: { _id: "$productDetails.productBrand", count: { $sum: 1 } } },
        { $project: { productBrand: "$_id", count: 1, _id: 0 } }
      ]).toArray();

      return {
        products: products.map(product => ({
          id: product._id.toString(),
          uniqueId: product.uniqueId,
          productSource: product.productSource,
          productSourceUrl: product.productSourceUrl,
          productDetails: product.productDetails,
        })),
        totalCount,
        brandCounts,
      };
    },

    getSourceCounts: async (_, __, { db }) => {
      try {
        const sourceCounts = await db.collection('products').aggregate([
          { $group: { _id: "$productSource", count: { $sum: 1 } } },
          { $project: { productSource: "$_id", count: 1, _id: 0 } }
        ]).toArray();

        return sourceCounts;
      } catch (error: any) {
        console.error(`Error fetching source counts: ${error.message}`, error);
        throw new Error(`Error fetching source counts: ${error.message}`);
      }
    }
  }
};
