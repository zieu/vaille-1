import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { UserType } from "./TypeDefs/UserType";
import User from "../User/User";
import { resolveModuleName } from "typescript";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    userGetById: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        const user = new User();
        return user.findUserById(args.id);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const { username, email, password } = args;
        const user = new User();
        return await user.createUser({ username, email, password });
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
