export const increaseProductClick: async (_, { productId }) => {
    const product = await mongoose.model('Product').findOneAndUpdate(
      { uniqueId: productId },
      { $inc: { productClickCount: 1 } },
      { returnDocument: 'after' }
    );

    if (!product) {
      throw new Error('Product not found');
    }

    return product;
  },