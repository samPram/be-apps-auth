import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AccountDto {
  @IsString()
  // Validation Regex with 2 first character must be 62
  @Matches(/^\+?62\d{9,20}$/, {
    message: 'MSISDN must start with 62 and be 9-20 digits long',
  })
  @MaxLength(20)
  @IsNotEmpty()
  msisdn: string;

  @IsString()
  @MaxLength(12)
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9, { message: 'Password must be at least 9 characters long' })
  @Matches(/^(?=.*[0-9])(?=.*[a-z])[a-zA-Z0-9]+$/, {
    message: 'Password must contain at least one number and one letter (a-z)',
  })
  password: string;
}
