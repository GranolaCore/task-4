import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateExerciseDTO } from './dto/create-exercise.dto';
import { getUserLogDTO } from './dto/get-user-log.dto';
import { getUserLogFilterDTO } from './dto/get-user-log-filter.dto';

@Controller('api/users')
export class UserController {
    constructor(private userService: UserService) {}

    @Post()
    createUser(@Body() createUserDTO: CreateUserDTO): Promise<string | User> {
        return this.userService.createUser(createUserDTO);
    }
    @Get()
    getUsers(): Promise<User[]> {
        return this.userService.getUsers();
    }

    @Post(':id/exercises')
    createExercise(
        @Param('id') id: string,
        @Body() createExerciseDTO: CreateExerciseDTO
    ): Promise<User> {
        return this.userService.createExercise(id, createExerciseDTO);
    }
    @Get(':id/logs')
    getUserLogs(
        @Param('id') id: string,
        @Query() filterDto: getUserLogFilterDTO
    ): Promise<getUserLogDTO> {
        return this.userService.getUserLog(id, filterDto);
    }
}
