import { GraphQLString } from "graphql";
import { UserType } from "../TypeDefs/UserType";
import User from "../../User/User";

const user = new User();

const userGetById = {
  type: UserType,
  args: { id: { type: GraphQLString } },
  resolve(parent: any, args: any) {
    return user.findUserById(args.id);
  },
};
const userGetByUsername = {
  type: UserType,
  args: { username: { type: GraphQLString } },
  async resolve(parent: any, args: any) {
    return await user.findUserByUsername(args.username);
  },
};

export { userGetById, userGetByUsername };
