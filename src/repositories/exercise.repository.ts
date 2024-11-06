import { CreateExerciseDTO } from 'src/user/dto/create-exercise.dto';
import { Exercise } from 'src/user/entities/exercise.entity';
import { DataSource, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { getUserLogFilterDTO } from 'src/user/dto/get-user-log-filter.dto';
import { InternalServerErrorException } from '@nestjs/common';
import { Op } from 'sequelize';

export class ExerciseRepository extends Repository<Exercise> {
    constructor(private dataSource: DataSource) {
        super(Exercise, dataSource.createEntityManager());
    }

    async createExercise(
        user: User,
        date: string,
        createExerciseDTO: CreateExerciseDTO
    ): Promise<User> {
        //Creating exercise
        const { description } = createExerciseDTO;
        const duration = +createExerciseDTO.duration;
        const exercise = this.create({
            description,
            duration,
            date,
            user,
        });
        await this.save(exercise);

        // returning user's exercises
        const exercises = await this.find({ where: { user } });
        const { username, id } = user;
        return {
            username,
            id,
            exercises,
        };
    }
    async getUserExercisesById(
        user: User,
        filterDto: getUserLogFilterDTO,
        from: string,
        to: string
    ): Promise<Exercise[]> {
        const { limit } = filterDto;
        const query = this.createQueryBuilder('exercise');
        query.where({ user });
        console.log(from, to);
        if (from) {
            query.andWhere('DATE(exercise.date) >= :from', {
                from,
            });
            console.log(from, to);
        }
        if (to) {
            query.andWhere('DATE(exercise.date) <= :to', {
                to,
            });
        }
        if (!isNaN(+limit)) {
            query.limit(+limit);
        }

        try {
            return await query.getMany();
        } catch (error) {
            throw new InternalServerErrorException(
                `Failed to get log for user ${user.username}. Filters: ${JSON.stringify(filterDto)}`
            );
        }
    }
}
