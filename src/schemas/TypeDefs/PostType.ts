import {
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList,
} from "graphql";

export const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    image: { type: GraphQLString },
    commnets: { type: new GraphQLList(GraphQLString) },
    likes: { type: GraphQLInt },
    author: { type: GraphQLString },
  }),
});
