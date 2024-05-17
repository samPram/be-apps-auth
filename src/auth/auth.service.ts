import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EntityNotFoundError, QueryFailedError, Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { AccountDto } from './dto/account.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private accountRepository: Repository<UserEntity>,
  ) {}

  /* Sign Up Process */
  async signUp(body: AccountDto) {
    const { password, ...other_body } = body;

    // hash password when saving on db
    const hash_password = await bcrypt.hash(password, 10);

    const user = this.accountRepository
      .save({
        password: hash_password,
        ...other_body,
      })
      .then((res) => {
        // remove user password on response
        delete res.password;

        return res;
      })
      .catch((err) => {
        // Handle Duplicate Username & MSISDN
        if (
          err instanceof QueryFailedError &&
          err.message.includes('duplicate key value violates unique constraint')
        ) {
          throw new HttpException(
            'Username Or MSISDN already exists!',
            HttpStatus.BAD_REQUEST,
          );
        }

        // Defaul Error Response
        throw new HttpException(err?.message, HttpStatus.INTERNAL_SERVER_ERROR);
      });

    return user;
  }

  /* Get One Account By Condition */
  async getBy(condition: any) {
    return await this.accountRepository.findOneByOrFail(condition);
  }

  /* Sign In Process */
  async signIn(body: LoginDto) {
    const { password, msisdn } = body;

    try {
      // Check Account if Exists
      const account = await this.getBy({ msisdn });

      console.log(account);

      // Compare Password encryption
      const check_pass = await bcrypt.compare(password, account?.password);

      if (!check_pass) {
        throw new HttpException('Wrong password!', HttpStatus.BAD_REQUEST);
      }

      const payload = { sub: account.id };
      return { token: await this.jwtService.signAsync(payload) };
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new HttpException(
          'Account does not exists!',
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        'Internal server error!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
