const Task = require('../models/Task');
const User = require('../models/User');
const Organization = require('../models/Organization');

module.exports = {
  Query: {
    getTasks: async (_, __, { user }) => {
      if (!user) throw new Error('Authentication required');
      return await Task.find({ organizationId: user.organizationId });
    },
  },
  Mutation: {
    createTask: async (_, { title, description, status, dueDate, userId, organizationId }, { user }) => {
      if (!user) throw new Error('Authentication required');
      const task = new Task({ title, description, status, dueDate, userId, organizationId });
      await task.save();
      return task;
    },
    updateTask: async (_, { id, title, description, status, dueDate }, { user }) => {
      if (!user) throw new Error('Authentication required');
      const task = await Task.findById(id);
      if (!task) throw new Error('Task not found');
      if (title) task.title = title;
      if (description) task.description = description;
      if (status) task.status = status;
      if (dueDate) task.dueDate = dueDate;
      await task.save();
      return task;
    },
    deleteTask: async (_, { id }, { user }) => {
      if (!user) throw new Error('Authentication required');
      const task = await Task.findById(id);
      if (!task) throw new Error('Task not found');
      await task.remove();
      return 'Task deleted';
    },
  },
  Task: {
    user: async (task) => await User.findById(task.userId),
    organization: async (task) => await Organization.findById(task.organizationId),
  },
};
