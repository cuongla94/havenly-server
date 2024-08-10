"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductResolver = void 0;
const mongodb_1 = require("mongodb");
exports.ProductResolver = {
    Query: {
        getProducts: async (_, { gender, brand, searchTerm, limit, offset }, { db }) => {
            try {
                const query = {}; // Flexible type for query
                // Filter by gender
                if (gender)
                    query['productDetails.productGender'] = gender;
                // Filter by brand with case-insensitive matching
                if (brand)
                    query['productDetails.productBrand'] = { $regex: brand, $options: 'i' };
                // Search by term in brand or name
                if (searchTerm) {
                    query.$or = [
                        { "productDetails.productBrand": { $regex: searchTerm, $options: 'i' } },
                        { "productDetails.productName": { $regex: searchTerm, $options: 'i' } },
                    ];
                }
                // Get total count before applying pagination
                const totalCount = await db.collection('products').countDocuments(query);
                // Fetch products with pagination, limiting fields returned for performance
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
                            productImage: 1,
                            productSizeAvailable: 1,
                            productRetailPrice: 1,
                            productDiscountPrice: 1
                        }
                    }
                })
                    .skip(offset || 0)
                    .limit(limit || 10) // Default limit is 10 if not provided
                    .toArray();
                // Get brand counts
                const brandCounts = await db.collection('products').aggregate([
                    { $match: query },
                    { $group: { _id: "$productDetails.productBrand", count: { $sum: 1 } } },
                    { $project: { productBrand: "$_id", count: 1, _id: 0 } }
                ]).toArray();
                // Get source counts
                const sourceCounts = await db.collection('products').aggregate([
                    { $match: query },
                    { $group: { _id: "$productSource", count: { $sum: 1 } } },
                    { $project: { productSource: "$_id", count: 1, _id: 0 } }
                ]).toArray();
                // Debugging output
                console.log("Source Counts Debug:", sourceCounts);
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
                    sourceCounts,
                };
            }
            catch (error) {
                console.error(`Error fetching products: ${error.message}`, error);
                throw new Error(`Error fetching products: ${error.message}`);
            }
        },
        getProductById: async (_, { id }, { db }) => {
            try {
                if (!mongodb_1.ObjectId.isValid(id)) {
                    throw new Error('Invalid product ID');
                }
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
                console.error(`Error fetching product by ID: ${error.message}`, error);
                throw new Error(`Error fetching product by ID: ${error.message}`);
            }
        },
        searchProducts: async (_, { searchTerm, gender, limit, offset }, { db }) => {
            try {
                const query = {
                    $and: [
                        {
                            $or: [
                                { "productDetails.productBrand": { $regex: searchTerm, $options: 'i' } },
                                { "productDetails.productName": { $regex: searchTerm, $options: 'i' } }
                            ]
                        }
                    ]
                };
                // Add gender filter if provided
                if (gender)
                    query.$and.push({ "productDetails.productGender": gender });
                // Get total count before applying pagination
                const totalCount = await db.collection('products').countDocuments(query);
                // Fetch products with pagination, limiting fields returned for performance
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
                            productImage: 1,
                            productSizeAvailable: 1,
                            productRetailPrice: 1,
                            productDiscountPrice: 1
                        }
                    }
                })
                    .skip(offset || 0)
                    .limit(limit || 10) // Default limit is 10 if not provided
                    .toArray();
                // Get brand counts
                const brandCounts = await db.collection('products').aggregate([
                    { $match: query },
                    { $group: { _id: "$productDetails.productBrand", count: { $sum: 1 } } },
                    { $project: { productBrand: "$_id", count: 1, _id: 0 } }
                ]).toArray();
                // Get source counts
                const sourceCounts = await db.collection('products').aggregate([
                    { $match: query },
                    { $group: { _id: "$productSource", count: { $sum: 1 } } },
                    { $project: { productSource: "$_id", count: 1, _id: 0 } }
                ]).toArray();
                // Debugging output
                console.log("Source Counts Debug:", sourceCounts);
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
                    sourceCounts,
                };
            }
            catch (error) {
                console.error(`Error searching products: ${error.message}`, error);
                throw new Error(`Error searching products: ${error.message}`);
            }
        },
    },
};
