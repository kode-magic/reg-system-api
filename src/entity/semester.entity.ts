import { Entity, BaseEntity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, OneToMany } from "typeorm";
import { ulid } from "ulid";
import { IsString } from "class-validator";
import Students from "../entity/student.entity";
import StudentModules from "./student-modules.entity";

@Entity()
class Semester extends BaseEntity {
  @PrimaryColumn({type: 'varchar'}) id: string;
  @Column({type: 'varchar'}) @IsString() name: string;
  @OneToMany(() => Students, student => student.semester) students: Students[];
  @OneToMany(() => StudentModules, module => module.semester) semesterModules: StudentModules[];
  @CreateDateColumn({type: 'timestamp without time zone', name: 'created_at'}) createdAt: Date; 
  @UpdateDateColumn({type: 'timestamp without time zone', name: 'updated_at'}) updatedAt: Date; 

  @BeforeInsert()
  generateId () {
    this.id = ulid();
  }
}

export default Semester;