import mongoose from "mongoose";
import { UserData } from "../../src/User/UserClass";
import { v4 as uuidv4 } from "uuid";
import UserModel from "../../src/db/models/UserModel";
import User from "../../src/User/User";
jest.useFakeTimers();

describe("user test", () => {
  let user: User;
  let userData: UserData;
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost/VAILLE_TEST", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    await mongoose.connection.db.dropCollection("users");
    console.log("TEST DB CONNECTION");
    userData = {
      id: uuidv4(),
      username: "John Doe",
      email: "johndoe@mail.com",
      password: "123r45",
      profilePic: "profilePic",
      posts: [],
      followers: [],
      following: [],
      likedPosts: [],
      likedComments: [],
    };
    user = new User();
  });

  test("creates new user", async () => {
    const newUser = await user.createUser(userData);

    expect(newUser.username).toEqual(userData.username);
    expect(newUser.email).toEqual(userData.email);
    expect(newUser.password).toEqual(userData.password);
  });

  test("finds user by id", async () => {
    const mockUser = await UserModel.findOne();
    const user = new User();

    const found = await user.findUserById(mockUser?.id!);
    expect(found).toEqual(mockUser);
  });

  test("updates user", async () => {
    const mockUser = await UserModel.findOne();
    const user = new User();
    const updateData = {
      username: "Doe John",
    };

    const updatedUser = await user.editUser(mockUser?.id!, updateData);

    expect(updatedUser?.username).toEqual(updateData.username);
  });

  test("deletes user", async () => {
    const mockUser = await UserModel.find();
    const user = new User();
    const deleted = await user.deleteUser(mockUser[1]?.id!);

    expect(deleted).toEqual(null);
  });
});
