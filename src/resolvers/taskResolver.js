const Task = require('../models/Task');
const User = require('../models/User');
const Organization = require('../models/Organization');
const Log = require('../models/Log');

module.exports = {
    Query: {
        getTasks: async (_, { status, dueDate }, { user }) => {
            if (!user) throw new Error('Authentication required');
            let filter = { organizationId: user.organizationId };
            if (status) filter.status = status;
            if (dueDate) filter.dueDate = { $lte: new Date(dueDate) };
            return await Task.find(filter);
        },
    },
    Query: {
        getTaskStats: async (_, __, { user }) => {
            if (!user) throw new Error('Authentication required');
            return await Task.aggregate([
                { $match: { organizationId: mongoose.Types.ObjectId(user.organizationId) } },
                {
                    $group: {
                        _id: '$status',
                        count: { $sum: 1 }
                    }
                }
            ]);
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

            const changes = {};
            if (title) {
                changes.title = { from: task.title, to: title };
                task.title = title;
            }
            if (description) {
                changes.description = { from: task.description, to: description };
                task.description = description;
            }
            if (status) {
                changes.status = { from: task.status, to: status };
                task.status = status;
            }
            if (dueDate) {
                changes.dueDate = { from: task.dueDate, to: dueDate };
                task.dueDate = dueDate;
            }

            await task.save();

            const log = new Log({
                taskId: id,
                userId: user.id,
                changes: changes
            });
            await log.save();

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
