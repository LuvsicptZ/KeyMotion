import { Injectable, ConflictException, UnauthorizedException } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from 'bcrypt';
import { UsersService } from "../user/users.service";
import { LoginDto } from "./dto/login.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(
        private readonly users: UsersService,
        private readonly jwt: JwtService,
    ) {}

    async register(registerDto: RegisterDto) {
        const { username, email, password } = registerDto;

        const existingUser = await this.users.findByEmail(email);

        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await this.users.createUser({
            username,
            email,
            passwordHash
        })

        const { passwordHash: _, ...safeUser } = user;

        return safeUser;
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.users.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const accessToken = await this.jwt.signAsync({
            sub: user.id,
            email: user.email,
        });

        return { accessToken }
    }

    getMe(userId: string) {
        return this.users.findById(userId);
    }
}
