import { GraphQLString } from "graphql";
import { UserType } from "../TypeDefs/UserType";
import { UserInputType } from "../TypeDefs/UserInputType";
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

const updateUser = {
  type: UserType,
  args: {
    id: { type: GraphQLString },
    data: { type: UserInputType },
  },
  async resolve(parent: any, args: any) {
    return await user.editUser(args.id, args.data);
  },
};

export { addUser, userDeleteById, updateUser };
