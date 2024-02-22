import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserGender } from '../types/user-gender.enum';
import { Matches } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Matches(/^[a-zA-Z0-9_]+$/)
  @Column({ type: 'varchar', length: 100, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 100 })
  fullName: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ enum: UserGender, type: 'enum' })
  gender: UserGender;

  @CreateDateColumn({ type: 'timestamp' })
  @Index()
  createdAt: Date;
}
