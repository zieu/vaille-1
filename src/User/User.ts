import UserModel from "../db/models/UserModel";
import UserClass, { UserData } from "./UserClass";

export default class User {
  public async createUser(userData: UserData): Promise<UserClass> {
    const user = new UserClass(userData);
    if (!user.validate) {
      throw new Error("User validition failed");
    }
    await UserModel.create(user);
    return user;
  }

  public async findUserById(id: string): Promise<UserClass> {
    const user = await UserModel.findById(id);

    //@ts-ignore
    return user;
  }

  public async editUser(id: string, data: object) {
    const editedUser = await UserModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return editedUser;
  }

  public async deleteUser(id: string): Promise<null> {
    await UserModel.findByIdAndDelete(id);
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
