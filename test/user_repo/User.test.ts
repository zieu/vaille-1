import mongoose from "mongoose";
import UserModel from "../../src/db/models/UserModel";
import User from "../../src/User/User";
jest.useFakeTimers();

describe("user test", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost/VAILLE_TEST", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    await mongoose.connection.db.dropCollection("users");
    console.log("TEST DB CONNECTION");
  });

  test("creates new user", async () => {
    const userData = {
      username: "John Doe",
      email: "johndoe@mail.com",
      password: "123r45",
    };

    const user = new User();
    const newUser = await user.createUser(userData);
    // @ts-ignore
    newUser.followers?.push(newUser.id);
    newUser.save();
    console.log(newUser);

    expect(newUser).toEqual(userData);
  });

  test("updates user", async () => {
    const mockUser = await UserModel.findOne();
    const user = new User();
    const updateData = {
      username: "Doe John",
    };
    const updatedUser = await user.editUser(mockUser?.id, updateData);

    expect(updatedUser?.username).toEqual(updateData.username);
  });

  test("follow user", async () => {
    const mockUser = await UserModel.findOne();
    const user = new User();
    const userData = {
      username: "Adam Smith",
      email: "adam@mail.com",
      password: "123456789",
    };
    const newUser = user.createUser(userData);

    console.log(mockUser);

    // @ts-ignore
    user.follow(mockUser?.id, newUser?.id);
    // @ts-ignore
    expect(mockUser.following[0]?.id).toEqual(newUser.id);
  });

  test("deletes user", async () => {
    const mockUser = await UserModel.findOne();
    const user = new User();
    const deleted = await user.deleteUser(mockUser?.id);

    expect(deleted).toEqual(null);
  });
});
