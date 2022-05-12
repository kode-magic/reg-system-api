import { validate, ValidationError } from "class-validator";
import moment = require("moment");
import Courses from '../entity/course.entity'
import DataNotFoundException from "../exception/DataNotFoundException";
import HttpException from "../exception/HttpException";
import { sortData } from "../utils/sort";

export default {
  Query: {
    listCourses: async (_: any, __: any, { req }) => {
      try {
        const courses: Array<Courses> = await Courses.find({ relations: ['faculty', 'students'] });
        sortData(courses);
        const allCourses = courses.map(e => {
          return {
            id: e.id,
            name: e.name,
            description: e.description,
            faculty: e.faculty.name,
            totalStudents: e.students.length,
            students: e.students,
            createdAt: moment(e.createdAt).format("D MMM YYYY"),
            updatedAt: moment(e.updatedAt).format("D MMM YYYY")
          }
        })
        return allCourses;
      } catch (error) {
        return error;
      }
    },
    getCourse: async (_: any, { id }, { req }) => {
      try {
        const faculty = await Courses.findOne({ where: { id: id }, relations: ['faculty', 'students'] });
        if (!faculty) {
          return new DataNotFoundException(id);
        }
        else {
          return faculty;
        }
      } catch (error) {
        return error;
      }
    },
    getFacultyCourses: async (_: any, { id }, { req }) => {
      try {
        const faculty = await Courses.findOne({ where: { faculty: id } });
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
    createCourse:  async (_: any, { course }, { req }) => {
      const { name, description, faculty } = course;
      try {
        const newCourse = new Courses();
        newCourse.name = name;
        newCourse.description = description;
        newCourse.faculty = faculty;
        
        const errors = await validate(newCourse);
        if (errors.length > 0) {
          const message = errors
          .map((error: ValidationError) => {
            const message: any = error.constraints;
            return Object.values(message)
          })
          .join(", ");
          console.log(message);
          
        return new HttpException(500, message);
        }
        else {
          await newCourse.save();
          return 'Course created successfully';
        }
      } catch (error) {
        console.log(error);
        
        return new HttpException(500, error.detail);
      }
    }
  }
}