import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) {}

    createUser(createUserDTO: CreateUserDTO) {
      return this.userRepository.createUser(createUserDTO)
    }
}
