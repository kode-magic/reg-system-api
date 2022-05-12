import { validate, ValidationError } from 'class-validator';
import Students from '../entity/student.entity';
import { DataNotFoundException, HttpException } from '../exception';
import { computeAge } from '../utils/compute-age';
import { sortData } from '../utils/sort';

export default {
  Query: {
    listStudents: async (_: any, __: any, { req }) => {
      try {
        const students = await Students.find({ relations: ['course', 'course.faculty', 'semester'] });
        sortData(students);
        const allStudents = students.map(e => {
          return {
            id: e.id,
            givenNames: e.givenNames,
            familyName: e.familyName,
            gender: e.gender,
            studentId: e.studentId,
            phone: e.phone,
            email: e.email,
            nationality: e.nationality,
            birthCountry: e.birthCountry,
            age: computeAge(e.birthDate),
            birthDate: e.birthDate,
            birthPlace: e.birthPlace,
            religion: e.religion,
            address: e.address,
            civilStatus: e.civilStatus,
            semester: e.semester.name,
            course: e.course.name,
            faculty: e.course.faculty.name,
            studentType: e.studentType,
            admissionDate: e.admissionDate,
            createdAt: e.createdAt,
            updatedAt: e.updatedAt
          }
        });

        return allStudents;
      } catch (error) {
        return error
      }
    },
    getStudent: async (_: any, { id }, { req }) => {
      try {
        const student = await Students.findOne({ 
          where: { id: id }, 
          relations: ['course', 'course.faculty', 'semester'] 
        });
        if (!student) {
          return new DataNotFoundException(id);
        }
        else {
          const studentData = {
            id: student.id,
            givenNames: student.givenNames,
            familyName: student.familyName,
            gender: student.gender,
            studentId: student.studentId,
            phone: student.phone,
            email: student.email,
            nationality: student.nationality,
            birthCountry: student.birthCountry,
            age: computeAge(student.birthDate),
            birthDate: student.birthDate,
            birthPlace: student.birthPlace,
            religion: student.religion,
            address: student.address,
            civilStatus: student.civilStatus,
            semester: student.semester.name,
            course: student.course.name,
            faculty: student.course.faculty.name,
            studentType: student.studentType,
            admissionDate: student.admissionDate,
            createdAt: student.createdAt,
            updatedAt: student.updatedAt
          }

          return studentData;
        }
      } catch (error) {
        return error
      }
    }
  },
  Mutation: {
    createStudent: async (_: any, { student }, { req }) => {
      const {
        givenNames, familyName, gender, birthDate, phone, course, civilStatus,
        birthCountry, nationality, birthPlace, email, religion, studentId,
        studentType, semester, address, admissionDate
      } = student;

      const newStudents = new Students();

      newStudents.studentId = studentId;
      newStudents.givenNames = givenNames;
      newStudents.familyName = familyName;
      newStudents.gender = gender;
      newStudents.birthDate = birthDate;
      newStudents.phone = phone;
      newStudents.course = course;
      newStudents.studentType = studentType;
      newStudents.semester = semester;
      newStudents.admissionDate = admissionDate;
      newStudents.civilStatus = civilStatus;
      newStudents.birthCountry = birthCountry;
      newStudents.nationality = nationality;
      newStudents.email = email;
      newStudents.birthPlace = birthPlace;
      newStudents.religion = religion;
      newStudents.address = address;

      const errors = await validate(newStudents);

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
          const saveEmployee = await newStudents.save();
          if (saveEmployee) {
            return 'Student added successfully';
          }

        } catch (error) {
          return new HttpException(500, error.detail);
        }
      }
    },
  }
}