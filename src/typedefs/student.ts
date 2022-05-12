import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    listStudents: [Students!]
    getStudent(id: String!): Students
  }

  extend type Mutation {
    createStudent(student: StudentParams!): String!
    updateStudent(id: String!, student: StudentParams!): String!
  }

  type Students {
    id: ID
    givenNames: String
    familyName: String
    gender: String
    studentId: String
    phone: String
    email: String
    nationality: String
    birthCountry: String
    age: String
    birthDate: Date
    birthPlace: String
    religion: String
    address: String
    civilStatus: String
    semester: String
    course: String
    faculty: String
    studentType: String
    admissionDate: Date
    createdAt: Date
    updatedAt: Date
  }

  type ConvertedModules {
    module: String
  }

  input StudentParams {
    givenNames: String!
    familyName: String!
    gender: String!
    studentId: String!
    phone: String!
    email: String!
    nationality: String!
    birthCountry: String!
    birthDate: String!
    birthPlace: String!
    religion: String!
    address: String!
    civilStatus: String!
    semester: String!
    course: String!
    studentType: String!
    admissionDate: String!
  }
`