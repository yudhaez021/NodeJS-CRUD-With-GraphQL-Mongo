module.exports = `
    type Category {
        id: ID!
        code: String!
        name: String!
        imageUrl: String
        description: String
        shortDescription: String
    }
    type Categories {
        result: [Category!]!
    }

    input cData {
        code: String!
        name: String!
        imageUrl: String
        description: String
        shortDescription: String
    }
    input cDataWithId {
        id: ID!
        code: String!
        name: String!
        imageUrl: String
        description: String
        shortDescription: String
    }
`;