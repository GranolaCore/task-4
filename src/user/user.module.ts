import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from 'src/repositories/user.repository';
import { DataSource } from 'typeorm';

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
    ],
    controllers: [UserController],
})
export class UserModule {}
