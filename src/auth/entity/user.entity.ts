import { Column, Entity, Index, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index('index_msisdn')
  @Unique('unique_msisdn', ['msisdn'])
  @Column('varchar', { length: 20, nullable: false })
  msisdn: string;

  @Index('index_username')
  @Unique('unique_username', ['username'])
  @Column('varchar', { length: 12, nullable: false })
  username: string;

  @Column('varchar', { length: 144, nullable: false })
  password: string;
}
