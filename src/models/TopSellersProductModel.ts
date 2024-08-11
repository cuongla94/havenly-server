import mongoose, { Schema, Document } from 'mongoose';
import { IProductDetailsDocument } from '../types';
import { ProductDetailsSchema } from './ProductModel';

export interface ITopSellersProducts extends Document {
  productDetails: IProductDetailsDocument;
  numberOfClickCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const TopSellersProductsSchema: Schema<ITopSellersProducts> = new Schema({
  productDetails: { type: ProductDetailsSchema, required: true },
  numberOfClickCount: { type: Number, required: true, default: 0 },
}, { timestamps: true });

TopSellersProductsSchema.pre<ITopSellersProducts>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const TopSellersProducts = mongoose.model<ITopSellersProducts>('TopSellersProducts', TopSellersProductsSchema);

export { TopSellersProducts, ITopSellersProducts };
