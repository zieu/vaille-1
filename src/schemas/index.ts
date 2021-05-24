import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { PostType } from "./TypeDefs/PostType";
import { addUser, userDeleteById } from "./mutatoins/UserMutation";
import { addPost, deletePostById } from "./mutatoins/PostMutation";
import { userGetById, userGetByUsername } from "./queries/UserQuery";
import { postGetById, posts } from "./queries/PostQuery";
import User from "../User/User";
import Post from "../Post/Post";

const user = new User();
const post = new Post();

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
    // Post Mutations
    addPost,
    deletePostById,
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
