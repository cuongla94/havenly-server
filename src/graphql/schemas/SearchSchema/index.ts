import { gql } from 'apollo-server-express';

export const SearchSchema = gql`
  type Query {
    getSearchHistory(userId: String!): [SearchHistory]
    getRecommendations(userId: String!): [Recommendation]
  }

  type Mutation {
    addSearchHistory(userId: String!, searchTerm: String!): SearchHistory
    clearSearchHistory(userId: String!): Boolean
    generateRecommendations(userId: String!): [Recommendation]
  }

  type SearchHistory {
    id: ID!
    userId: String!
    searchTerm: String!
    createdAt: String!
  }

  type Recommendation {
    id: ID!
    userId: String!
    recommendedProducts: [String]
    createdAt: String!
  }
`;
