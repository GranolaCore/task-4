import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { CreateExerciseDTO } from './dto/create-exercise.dto';
import { Exercise } from './entities/exercise.entity';
import { ExerciseRepository } from 'src/repositories/exercise.repository';
import { getUserLogDTO } from './dto/get-user-log.dto';
import { getUserLogFilterDTO } from './dto/get-user-log-filter.dto';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
        private exerciseRepository: ExerciseRepository
    ) {}
    private isDateValid(date: Date, dateString: string): boolean {
        const [year, month, day] = dateString.split('-').map(Number);
        return (
            date.getFullYear() === year &&
            date.getMonth() + 1 === month &&
            date.getDate() === day
        );
    }
    private getDate(date: string): string {
        const now = date ? new Date(date) : new Date();

        if (!isNaN(Number(date))) {
            return new Date(Number(date)).toUTCString();
        }

        if (isNaN(now.getTime()) || (date && !this.isDateValid(now, date))) {
            return 'Invalid Date';
        }
        return now.toUTCString();
    }
    private getYyyyMmDdDate(date: string): string {
        const now = new Date(date);

        if (!isNaN(Number(date))) {
            const now = new Date(Number(date));
            return now.toISOString().split('T')[0];
        }

        if (isNaN(now.getTime()) || (date && (date && !this.isDateValid(now, date)))) {
            return;
        }
        return now.toISOString().split('T')[0];
    }

    createUser(createUserDTO: CreateUserDTO): Promise<string | User> {
        return this.userRepository.createUser(createUserDTO);
    }
    getUsers(): Promise<User[]> {
        return this.userRepository.getUsers();
    }
    async createExercise(
        id: string,
        createExerciseDTO: CreateExerciseDTO
    ): Promise<User> {
        const user = await this.userRepository.getUserById(id);
        const date = this.getDate(createExerciseDTO.date);
        return this.exerciseRepository.createExercise(
            user,
            date,
            createExerciseDTO
        );
    }
    async getUserLog(
        id: string,
        filterDto: getUserLogFilterDTO
    ): Promise<getUserLogDTO> {
        const user = await this.userRepository.getUserById(id);
        const from = this.getYyyyMmDdDate(filterDto.from);
        const to = this.getYyyyMmDdDate(filterDto.to);
        const exercises = await this.exerciseRepository.getUserExercisesById(
            user,
            filterDto,
            from,
            to
        );
        return this.userRepository.getUserLog(user, exercises);
    }
}
