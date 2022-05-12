import { gql } from "apollo-server-express";

export default gql `
  type Faculty {
    id: ID
    name: String
    description: String
    totalCourses: Int
    totalStudents: Int
    courses: [Courses]
    createdAt: Date
    updatedAt: Date
  }
  input FacultyParams {
    name: String!
    description: String!
  }
  extend type Mutation {
    createFaculty(faculty: FacultyParams!): String!
    updateFaculty(id: String!, name: String!, description: String!): String!
  }
  extend type Query {
    listFaculties: [Faculty!]
    getFaculty(id: String!): Faculty!
  }
`