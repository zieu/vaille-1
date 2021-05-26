import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from "graphql";

export const PostInputType = new GraphQLInputObjectType({
  name: "PostInputType",
  fields: () => ({
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    image: { type: GraphQLString },
    commnets: { type: new GraphQLList(GraphQLString) },
    likes: { type: GraphQLInt },
  }),
});
