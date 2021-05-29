import {
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList,
} from "graphql";
import { UserType } from "./UserType";

export const PostType: GraphQLObjectType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    image: { type: GraphQLString },
    comments: { type: new GraphQLList(GraphQLString) },
    likes: { type: GraphQLInt },
    author: { type: UserType },
  }),
});
