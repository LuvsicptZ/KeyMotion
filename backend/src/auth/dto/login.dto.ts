import { IsEmail, IsString, Length, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class LoginDto {
    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string

    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(8, { message: 'Password must be at least 8 characters' })
    @MaxLength(24, { message: 'Password must be less than 24 characters' })
    password: string;
}