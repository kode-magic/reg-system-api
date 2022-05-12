import { Entity, BaseEntity, PrimaryColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, BeforeInsert, OneToMany } from "typeorm";
import Courses from "./course.entity";
import { ulid } from "ulid";
import { IsString, IsOptional, IsEnum } from "class-validator";
import Semester from "./semester.entity";
import { GENDER, Religion, CivilStatus, studentType } from "../enum";
import StudentModules from "./student-modules.entity";
import Academics from "./academics.entity";

@Entity()
class Students extends BaseEntity {
  @PrimaryColumn({type: 'varchar'}) id: string;
  @Column({type: 'varchar', name: 'given_names'}) @IsString() givenNames: string;
  @Column({type: 'varchar', name: 'family_name'}) @IsString() familyName: string;
  @Column({type: 'varchar', name: 'gender'}) @IsEnum(GENDER) gender: string;
  @Column({type: "text", name: 'student_id'}) @IsString() studentId: string;
  @Column({type: 'varchar'}) @IsString() phone: string;
  @Column({type: 'varchar'}) @IsString() email: string;
  @Column({type: 'varchar'}) @IsString() nationality: string;
  @Column({type: 'varchar', name: 'birth_country'}) @IsString() birthCountry: string;
  @Column({type: 'date', name: 'birth_date'}) @IsString() birthDate: Date;
  @Column({type: 'varchar', name: 'birth_place'}) @IsString() birthPlace: string;
  @Column({ type: 'varchar' }) @IsEnum(Religion) religion: string;
  @Column({type: 'varchar'}) @IsString() address: string;
  @Column({type: 'varchar', name: 'admission_date'}) @IsString() admissionDate: string;
  @Column({type: 'varchar', name: 'student_type'}) @IsEnum(studentType) studentType: String
  @Column({ type: 'varchar', name: "civil_status" }) @IsEnum(CivilStatus) civilStatus: string;
  @ManyToOne(() => Semester, semester => semester.students) semester: Semester;
  @ManyToOne(() => Courses, course => course.students) course: Courses;
  @Column({type: 'varchar', nullable: true}) photo: string;
  @OneToMany(() => StudentModules, mod => mod.student) modules: StudentModules[];
  @CreateDateColumn({type: 'timestamp without time zone', name: 'created_at'}) createdAt: Date; 
  @UpdateDateColumn({type: 'timestamp without time zone', name: 'updated_at'}) updatedAt: Date; 

  @BeforeInsert()
  generateId () {
    this.id = ulid();
  }
}

export default Students;