import { GraphQLString, GraphQLList } from "graphql";
import { PostType } from "../TypeDefs/PostType";
import Post from "../../Post/Post";

const post = new Post();
const postGetById = {
  type: PostType,
  args: { id: { type: GraphQLString } },
  async resolve(parent: any, args: any) {
    return await post.findPostById(args.id);
  },
};

const posts = {
  type: new GraphQLList(PostType),
  async resolve() {
    return await post.allPosts();
  },
};

export { postGetById, posts };
