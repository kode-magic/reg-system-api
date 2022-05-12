import { gql } from "apollo-server-express";

export default gql `
  extend type Query {
    listModules: [Modules!]
    getModule(id: String!): Modules
  }
  extend type Mutation {
    createModule(module: ModuleParams!): String!
    updateModule(id: String!, code: String!, name: String!, description: String): String!
  }
  type Modules {
    id: ID
    code: String
    name: String
    description: String
    creditHour: Float
    studentModules: [StudentModules]
    createdAt: Date
    updatedAt: Date
  }
  input ModuleParams {
    code: String!
    name: String!
    description: String!
    creditHour: Float!
  }
`