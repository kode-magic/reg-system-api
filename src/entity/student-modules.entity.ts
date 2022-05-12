import { Entity, BaseEntity, PrimaryColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, BeforeInsert } from "typeorm";
import { ulid } from "ulid";
import Students from "./student.entity";
import Modules from "./module.entity";
import Semester from "./semester.entity";
import Academics from "./academics.entity";

@Entity()
class StudentModules extends BaseEntity {
  @PrimaryColumn({type: 'varchar'}) id: string;
  @ManyToOne(() => Students, student => student.modules) student: Students;
  @ManyToOne(() => Modules, module => module.modules) module: Modules;
  @ManyToOne(() => Semester, module => module.semesterModules) semester: Modules;
  @Column({type: 'float8', name: 'continuous_assessment', nullable: true}) continuousAssessment: number;
  @Column({type: 'float8', name: 'exams_grade', nullable: true}) examsGrade: number;
  @CreateDateColumn({type: 'timestamp without time zone', name: 'created_at'}) createdAt: Date; 
  @UpdateDateColumn({type: 'timestamp without time zone', name: 'updated_at'}) updatedAt: Date; 

  @BeforeInsert()
  generateId () {
    this.id = ulid();
  }
}

export default StudentModules;