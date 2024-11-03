import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ExerciseModule } from './exercise/exercise.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';

@Module({
    imports: [
        UserModule,
        ExerciseModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'exercise-tracker',
            entities: [User],
            synchronize: true,
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
