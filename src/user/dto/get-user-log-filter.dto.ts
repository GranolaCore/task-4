import { IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";

export class getUserLogFilterDTO {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'The from date must be in the format yyyy-mm-dd',
    })
    from?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'The from date must be in the format yyyy-mm-dd',
    })
    to?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    limit?: string;
}
