import mongoose, { Schema, Document } from 'mongoose';
import { IProductDetailsDocument } from '../types';
import { ProductDetailsSchema } from './ProductModel';

interface ITopSellersProductDocument extends Document {
  productDetails: IProductDetailsDocument;
  numberOfClickCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const TopSellersProductSchema: Schema<ITopSellersProductDocument> = new Schema({
  productDetails: { type: ProductDetailsSchema, required: true },
  numberOfClickCount: { type: Number, required: true, default: 0 },
}, { timestamps: true });

TopSellersProductSchema.pre<ITopSellersProductDocument>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const TopSellersProduct = mongoose.model<ITopSellersProductDocument>('TopSellersProduct', TopSellersProductSchema);

export { TopSellersProduct, ITopSellersProductDocument };
