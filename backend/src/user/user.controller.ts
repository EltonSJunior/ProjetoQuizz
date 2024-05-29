import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('register')
    async register(@Body() createUserDto: { username: string; password: string }) {
        return this.userService.create(createUserDto.username, createUserDto.password);
    }
}
