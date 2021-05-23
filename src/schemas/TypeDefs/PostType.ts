import {
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList,
} from "graphql";
import { UserType } from "./UserType";
import User from "../../User/User";

export const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    image: { type: GraphQLString },
    commnets: { type: new GraphQLList(GraphQLString) },
    likes: { type: GraphQLInt },
    author: {
      type: UserType,
      async resolve(parent, args) {
        const user = new User();
        return await user.findUserById(parent.author);
      },
    },
  }),
});
