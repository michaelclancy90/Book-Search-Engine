const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (parent, arg, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id }).select(
          '-__v -password'
        );
        return user;
      }
    },
  },

  /*  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
  },*/

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No User Found');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect Credentials');
      }
      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, { user, email, password }) => {
      const adduser = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, adduser };
    },

    saveBook: async (parent, { book }, context) => {
      if (context.user) {
        const user = User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: { book } } },
          { new: true, runValidators: true }
        );
        return user;
      }
    },

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const userBooks = User.findOneAndUpdate(
          { _id: context.user_id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return userBooks;
      }
      throw new AuthenticationError('No Book Found');
    },
  },
};

module.exports = resolvers;
