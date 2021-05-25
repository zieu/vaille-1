import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { addUser, userDeleteById } from "./mutations/UserMutation";
import { addPost, deletePostById } from "./mutations/PostMutation";
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
    // Post Mutations
    addPost,
    deletePostById,
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
