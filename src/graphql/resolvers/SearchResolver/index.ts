import { SearchHistoryModel, RecommendationModel } from '../../../models';

export const SearchResolver = {
  Query: {
    getSearchHistory: async (_, { userId }) => {
      return await SearchHistoryModel.find({ userId }).sort({ createdAt: -1 }).exec();
    },
    getRecommendations: async (_, { userId }) => {
      return await RecommendationModel.find({ userId }).sort({ createdAt: -1 }).exec();
    },
  },

  Mutation: {
    addSearchHistory: async (_, { userId, searchTerm }) => {
      const newSearch = new SearchHistoryModel({ userId, searchTerm });
      return await newSearch.save();
    },
    clearSearchHistory: async (_, { userId }) => {
      await SearchHistoryModel.deleteMany({ userId }).exec();
      return true;
    },
    generateRecommendations: async (_, { userId }) => {
      const searchHistory = await SearchHistoryModel.find({ userId }).exec();
      // Generate recommendations based on search history logic
      const recommendedProducts = []; // Populate this with actual recommendation logic
      const newRecommendation = new RecommendationModel({ userId, recommendedProducts });
      await newRecommendation.save();
      return recommendedProducts;
    }
  }
};
