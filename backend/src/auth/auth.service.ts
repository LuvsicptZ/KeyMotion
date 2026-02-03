import { Injectable, ConflictException } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from 'bcrypt';
import { UsersService } from "src/user/users.service";

@Injectable()
export class AuthService {

    constructor(private readonly users: UsersService) {}

    async register(dto: RegisterDto) {
        const { username, email, password } = dto;

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
}
