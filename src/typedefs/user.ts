import { gql } from "apollo-server-express";

export default gql `
  type User {
    id: ID
    name: String
    phone: String
    email: String
    username: String
    role: String
    createdAt: Date
    updatedAt: Date
  }

  type OnSign {
    token: String
    payload: User
  }

  input UserParams {
    name: String!
    phone: String!
    email: String!
    username: String!
    role: String!
    password: String!
  }

  extend type Mutation {
    createUser(params: UserParams): String!
    login(username: String!, password: String!): OnSign!
  }

  extend type Query {
    listUsers: [User]
  }
`