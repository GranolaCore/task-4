import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    createUser(@Body() createUserDTO: CreateUserDTO) {
        this.userService.createUser(createUserDTO)
    }
}
