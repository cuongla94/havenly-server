"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductResolver = void 0;
const mongodb_1 = require("mongodb");
exports.ProductResolver = {
    Query: {
        getProducts: async (_, { gender, brand, searchTerm, limit = 10, offset = 0 }, { db }) => {
            try {
                const query = {}; // Flexible type for query
                if (gender)
                    query['productDetails.productGender'] = gender;
                if (brand)
                    query['productDetails.productBrand'] = { $regex: brand, $options: 'i' };
                if (searchTerm) {
                    query.$or = [
                        { "productDetails.productBrand": { $regex: searchTerm, $options: 'i' } },
                        { "productDetails.productName": { $regex: searchTerm, $options: 'i' } }
                    ];
                }
                const totalCount = await db.collection('products').countDocuments(query);
                const products = await db.collection('products').find(query).skip(offset).limit(limit).toArray();
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
                    brandCounts
                };
            }
            catch (error) {
                throw new Error(`Error fetching products: ${error.message}`);
            }
        },
        getProductById: async (_, { id }, { db }) => {
            try {
                const product = await db.collection('products').findOne({ _id: new mongodb_1.ObjectId(id) });
                if (!product)
                    throw new Error('Product not found');
                return {
                    id: product._id.toString(),
                    uniqueId: product.uniqueId,
                    productSource: product.productSource,
                    productSourceUrl: product.productSourceUrl,
                    productDetails: product.productDetails,
                };
            }
            catch (error) {
                throw new Error(`Error fetching product by ID: ${error.message}`);
            }
        },
        searchProducts: async (_, { searchTerm, gender, limit = 10, offset = 0 }, { db }) => {
            try {
                const query = {
                    $or: [
                        { "productDetails.productBrand": { $regex: searchTerm, $options: 'i' } },
                        { "productDetails.productName": { $regex: searchTerm, $options: 'i' } }
                    ]
                };
                if (gender)
                    query['productDetails.productGender'] = gender;
                const totalCount = await db.collection('products').countDocuments(query);
                const products = await db.collection('products').find(query).skip(offset).limit(limit).toArray();
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
                    brandCounts
                };
            }
            catch (error) {
                throw new Error(`Error searching products: ${error.message}`);
            }
        }
    }
};
