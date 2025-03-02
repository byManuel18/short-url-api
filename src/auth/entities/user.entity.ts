import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Roles } from '../enums/role.enum';
import { hashPassword } from '../helpers/password.helper';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  userName: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @Column('text', {
    array: true,
    default: [Roles.USER],
  })
  roles: Roles[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = hashPassword(this.password);
    }
  }
}
