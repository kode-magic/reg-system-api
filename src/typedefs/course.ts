import { gql } from "apollo-server-express";

export default gql `
  extend type Query {
    listCourses: [Courses!]
    getCourse(id: String!): Courses!
    getFacultyCourses(id: String!): Courses!
    listFacultyCourses(faculty: String!): [Courses!]
  }
  extend type Mutation {
    createCourse(course: CourseParams!): String!
    updateCourse(id: String!, name: String!, description: String!, faculty: String!): String!
  }
  type Courses {
    id: ID
    name: String
    description: String
    faculty: String
    totalStudents: Int
    students: [Students]
    createdAt: Date
    updatedAt: Date
  }
  input CourseParams {
    name: String!
    description: String!
    faculty: String!
  }
`