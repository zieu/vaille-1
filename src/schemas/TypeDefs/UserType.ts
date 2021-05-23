import {
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList,
} from "graphql";
import { PostType } from "./PostType";

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    profilePic: { type: GraphQLString },
    posts: { type: new GraphQLList(PostType) },
    followers: { type: new GraphQLList(UserType) },
    following: { type: new GraphQLList(UserType) },
    likedPosts: { type: new GraphQLList(GraphQLString) },
    likedComments: { type: new GraphQLList(GraphQLString) },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});
