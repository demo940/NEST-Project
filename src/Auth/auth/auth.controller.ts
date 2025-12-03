import { Body, Controller, Post, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from '../DTOs/register.dto';
import { LoginDTO } from '../DTOs/login.dto';
import { ValidateUserPipe } from '../Pipes/validatePasLength.pipe';
import { RefreshTokenDto } from '../DTOs/refreshToken.dto';
import { RefreshResponseDto } from '../DTOs/refreshRes.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  @Post('register')
  async registerUser(@Body(new ValidationPipe(), new ValidateUserPipe()) registerUserDTO: RegisterDto){

    const {email, password} = registerUserDTO;

    const registeredUser = await this.authService.registerUser(email, password);

    return registeredUser;
  }

  @Post('login')
  async logInUser(@Body(new ValidationPipe()) loginUserDTO: LoginDTO){

    const {email, password} = loginUserDTO;

    const logedInUser = await this.authService.loginUser(email, password)

    return logedInUser;

  }

  //Get new AccessToken
   @Post('refresh')
  async refresh(@Body() body: RefreshTokenDto): Promise<RefreshResponseDto> {
    return this.authService.getNewAccessToken(body.refreshToken);
  }

}
