import { GraphQLObjectType, GraphQLSchema } from "graphql";
<<<<<<< HEAD
import { addUser, userDeleteById } from "./mutations/UserMutation";
import { addPost, deletePostById } from "./mutations/PostMutation";
=======
import { addUser, userDeleteById, updateUser } from "./mutations/UserMutation";
import { addPost, deletePostById, updatePost } from "./mutations/PostMutation";
>>>>>>> api
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
