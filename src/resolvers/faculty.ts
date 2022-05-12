import { validate, ValidationError } from "class-validator";
import moment = require("moment");
import { Faculty } from "../entity"
import DataNotFoundException from "../exception/DataNotFoundException";
import HttpException from "../exception/HttpException";
import { sortData } from "../utils/sort";

export default {
  Query: {
    listFaculties: async (_: any, __: any, { req }) => {
      try {
        const faculties: Array<Faculty> = await Faculty.find({ relations: ['courses', 'courses.students'] });
        sortData(faculties);
        const analysis = faculties.map(e => {
          let count: number = 0;
          e.courses.map(e => {
            count = count + e.students.length
          })
          return {
            id: e.id,
            name: e.name,
            description: e.description,
            totalCourses: e.courses.length,
            totalStudents: count,
            courses: e.courses,
            createdAt: moment(e.createdAt).format("D MMM YYYY"),
            updatedAt: moment(e.updatedAt).format("D MMM YYYY")
          }
        })
        return analysis;
      } catch (error) {
        return error;
      }
    },
    getFaculty: async (_: any, { id }, { req }) => {
      try {
        const faculty = await Faculty.findOne({ where: { id: id}, relations: ['courses'] });
        if (!faculty) {
          return new DataNotFoundException(id);
        }
        else {
          return faculty;
        }
      } catch (error) {
        return error;
      }
    }
  },
  Mutation: {
    createFaculty:  async (_: any, { faculty }, { req }) => {
      const { name, description } = faculty;
      try {
        const newFaculty = new Faculty();
        newFaculty.name = name;
        newFaculty.description = description;
        
        const errors = await validate(newFaculty);
        if (errors.length > 0) {
          const message = errors
          .map((error: ValidationError) => {
            const message: any = error.constraints;
            return Object.values(message)
          })
          .join(", ");
          
        return new HttpException(500, message);
        }
        else {
          await newFaculty.save();
          return 'Faculty created successfully';
        }
      } catch (error) {
        
        return new HttpException(500, error)
      }
    }
  }
}