import { StudentModules } from "../entity"

export default {
  Query: {
    listStudentModules: async (_: any, { student }, { req }) => {
      try {
        return await StudentModules.find({
          where: { student: student }, order: { updatedAt: 'DESC' },
          relations: ['student', 'module', 'semester']
        });
      } catch (error) { return error; }
    },
  },
  Mutation: {
    addStudentModule: async (_: any, { mod }, { req }) => {
      const { student, module, semester } = mod;

      try {
        const newStudentModule = new StudentModules();
        newStudentModule.student = student;
        newStudentModule.module = module;
        newStudentModule.semester = semester;

        const saveMod = await newStudentModule.save();
        if (saveMod) {
          return 'Module assigned to student successfully';
        }
      } catch (error) {
        return error;
      }
    }
  }
}