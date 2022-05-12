import { IsString } from "class-validator";
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { ulid } from "ulid";
import Courses from "./course.entity";

@Entity()
export default class Faculty extends BaseEntity {
  @PrimaryColumn({type: 'varchar'}) id: string;
  @Column({type: 'varchar'}) @IsString() name: string;
  @Column({type: 'varchar'}) @IsString() description: string;
  @OneToMany(() => Courses, course => course.faculty) courses: Courses[];
  @CreateDateColumn({ name: 'created_at', type: 'timestamp without time zone' }) createdAt: Date;
  @UpdateDateColumn({ name: 'update_at', type: 'timestamp without time zone' }) updatedAt: Date;

  @BeforeInsert()
  generate() {
    this.id = ulid()
  }
}