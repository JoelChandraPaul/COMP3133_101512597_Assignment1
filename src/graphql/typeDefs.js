const typeDefs = `#graphql
  scalar Upload

  type User {
    _id: ID!
    username: String!
    email: String!
    createdAt: String
    updatedAt: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Employee {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String
    designation: String!
    salary: Float!
    date_of_joining: String!
    department: String!
    employee_photo: String
    createdAt: String
    updatedAt: String
  }

  input EmployeeInput {
    first_name: String!
    last_name: String!
    email: String!
    gender: String
    designation: String!
    salary: Float!
    date_of_joining: String!
    department: String!
  }

  type Query {
    login(usernameOrEmail: String!, password: String!): AuthPayload!

    getAllEmployees: [Employee!]!
    searchEmployeeByEid(eid: ID!): Employee
    searchEmployeesByDesignationOrDepartment(keyword: String!): [Employee!]!
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User!

    addEmployee(input: EmployeeInput!, photo: Upload): Employee!
    updateEmployeeByEid(eid: ID!, input: EmployeeInput!): Employee!
    deleteEmployeeByEid(eid: ID!): Boolean!
  }
`;
module.exports = typeDefs;
