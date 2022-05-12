import { gql } from "apollo-server-express";

export default gql`
  scalar Date
  directive @isAuth on FIELD_DEFINITION
        
  type Query {
      _:String
  }
  type Mutation{
      _:String
  }
  type Subscription {
      _:String
  }
`