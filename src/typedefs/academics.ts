import { gql } from 'apollo-server-express';

export default gql `
  extend type Mutation {
    createAcademic(academic: AcademicParams!): String!
  }
  extend type Query {
    listAcademics: [Academics!]
    getAcademic(id: String!): Academics!
  }
  type Academics {
    id: ID
    academicYear: String
    description: String
    status: String
    createdAt: Date
    updatedAt: Date
  }
  input AcademicParams {
    academicYear: String!
    description: String!
    status: String
  }
`