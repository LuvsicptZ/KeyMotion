import { Controller, Get, Param } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly users: UsersService) {}

    @Get(':id/profile')
    getProfile(@Param('id') id: string) {
        return this.users.getProfile(id);
    }
}