import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AccountDto } from './dto/account.dto';
import { AuthService } from './auth.service';
import { ResponseTransformInterceptor } from 'src/common/interceptor/response.interceptor';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import {
  ApiBearerAuth,
  ApiHeaders,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SuccessResponse } from 'src/common/dto/success-response.dto';
import { ErrorResponse } from 'src/common/dto/error-response.dto';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(ResponseTransformInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /* Sign Up Account */
  @ApiResponse({
    status: 201,
    description: 'Sign Up Successfully',
    type: SuccessResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error and already exists data',
    type: ErrorResponse,
  })
  @Post('sign-up')
  async postSignUp(@Body(ValidationPipe) body: AccountDto) {
    return await this.authService.signUp(body);
  }

  /* Sign In Account */
  @ApiResponse({
    status: 200,
    description: 'Sign In Successfully',
    type: SuccessResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Wrong password and msisdn does not exists',
    type: ErrorResponse,
  })
  @Post('sign-in')
  @HttpCode(200)
  async postSignIn(@Body() body: LoginDto) {
    return await this.authService.signIn(body);
  }

  /* Get Account */
  @ApiResponse({
    status: 200,
    description: 'Success validate jwt token',
    type: SuccessResponse,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorize',
    type: ErrorResponse,
  })
  @ApiBearerAuth()
  @ApiHeaders([
    {
      name: 'Authorization',
      description: 'Bearer jwt token',
    },
  ])
  @UseGuards(AuthGuard)
  @Get()
  async getDetailAccount(@Request() req) {
    return req.user;
  }
}
