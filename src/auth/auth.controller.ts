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

@Controller('auth')
@UseInterceptors(ResponseTransformInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /* Sign Up Account */
  @Post('sign-up')
  async postSignUp(@Body(ValidationPipe) body: AccountDto) {
    return await this.authService.signUp(body);
  }

  /* Sign In Account */
  @Post('sign-in')
  @HttpCode(200)
  async postSignIn(@Body() body: LoginDto) {
    return await this.authService.signIn(body);
  }

  /* Get Account */
  @UseGuards(AuthGuard)
  @Get()
  async getDetailAccount(@Request() req) {
    return req.user;
  }
}
