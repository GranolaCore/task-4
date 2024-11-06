import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { Exercise } from './user/entities/exercise.entity';

@Module({
    imports: [
        UserModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'exercise-tracker',
            entities: [User, Exercise],
            synchronize: true,
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
