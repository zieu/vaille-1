import { GraphQLString } from "graphql";
import { UserType } from "../TypeDefs/UserType";
import User from "../../User/User";

const user = new User();
const addUser = {
  type: UserType,
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { username, email, password } = args;
    console.log(args);
    console.log(typeof args);
    return await user.createUser({ username, email, password });
  },
};

const userDeleteById = {
  type: UserType,
  args: { id: { type: GraphQLString } },
  async resolve(parent: any, args: any) {
    return await user.deleteUser(args.id);
  },
};

export { addUser, userDeleteById };
