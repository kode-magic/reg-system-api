import { validate, ValidationError } from "class-validator";
import moment = require("moment");
import { Courses, Faculty, Modules } from "../entity"
import DataNotFoundException from "../exception/DataNotFoundException";
import HttpException from "../exception/HttpException";
import { sortData } from "../utils/sort";

export default {
  Query: {
    listModules: async (_: any, __: any, { req }) => {
      try {
        const modules: Array<Modules> = await Modules.find({ relations: ['modules'] });
        sortData(modules);
        const allModules = modules.map(e => {
          return {
            id: e.id,
            code: e.code,
            name: e.name,
            description: e.description,
            creditHour: e.creditHour,
            studentModules: e.modules,
            createdAt: moment(e.createdAt).format("D MMM YYYY"),
            updatedAt: moment(e.updatedAt).format("D MMM YYYY")
          }
        })
        return allModules;
      } catch (error) {
        return error;
      }
    },
    getModule: async (_: any, { id }, { req }) => {
      try {
        const module = await Modules.findOne({ where: { id: id }, relations: ['modules'] });
        if (!module) {
          return new DataNotFoundException(id);
        }
        else {
          const dataModule = {
            id: module.id,
            code: module.code,
            name: module.name,
            description: module.description,
            creditHour: module.creditHour,
            studentModules: module.modules,
            createdAt: moment(module.createdAt).format("D MMM YYYY"),
            updatedAt: moment(module.updatedAt).format("D MMM YYYY")
          }
          return dataModule;
        }
      } catch (error) {
        return error;
      }
    }
  },
  Mutation: {
    createModule: async (_: any, { module }, { req }) => {
      const { name, description, code, creditHour } = module;
      try {
        const newModule = new Modules();
        newModule.name = name;
        newModule.description = description;
        newModule.code = code;
        newModule.creditHour = creditHour;

        const errors = await validate(newModule);
        if (errors.length > 0) {
          const message = errors
            .map((error: ValidationError) => {
              const message: any = error.constraints;
              return Object.values(message)
            })
            .join(", ");
          throw new HttpException(500, message);
        }
        else {
          await newModule.save();
          return 'Module created successfully';
        }
      } catch (error) {
        return new HttpException(500, error);
      }
    }
  }
}