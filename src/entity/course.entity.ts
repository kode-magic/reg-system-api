import { Entity, BaseEntity, PrimaryColumn, Column, ManyToOne, CreateDateColumn, BeforeInsert, OneToMany, UpdateDateColumn } from "typeorm";
import { ulid } from "ulid";
import { IsString } from "class-validator";
import Students from "./student.entity";
import Faculty from "./faculty.entity";

@Entity()
class Courses extends BaseEntity {
  @PrimaryColumn({type: 'varchar'}) id: string;
  @Column({type: "varchar"}) @IsString() name: string;
  @Column({type: "varchar", nullable: true}) @IsString() description: string;
  @ManyToOne(() => Faculty, faculty => faculty.courses) faculty: Faculty;
  @OneToMany(() => Students, student => student.course) students: Students[];
  @CreateDateColumn({type: 'timestamp without time zone', name: 'created_at'}) createdAt: Date;
  @UpdateDateColumn({type: 'timestamp without time zone', name: 'updated_at'}) updatedAt: Date; 

  @BeforeInsert()
  generateId () {
    this.id = ulid();
  }
}

export default Courses;