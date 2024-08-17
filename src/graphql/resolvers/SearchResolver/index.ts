import { SearchHistoryModel, RecommendationModel } from '../../../models';
import Logger from '../../../loaders/logger';

export const SearchResolver = {
  Query: {
    getSearchHistory: async (_, { userId }) => {
      try {
        return await SearchHistoryModel.find({ userId }).sort({ createdAt: -1 }).exec();
      } catch (error: any) {
        Logger.error(`Error fetching search history for user ${userId}:`, error.message);
        throw new Error('Failed to fetch search history');
      }
    },
    getRecommendations: async (_, { userId }) => {
      try {
        return await RecommendationModel.find({ userId }).sort({ createdAt: -1 }).exec();
      } catch (error: any) {
        Logger.error(`Error fetching recommendations for user ${userId}:`, error.message);
        throw new Error('Failed to fetch recommendations');
      }
    },
  },

  Mutation: {
    addSearchHistory: async (_, { userId, searchTerm }) => {
      try {
        const newSearch = new SearchHistoryModel({ userId, searchTerm });
        return await newSearch.save();
      } catch (error: any) {
        Logger.error(`Error adding search history for user ${userId}:`, error.message);
        throw new Error('Failed to add search history');
      }
    },
    clearSearchHistory: async (_, { userId }) => {
      try {
        await SearchHistoryModel.deleteMany({ userId }).exec();
        return true;
      } catch (error: any) {
        Logger.error(`Error clearing search history for user ${userId}:`, error.message);
        throw new Error('Failed to clear search history');
      }
    },
    generateRecommendations: async (_, { userId }) => {
      try {
        const searchHistory = await SearchHistoryModel.find({ userId }).exec();
        const recommendedProducts = [];
        const newRecommendation = new RecommendationModel({ userId, recommendedProducts });
        await newRecommendation.save();
        return recommendedProducts;
      } catch (error: any) {
        Logger.error(`Error generating recommendations for user ${userId}:`, error.message);
        throw new Error('Failed to generate recommendations');
      }
    }
  }
};
