const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Organization {
    id: ID!
    name: String!
  }

  type User {
    id: ID!
    username: String!
    role: String!
    organization: Organization!
  }

  type Task {
    id: ID!
    title: String!
    description: String
    status: String!
    dueDate: String
    user: User!
    organization: Organization!
  }

  type Query {
    getOrganizations: [Organization]
    getUsers: [User]
    getTasks(status: String, dueDate: String): [Task]
  }

  type Mutation {
    createOrganization(name: String!): Organization
    createUser(username: String!, password: String!, role: String!, organizationId: ID!): User
    createTask(title: String!, description: String, status: String!, dueDate: String, userId: ID!, organizationId: ID!): Task
    updateTask(id: ID!, title: String, description: String, status: String, dueDate: String): Task
    deleteTask(id: ID!): String
  }

  type TaskStats {
    status: String
    count: Int
}

type Query {
    getOrganizations: [Organization]
    getUsers: [User]
    getTasks(status: String, dueDate: String): [Task]
    getTaskStats: [TaskStats]
}

`;

module.exports = typeDefs;
