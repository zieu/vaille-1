import {
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList,
} from "graphql";

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    profilePic: { type: GraphQLString },
    posts: { type: new GraphQLList(GraphQLString) },
    followers: { type: new GraphQLList(GraphQLString) },
    likedPosts: { type: new GraphQLList(GraphQLString) },
    likedComments: { type: new GraphQLList(GraphQLString) },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});
