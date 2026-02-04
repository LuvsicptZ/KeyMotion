import { Body, Post, Controller } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly auth: AuthService) {}

    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return this.auth.register(dto)
    }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        return this.auth.login(dto)
    }
}
