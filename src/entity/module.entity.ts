import { Entity, BaseEntity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, OneToMany } from "typeorm";
import { ulid } from "ulid";
import { IsString, IsOptional } from "class-validator";
import StudentModules from "./student-modules.entity";

@Entity()
class Modules extends BaseEntity {
  @PrimaryColumn({type: 'varchar'}) id: string;
  @Column({type: 'varchar'}) @IsString() code: string;
  @Column({type: 'varchar'}) @IsString() name: string;
  @Column({type: "text"}) @IsString() description: string;
  @Column({type: 'float8', name: 'credit_hour', nullable: true}) creditHour: number;
  @OneToMany(() => StudentModules, studentModule => studentModule.module) modules: StudentModules[];
  @CreateDateColumn({type: 'timestamp without time zone', name: 'created_at'}) createdAt: Date; 
  @UpdateDateColumn({type: 'timestamp without time zone', name: 'updated_at'}) updatedAt: Date; 

  @BeforeInsert()
  generateId () {
    this.id = ulid();
  }
}

export default Modules;