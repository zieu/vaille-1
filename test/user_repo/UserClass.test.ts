import User from "../../src/User/UserClass";
jest.useFakeTimers();

describe("Test User", () => {
  test("construct valid user", () => {
    const userData = {
      username: "John Doe",
      email: "johndoe@mail.com",
      password: "1235",
    };

    const user = new User(userData);
    expect(user.validate()).toBeTruthy();
    expect(user.username).toEqual(userData.username);
  });
});
