import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { ulid } from "ulid";
import { IsPhoneNumber, IsEmail, IsString, MinLength, IsEnum } from "class-validator";
import { ROLE } from "../enum";

@Entity({name: 'users'})
class User extends BaseEntity {
  @PrimaryColumn({name: 'id', type: 'varchar'}) id: string;
  @Column({ name: 'given_names', type: 'varchar' }) name: string;
  @Column({ type: 'varchar', length: 12, unique: true }) @IsPhoneNumber('SL') phone: string;
  @Column({ type: 'varchar', length: 150, unique: true }) @IsEmail() email: string;
  @Column({ type: 'varchar', length: 100, unique: true }) @IsString() @MinLength(5) username: string;
  @Column({ type: 'varchar' }) @MinLength(8) password: string;
  @Column({ type: 'varchar' }) @IsEnum(ROLE) role: string;
  @CreateDateColumn({ name: 'created_at', type: 'timestamp without time zone' }) createdAt: Date;
  @UpdateDateColumn({ name: 'update_at', type: 'timestamp without time zone' }) updatedAt: Date;

  @BeforeInsert() generateId() {
    this.id = ulid();
  }
}

export default User;