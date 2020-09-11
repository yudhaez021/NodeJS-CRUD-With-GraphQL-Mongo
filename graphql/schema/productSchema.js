module.exports = `
    type Product {
        id: ID!
        productCode: String!
        productName: String!
        productImageUrl: String!
        productDescription: String!
        shortProductDescription: String
        price: Int!
        promoDescription: String
    }
    type Products {
        result: [Product!]!
    }

    input pData {
        productCode: String!
        productName: String!
        productImageUrl: String!
        productDescription: String!
        shortProductDescription: String
        price: Int!
        promoDescription: String
    }
    input pDataWithId {
        id: ID!
        productCode: String!
        productName: String!
        productImageUrl: String!
        productDescription: String!
        shortProductDescription: String
        price: Int!
        promoDescription: String
    }
`;