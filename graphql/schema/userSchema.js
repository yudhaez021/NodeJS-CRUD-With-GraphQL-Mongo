module.exports = `
    type User {
        id: ID!
        name: String!
        fullname: String!
        age: Int!
        address: String!
    }
    type Users {
        result: [User!]!
    }

    input UserData {
        name: String!
        fullname: String!
        age: Int!
        address: String!
    }
    input UserDataWithId {
        id: ID!
        name: String
        fullname: String
        age: Int
        address: String
    }
`;