import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('timestamp', { default: null })
  created_at: Date;

  @Column('timestamp', { default: null })
  modify_at: Date;

  @Column('timestamp with time zone', { default: null })
  eliminated_at: Date;
}
