import { GraphQLString } from "graphql";
import { UserType } from "../TypeDefs/UserType";
import { UserInputType } from "../TypeDefs/UserInputType";
import User from "../../User/User";

const user = new User();
const addUser = {
  type: UserType,
  args: {
    data: { type: UserInputType },
  },
  async resolve(parent: any, args: any) {
    return await user.createUser(args.data);
  },
};

const userDeleteById = {
  type: UserType,
  args: { id: { type: GraphQLString } },
  async resolve(parent: any, args: any) {
    return await user.deleteUser(args.id);
  },
};

const updateUser = {
  type: UserType,
  args: {
    id: { type: GraphQLString },
    data: { type: UserInputType },
  },
  async resolve(parent: any, args: any) {
    return await user.editUser(args.id, args.data);
  },
};

const followUser = {
  type: UserType,
  args: {
    currentUserId: { type: GraphQLString },
    userToFollowId: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    return await user.follow(args.currentUserId, args.userToFollowId);
  },
};

const likePost = {
  type: UserType,
  args: {
    postId: { type: GraphQLString },
    userId: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    return await user.likePost(args.postId, args.userId);
  },
};

const unFollowUser = {
  type: UserType,
  args: {
    currentUserId: { type: GraphQLString },
    userToUnFollowId: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    return await user.unFollow(args.currentUserId, args.userToUnFollowId);
  },
};

const unlikePost = {
  // TODO needs to be tested
  type: UserType,
  args: {
    userId: { type: GraphQLString },
    postId: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    return await user.unlike(args.userId, args.postId);
  },
};

export {
  addUser,
  userDeleteById,
  updateUser,
  followUser,
  likePost,
  unFollowUser,
  unlikePost,
};
