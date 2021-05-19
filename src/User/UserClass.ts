import { Types } from "mongoose";
export interface UserData {
  id?: string;
  username: string;
  email: string;
  password: string;
  profilePic?: string;
  posts?: string[];
  followers?: Types.ObjectId[];
  following?: Types.ObjectId[];
  likedPosts?: Types.ObjectId[];
  likedComments?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

export default class UserClass {
  id?: string;
  _id?: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  profilePic?: string;
  posts?: string[];
  followers?: Types.ObjectId[];
  following?: Types.ObjectId[];
  likedPosts?: Types.ObjectId[];
  likedComments?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
  constructor(userData: UserData) {
    this.id = userData.id;
    this.username = userData.username;
    this.email = userData.email;
    this.password = userData.password;
    this.profilePic = userData.profilePic;
    this.posts = userData.posts;
    this.followers = userData.followers;
    this.following = userData.following;
    this.likedPosts = userData.likedPosts;
    this.likedComments = userData.likedComments;
    this.createdAt = userData.createdAt;
    this.updatedAt = userData.updatedAt;
  }

  validate(): boolean {
    const props = [
      this.id,
      this.username,
      this.email,
      this.password,
      this.profilePic,
      this.posts,
      this.followers,
      this.following,
      this.likedPosts,
      this.likedComments,
      this.createdAt,
      this.updatedAt,
    ];
    for (let prop of props) {
      if (prop === "") {
        return false;
      }
    }
    return true;
  }
}
