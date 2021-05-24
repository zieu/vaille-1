import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { UserType } from "./TypeDefs/UserType";
import { PostType } from "./TypeDefs/PostType";
import { addUser, userDeleteById } from "./mutatoins/UserMutation";
import { addPost, deletePostById } from "./mutatoins/PostMutation";
import User from "../User/User";
import Post from "../Post/Post";

const user = new User();
const post = new Post();

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    // User Query
    userGetById: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return user.findUserById(args.id);
      },
    },
    userGetByUsername: {
      type: UserType,
      args: { username: { type: GraphQLString } },
      async resolve(parent, args) {
        return await user.findUserByUsername(args.username);
      },
    },

    // Post Query
    postGetById: {
      type: PostType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        return await post.findPostById(args.id);
      },
    },

    posts: {
      type: new GraphQLList(PostType),
      async resolve(parent, args) {
        return await post.allPosts();
      },
    },
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
