import Academics from "../entity/academics.entity"
import { AcademicStatus } from "../enum";
import { sortData } from "../utils/sort";

export default {
  Query: {
    listAcademics: async (_: any, __: any, { req }) => {
      try {
        const academics = await Academics.find();
        sortData(academics);
        return academics.map(e => {
          let status: string;
          if (e.status === '0') {
            status = AcademicStatus.inactive
          }
          else {
            status = AcademicStatus.active
          }
          return {
            id: e.id,
            academicYear: e.academicYear,
            description: e.description,
            status: status,
            createdAt: e.createdAt,
            updatedAt: e.updatedAt
          }
        })
      } catch (error) {
        return error;
      }
    }
  },
  Mutation: {
    createAcademic: async (_: any, { academic }, { req }) => {
      const { academicYear, description } = academic;
      try {
        const newAcademic = new Academics();
        newAcademic.academicYear = academicYear;
        newAcademic.description = description;

        const findAcademic = await Academics.find({ where: { status: '1' } });

        if (findAcademic.length > 0) {
          const disableAcademic = await Academics.update({ status: '1' }, {
            status: '0'
          });
          if (disableAcademic) {
            const saveAcademic = await newAcademic.save();
            if (saveAcademic) {
              return 'Academic created successfully';
            }
          }
        }
        else {
          const saveAcademic = await newAcademic.save();
          if (saveAcademic) {
            return 'Academic created successfully';
          }
        }
      } catch (error) {
        return error;
      }
    }
  }
}