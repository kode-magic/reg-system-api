import moment = require('moment');
import { Semester } from '../entity';
import { sortData } from '../utils/sort';

export default {
  Mutation: {
    createSemester: async (_: any, { name }, { req }) => {
      try {
        const newSemester = new Semester();
        newSemester.name = name;

        const saveSemester = await newSemester.save();
        if (saveSemester) {
          return 'Semester Created successfully';
        }
      } catch (error) {
        return error
      }
    }
  },
  Query: {
    listSemesters: async (_: any, __: any, { req }) => {
      try {
        const semesters: Array<Semester> = await Semester.find();
        const allSemesters = semesters.map(e => {
          return {
            id: e.id,
            name: e.name,
            students: e.students,
            createdAt: moment(e.createdAt).format("D MMM YYYY"),
            updatedAt: moment(e.updatedAt).format("D MMM YYYY")
          }
        })
        return allSemesters;
      } catch (error) {
        return error;
      }
    }
  }
}