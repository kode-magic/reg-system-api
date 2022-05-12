import { gql } from "apollo-server-express";
export default gql `
  type StudentModules {
    id: ID
    student: Students
    module: Modules
    semester: Semester
    continuousAssessment: Float
    examsGrade: Float
  }
  extend type Query {
    listStudentModules(student: String!, academicYear: String): [StudentModules]
  }
  extend type Mutation {
    addStudentModule(mod: ModParams!): String!
    addStudentGrade(grade: ModParams!): String!
  }
  input ModParams {
    student: String
    module: String
    semester: String
    continuousAssessment: Float
    examsGrade: Float
  }
`