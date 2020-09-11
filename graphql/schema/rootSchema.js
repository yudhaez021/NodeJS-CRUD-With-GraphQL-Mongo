module.exports = `
    type RootMutation {
        createUser(input: UserData): User!
        updateUser(input: UserDataWithId): User!
        deleteUserById(id: ID!): Boolean

        createProduct(input: pData): Product!
        updateProduct(input: pDataWithId): Product!
        deleteProductById(id: ID!): Boolean

        createCategory(input: cData): Category!
        updateCategory(input: cDataWithId): Category!
        deleteCategoryById(id: ID!): Boolean
    }
    type RootQuery {
        getUsers: Users!
        getSingleUser(id: ID!): User!

        getProducts: Products!
        getProductById(id: ID!): Product!
        getProductByPcode(productCode: String!): Product!

        getCategories: Categories!
        getCategoryById(id: ID!): Category!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`;