import mongoose, { Schema } from 'mongoose';
import { ISearchHistory, IRecommendation } from '../types';  

const SearchHistorySchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  searchTerm: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const RecommendationSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  recommendedProducts: [
    {
      productId: String,
      productName: String,
      productImage: String,
      productLink: String,
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SearchHistoryModel = mongoose.model<ISearchHistory>('SearchHistory', SearchHistorySchema);
const RecommendationModel = mongoose.model<IRecommendation>('Recommendation', RecommendationSchema);

export { SearchHistoryModel, RecommendationModel }