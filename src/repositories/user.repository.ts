import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { getUserLogDTO } from 'src/user/dto/get-user-log.dto';
import { Exercise } from 'src/user/entities/exercise.entity';
import { User } from 'src/user/entities/user.entity';
import { DataSource, Repository } from 'typeorm';

export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async createUser(createUserDTO: CreateUserDTO): Promise<string | User> {
        const { username } = createUserDTO;
        const sameUsername = await this.find({ where: { username } });
        console.log(sameUsername)
        if (await sameUsername.length > 0) {
            throw new ConflictException('This username is already exist');
        }
        const user = this.create({ username });
        return await this.save(user);
    }
    async getUsers(): Promise<User[]> {
        const users = await this.find();
        return users;
    }
    async getUserById(id: string): Promise<User> {
        const user = await this.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
    async getUserLog(user: User, log: Exercise[]): Promise<getUserLogDTO> {
        const { username, id } = user;
        const count: number = log.length;
        return {
            username,
            id,
            count,
            log,
        };
    }
}
