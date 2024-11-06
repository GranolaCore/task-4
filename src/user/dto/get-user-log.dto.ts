import {
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
import { Exercise } from '../entities/exercise.entity';

export class getUserLogDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    @MinLength(1)
    username: string;

    @IsString()
    id: string;

    @IsNumber()
    count: number;

    log: Exercise[];
}
