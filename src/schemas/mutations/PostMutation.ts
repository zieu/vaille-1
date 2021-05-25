import { GraphQLString } from "graphql";
import { PostType } from "../TypeDefs/PostType";
import Post from "../../Post/Post";

const post = new Post();
const addPost = {
  type: PostType,
  args: {
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    image: { type: GraphQLString },
    author: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { title, body, image, author } = args;
    return await post.createPost({ title, body, image, author });
  },
};

const deletePostById = {
  type: PostType,
  args: {
    id: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    return await post.deletePost(args.id);
  },
};

export { addPost, deletePostById };
