import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AccountDto {
  @ApiProperty({
    type: String,
    description: 'MSISDN with code country 62 and be 9-20 digits long',
    minLength: 9,
    maxLength: 20,
    required: true,
  })
  @IsString()
  // Validation Regex with 2 first character must be 62
  @Matches(/^\+?62\d{9,20}$/, {
    message: 'MSISDN must start with 62 and be 9-20 digits long',
  })
  @MaxLength(20)
  @IsNotEmpty()
  msisdn: string;

  @ApiProperty({
    type: String,
    description: 'Unique username',
    maxLength: 12,
    required: true,
  })
  @IsString()
  @MaxLength(12)
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: String,
    description: 'Password with combination number and letter',
    minLength: 9,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(9, { message: 'Password must be at least 9 characters long' })
  @Matches(/^(?=.*[0-9])(?=.*[a-z])[a-zA-Z0-9]+$/, {
    message: 'Password must contain at least one number and one letter (a-z)',
  })
  password: string;
}
