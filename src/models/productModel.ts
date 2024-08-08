import mongoose, { Document, Schema } from 'mongoose';

interface IProductDetails extends Document {
  productName: string;
  productBrand: string;
  productSizeAvailable: string;
  productDiscountPrice: string;
  productRetailPrice: string;
  productLink: string;
  productImage: string;
  productGender: string;
}

interface IProduct extends Document {
  uniqueIdentifier: string;
  productSource: string;
  productSourceUrl: string;
  productDetails: IProductDetails;
}

const ProductDetailsSchema: Schema = new Schema({
  productName: { type: String, required: true },
  productBrand: { type: String, required: true },
  productSizeAvailable: { type: String },
  productDiscountPrice: { type: String },
  productRetailPrice: { type: String },
  productLink: { type: String },
  productImage: { type: String },
  productGender: { type: String },
});

const ProductSchema: Schema = new Schema({
  uniqueIdentifier: { type: String, unique: true, required: true },
  productSource: { type: String, required: true },
  productSourceUrl: { type: String, required: true },
  productDetails: { type: ProductDetailsSchema, required: true },
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);

export { Product, IProduct, IProductDetails}
