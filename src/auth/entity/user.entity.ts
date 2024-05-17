import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column('varchar', { length: 13, nullable: false, unique: true })
  msisdn: string;

  @Index()
  @Column('varchar', { length: 12, nullable: false, unique: true })
  username: string;

  @Column('varchar', { length: 144, nullable: false })
  password: string;
}
