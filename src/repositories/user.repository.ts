import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.entity';
import { DataSource, Repository } from 'typeorm';

export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    createUser(createUserDTO: CreateUserDTO) {
        const { username } = createUserDTO;
        const user = this.create({ username });
        return this.save(user);
    }
}
