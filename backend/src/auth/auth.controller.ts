import { Body, Post, Controller } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly auth: AuthService) {}

    @Post('register')
    async register(@Body() dto: RegisterDto) {
        return this.auth.register(dto)
    }
}
