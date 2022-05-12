import { compare, hash } from "bcryptjs";
import { validate, ValidationError } from "class-validator";
import { sign } from "jsonwebtoken";
import { SECRET } from "../config";
import { User } from "../entity";
import { HttpException } from "../exception";

export default {
  Query: {
    listUsers: async (_: any, __: any, { req }) => {
      try {
        const users = await User.find({ order: { createdAt: 'DESC' } });
        return users;
      } catch (error) {
        throw error;
      }
    }
  },

  Mutation: {
    createUser: async (_: any, { params }, { req }) => {
      try {
        const newUser = new User();
        newUser.name = params.name;
        newUser.phone = params.phone;
        newUser.email = params.email;
        newUser.username = params.username;
        newUser.role = params.role;
        newUser.password = await hash(params.password, 10);

        const errors = await validate(newUser);

        if (errors.length > 0) {
          const message = errors
            .map((error: ValidationError) => {
              const message: any = error.constraints;
              return Object.values(message)
            })
            .join(", ");
          return new HttpException(400, message);
        }
        else {
          try {
            const saveUser = await newUser.save();
            if (saveUser) {
              return 'User added successfully';
            }

          } catch (error) {
            throw new HttpException(500, error.detail);
          }
        }
      } catch (error) {
        throw error;
      }
    },

    login: async (_: any, { username, password }, { req }) => {
      try {
        const user = await User.findOne({ where: [
          {
            username: username
          },
          {
            email: username
          }
        ] });

        if (!user) {
          throw new HttpException(404, 'Invalid! user not found');
        }
        else {
          const comparePasswords = await compare(password, user.password);
          if (!comparePasswords) {
            throw new HttpException(400, 'Your password is incorrect');
          }
          else {
            const payload = {
              name: user.name,
              phone: user.phone,
              email: user.email,
              username: user.username,
              role: user.role,
            }
            const token = sign(payload, SECRET, {
              expiresIn: '5h'
            });

            return {
              token: `Bearer ${token}`,
              payload
            }
          }
        }
      } catch (error) {
        throw error;
      }
    }
  }
}