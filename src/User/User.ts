import UserModel from "../db/models/UserModel";
import UserClass, { UserData } from "./UserClass";
import { Types } from "mongoose";

export default class User {
  public async createUser(userData: UserData): Promise<UserClass> {
    const user = new UserClass(userData);
    if (!user.validate) {
      throw new Error("User validition failed");
    }

    await UserModel.create(user);
    return user;
  }

  public async findUserById(userId: Types.ObjectId): Promise<UserClass> {
    const user = await UserModel.findById(userId);

    //@ts-ignore
    return user;
  }

  public async editUser(userId: Types.ObjectId, data: object) {
    const editedUser = await UserModel.findByIdAndUpdate(
      { _id: userId },
      data,
      {
        new: true,
      }
    );
    return editedUser;
  }

  public async deleteUser(userId: Types.ObjectId): Promise<null> {
    await UserModel.findByIdAndDelete(userId);
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
}
