const { buildSchema } = require('graphql');

const user = require('./schema/userSchema');
const product = require('./schema/productSchema');
const category = require('./schema/categorySchema');
const root = require('./schema/rootSchema');

const result = user+product+category+root;
module.exports = buildSchema(result);