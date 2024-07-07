const User = require('../models/User');
const Organization = require('../models/Organization');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  Query: {
    getUsers: async (_, __, { user }) => {
      if (!user) throw new Error('Authentication required');
      return await User.find({ organizationId: user.organizationId });
    },
  },
  Mutation: {
    createUser: async (_, { username, password, role, organizationId }) => {
      const user = new User({ username, password, role, organizationId });
      await user.save();
      return user;
    },
  },
  User: {
    organization: async (user) => await Organization.findById(user.organizationId),
  },
};
