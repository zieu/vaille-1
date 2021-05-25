import { Schema, Document, model, SchemaTypes, Types } from "mongoose";

interface IUser extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      requried: true,
    },
    profilePic: {
      type: String,
      default: null,
    },
    posts: [
      {
        type: SchemaTypes.ObjectId,
        ref: "Post",
      },
    ],
    followers: [
      {
        type: SchemaTypes.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: SchemaTypes.ObjectId,
        ref: "User",
      },
    ],
    likedPosts: [],
    likedComments: [],
  },
  { timestamps: true }
);

export default model<IUser>("User", UserSchema);
