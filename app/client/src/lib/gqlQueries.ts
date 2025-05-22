import { skip } from "node:test";
import gql from "graphql-tag";

export const CREATE_USER_MUTATION = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      id
    }
  }
`;

export const SIGN_IN_MUTATION = gql`
  mutation login($input: LoginInput!) {
    login(loginInput: $input) {
      id
      name
      avatar
      accessToken
    }
  }
`;
