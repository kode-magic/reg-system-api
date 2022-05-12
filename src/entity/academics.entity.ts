import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { ulid } from "ulid";
import StudentModules from "./student-modules.entity";
import Students from "./student.entity";

@Entity()
class Academics extends BaseEntity {
  @PrimaryColumn({type: 'varchar'}) id: string;
  @Column({type: 'varchar', name: 'academic_year'}) academicYear: string;
  @Column({type: 'varchar'}) description: string; 
  @Column({type: 'bit', default: '1'}) status: string; 
  @CreateDateColumn({type: 'timestamp without time zone', name: 'created_at'}) createdAt: Date; 
  @UpdateDateColumn({type: 'timestamp without time zone', name: 'updated_at'}) updatedAt: Date; 

  @BeforeInsert()
  generateId () {
    this.id = ulid();
  }
}

export default Academics;