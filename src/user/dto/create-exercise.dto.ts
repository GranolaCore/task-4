import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateExerciseDTO {
    @IsString()
    @MaxLength(100)
    @MinLength(1)
    @IsNotEmpty()
    description: string;

    @IsNumber()
    duration: number;

    @IsString()
    date: string;
}
