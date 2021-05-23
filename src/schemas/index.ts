import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { UserType } from "./TypeDefs/UserType";
import { PostType } from "./TypeDefs/PostType";
import User from "../User/User";
import Post from "../Post/Post";
import { resolveModuleName } from "typescript";

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
    addUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const { username, email, password } = args;
        return await user.createUser({ username, email, password });
      },
    },

    // Post Mutations
    addPost: {
      type: PostType,
      args: {
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        image: { type: GraphQLString },
        author: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const { title, body, image, author } = args;
        return await post.createPost({ title, body, image, author });
      },
    },

    deletePostById: {
      type: PostType,
      args: {
        id: { type: GraphQLString },
      },
      async resolve(parent, args) {
        return await post.deletePost(args.id);
      },
    },
  },
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
