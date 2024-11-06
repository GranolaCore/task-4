import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    @MinLength(1)
    username: string;
}
