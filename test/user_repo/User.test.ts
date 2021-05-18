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

    expect(newUser).toEqual(userData);
  });

  test("finds user by id", async () => {
    const mockUser = await UserModel.findOne();
    const user = new User();

    const found = await user.findUserById(mockUser?.id);
    expect(found).toEqual(mockUser);
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

  test("deletes user", async () => {
    const mockUser = await UserModel.find();
    const user = new User();
    const deleted = await user.deleteUser(mockUser[1]?.id);

    expect(deleted).toEqual(null);
  });
});
