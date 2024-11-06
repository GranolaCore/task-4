import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from 'src/repositories/user.repository';
import { DataSource } from 'typeorm';
import { ExerciseRepository } from 'src/repositories/exercise.repository';

@Module({
    providers: [
        UserService,
        {
            provide: UserRepository,
            useFactory: (dataSource: DataSource) => {
                return new UserRepository(dataSource);
            },
            inject: [DataSource],
        },
        {
            provide: ExerciseRepository,
            useFactory: (dataSource: DataSource) => {
                return new ExerciseRepository(dataSource);
            },
            inject: [DataSource],
        },
    ],
    controllers: [UserController],
})
export class UserModule {}
