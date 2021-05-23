import {
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList,
} from "graphql";
import { PostType } from "./PostType";
import Post from "../../Post/Post";

const post = new Post();

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    profilePic: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      async resolve(parent, args) {
        return await post.findPostsByField({ author: parent._id });
      },
    },
    followers: { type: new GraphQLList(GraphQLString) },
    following: { type: new GraphQLList(GraphQLString) },
    likedPosts: { type: new GraphQLList(GraphQLString) },
    likedComments: { type: new GraphQLList(GraphQLString) },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});
