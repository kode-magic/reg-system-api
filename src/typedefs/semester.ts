import { gql } from 'apollo-server-express';

export default gql `
  type Semester {
    id: ID
    name: String
    student: [Students]
    createdAt: Date
    updatedAt: Date
  }
  extend type Mutation {
    createSemester(name: String!): String!
  }
  extend type Query {
    listSemesters: [Semester!]
  }
`