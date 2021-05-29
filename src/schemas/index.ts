import { GraphQLObjectType, GraphQLSchema } from "graphql";
import {
  addUser,
  userDeleteById,
  updateUser,
  followUser,
  likePost,
  unFollowUser,
  unlikePost,
} from "./mutations/UserMutation";
import { addPost, deletePostById, updatePost } from "./mutations/PostMutation";
import { userGetById, userGetByUsername } from "./queries/UserQuery";
import { postGetById, posts } from "./queries/PostQuery";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    // User Query
    userGetById,
    userGetByUsername,
    // Post Query
    postGetById,
    posts,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // User Mutations
    addUser,
    userDeleteById,
    updateUser,
    followUser,
    likePost,
    unFollowUser,
    unlikePost,
    // Post Mutations
    addPost,
    deletePostById,
    updatePost,
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
