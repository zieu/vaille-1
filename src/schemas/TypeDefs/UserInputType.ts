import { GraphQLInputObjectType, GraphQLString } from "graphql";

export const UserInputType = new GraphQLInputObjectType({
  name: "UserInputType",
  fields: () => ({
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    profilePic: { type: GraphQLString },
  }),
});
