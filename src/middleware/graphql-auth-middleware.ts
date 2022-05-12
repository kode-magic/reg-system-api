import { SECRET } from '../config';

// import { Users } from '../models';

import { verify } from 'jsonwebtoken';

const GraphQLAuthMiddleware = async (req: any, res: any, next: any) => {
  // Extract Authorization Header
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  // Extract the token and check for token
  const token = authHeader.split(" ")[1];

  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }

  // Verify the extracted token
  let decodedToken: any;
  
  try {
    decodedToken = verify(token, SECRET);
  } catch (err) {
    req.isAuth = false;
    return next();
  }

  // If decoded token is null then set authentication of the request false
  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  // If the user has valid token then Find the user by decoded token's id
  // let authUser = await Users.findOne({ _id: decodedToken._id });
  // if (!authUser) {
  //   req.isAuth = false;
  //   return next();
  // }

  req.isAuth = true;
  // req.user = authUser;
  return next();
}

export default GraphQLAuthMiddleware;