import { Document } from 'mongoose';

export interface ISearchHistory extends Document {
  userId: string;
  searchTerm: string;
  createdAt: Date;
}

export interface IRecommendedProduct {
  productId: string;
  productName: string;
  productImage: string;
  productLink: string;
}

export interface IRecommendation extends Document {
  userId: string;
  recommendedProducts: IRecommendedProduct[];
  createdAt: Date;
}
