"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphqlSchema = void 0;
const schema_1 = require("@graphql-tools/schema");
const schemas_1 = require("./schemas");
const ProductResolver_1 = require("./resolvers/ProductResolver");
exports.GraphqlSchema = (0, schema_1.makeExecutableSchema)({
    typeDefs: [schemas_1.ProductSchema],
    resolvers: [ProductResolver_1.ProductResolver],
});
