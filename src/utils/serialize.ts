import { pick } from "lodash";

export const serializeUser = (user: any) => pick(user, [
  'id',
  'email',
  'username',
  "givenNames",
  "role"
]);