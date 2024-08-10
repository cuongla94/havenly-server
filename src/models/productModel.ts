import mongoose, { Schema, Document } from 'mongoose';
import { IProductGender, IProductType, IProductSubType, IProductCurrency, IProductPriceHistory, IProductDetailsDocument, IProductDocument } from '../types';

const PriceHistorySchema: Schema<IProductPriceHistory & Document> = new Schema({
  price: { type: String, required: true, maxlength: 50 },
  date: { type: Date, required: true, default: Date.now },
});

const ProductDetailsSchema: Schema<IProductDetailsDocument> = new Schema({
  productName: { type: String, required: true, minlength: 1, maxlength: 255 },
  productBrand: { type: String, required: true, minlength: 1, maxlength: 255 },
  productSizeAvailable: { type: String, maxlength: 100 },
  productRetailPrice: { type: String, required: true, maxlength: 50 },
  productLink: { type: String, maxlength: 2048 },
  productImage: { type: String, maxlength: 2048 },
  productGender: { type: String, enum: Object.values(IProductGender), required: true },
  productType: { type: String, enum: Object.values(IProductType), required: true },
  productSubType: { type: String, enum: Object.values(IProductSubType), maxlength: 100 },
  productSKU: { type: String, unique: true, required: true, maxlength: 100 },
  productUPC: { type: String, unique: true, required: true, maxlength: 12 },
  productStockQuantity: { type: Number, required: true, default: 0 },
  productInStock: { type: Boolean, required: true, default: true },
  productCurrency: { type: String, enum: Object.values(IProductCurrency), required: true },  
  productShippingCost: { type: String }, 
  productRetailer: { type: String, required: true }, 
  priceHistory: [PriceHistorySchema], 
});

ProductDetailsSchema.pre<IProductDetailsDocument>('save', function (next) {
  const currentPrice = this.productRetailPrice;

  if (currentPrice) {
    const lastPriceEntry = this.priceHistory[this.priceHistory.length - 1];

    if (!lastPriceEntry || lastPriceEntry.price !== currentPrice) {
      this.priceHistory.push({ price: currentPrice, date: new Date() });
    }
  }

  this.productInStock = this.productStockQuantity > 0;
  next();
});

const ProductSchema: Schema<IProductDocument> = new Schema({
  uniqueId: { type: String, unique: true, required: true, minlength: 1, maxlength: 100 },
  productSourceUrl: { type: String, required: true, maxlength: 2048 },
  productDetails: { type: ProductDetailsSchema, required: true },
}, { timestamps: true });

const Product = mongoose.model<IProductDocument>('Product', ProductSchema);

export { Product, IProductDetailsDocument, IProductDocument };
