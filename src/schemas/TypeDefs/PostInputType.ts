import { GraphQLInputObjectType, GraphQLString } from "graphql";

export const PostInputType = new GraphQLInputObjectType({
  name: "PostInputType",
  fields: () => ({
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    image: { type: GraphQLString },
  }),
});
