import { AfterInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  firstName: string;

  @Column('varchar')
  lastName: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar')
  password: string;

  @Column('boolean', { default: 1 })
  active: boolean;

  @Column('bigint', { default: new Date().getTime() })
  created_at: number;

  @Column('bigint', { default: new Date().getTime() })
  modify_at: number;

  @Column('bigint', { default: null })
  eliminated_at: number;

  @AfterInsert()
  insertCreatedDate() {
    this.created_at = new Date().getTime();
  }
}
