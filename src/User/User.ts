import { v4 as uuidv4 } from "uuid";
import UserModel from "../db/models/UserModel";
import UserClass, { UserData } from "./UserClass";

export default class User {
  public async createUser(userData: UserData): Promise<UserClass> {
    const user = new UserClass(userData);
    if (!user.validate) {
      throw new Error("User validition failed");
    }
    user.id = uuidv4();
    await UserModel.create(user);
    return user;
  }

  public async findUserById(userId: string): Promise<UserClass> {
    const user = await UserModel.findOne({ id: userId });

    //@ts-ignore
    return user;
  }

  public async editUser(userId: string, data: object) {
    const editedUser = await UserModel.findOneAndUpdate({ id: userId }, data, {
      new: true,
    });
    return editedUser;
  }

  public async deleteUser(userId: string): Promise<null> {
    await UserModel.findOneAndDelete({ id: userId });
    return null;
  }

  public async follow(currentUserId: string, userToFollowId: string) {
    const currentUser = await this.findUserById(currentUserId);
    const userToFollow = await this.findUserById(userToFollowId);

    // @ts-ignore
    currentUser.following?.unshift(userToFollow.id);
    // @ts-ignore
    userToFollow.followers?.unshift(currentUser.id);
  }
}
