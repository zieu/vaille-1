import UserModel from "../db/models/UserModel";
import UserClass, { UserData } from "./UserClass";
import Post from "../Post/Post";
import { Types } from "mongoose";

export default class User {
  public async createUser(userData: UserData): Promise<UserClass> {
    const user = new UserClass(userData);
    if (!user.validate()) {
      throw new Error("User validition failed!");
    }

    const created = await UserModel.create(user);
    user._id = created._id;
    return user;
  }

  public async findUserById(userId: Types.ObjectId): Promise<UserClass> {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new Error("User id invalid!");
    }

    const doc = new UserClass(user);
    doc._id = user._id;

    return doc;
  }

  public async editUser(userId: Types.ObjectId, data: object) {
    const editedUser = await UserModel.findByIdAndUpdate(
      { _id: userId },
      data,
      {
        new: true,
      }
    );

    if (!editedUser) {
      throw new Error("User id invalid!");
    }
    return editedUser;
  }

  public async deleteUser(userId: Types.ObjectId): Promise<null> {
    const user = await UserModel.findByIdAndDelete(userId);
    if (!user) {
      throw new Error("Invalid user id!");
    }

    return null;
  }

  public async follow(
    currentUserId: Types.ObjectId,
    userToFollowId: Types.ObjectId
  ) {
    const currentUser = await this.findUserById(currentUserId);
    const userToFollow = await this.findUserById(userToFollowId);

    if (!currentUser || !userToFollow) {
      throw new Error("Invalid id for current user or user to follow!");
    }

    if (currentUserId === userToFollowId) {
      throw new Error("Users cannot follow themselves");
    }

    await this.editUser(currentUserId, {
      following: [...currentUser?.following!, userToFollowId],
    });

    await this.editUser(userToFollowId, {
      following: [...userToFollow?.followers!, currentUserId],
    });
  }

  public async likePost(postId: Types.ObjectId, userId: Types.ObjectId) {
    const post = new Post();
    const foundPost = await post.findPostById(postId);
    const user = await this.findUserById(userId);

    if (!foundPost || !user) {
      throw new Error("Invalid credentirals!");
    }

    await this.editUser(userId, {
      likedPosts: [...user?.likedPosts!, postId],
    });

    await post.updatePost(postId, {
      likes: foundPost.likes! + 1,
    });
  }
}
