import mongoose, { Schema, Document } from 'mongoose';
import { IProduct, IProductDetails, IProductGender, IProductType } from '../types';

const ProductDetailsSchema: Schema = new Schema({
  productName: { type: String, required: true },
  productBrand: { type: String, required: true },
  productSizeAvailable: { type: String },
  productDiscountPrice: { type: String },
  productRetailPrice: { type: String },
  productLink: { type: String },
  productImage: { type: String },
  productGender: { type: String, enum: Object.values(IProductGender), required: true },  // Use enum for gender
  productType: { type: String, enum: Object.values(IProductType), required: true },  // Use enum for type
});

const ProductSchema: Schema = new Schema({
  uniqueId: { type: String, unique: true, required: true },  // Changed to match interface naming
  productSource: { type: String, required: true },
  productSourceUrl: { type: String, required: true },
  productDetails: { type: ProductDetailsSchema, required: true },
});

const Product = mongoose.model<IProduct & Document>('Product', ProductSchema);

export { Product, IProduct, IProductDetails };
