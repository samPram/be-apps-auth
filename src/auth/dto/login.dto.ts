import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: String,
    description: 'MSISDN has registered',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  msisdn: string;

  @ApiProperty({
    type: String,
    description: 'Password has registered',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
