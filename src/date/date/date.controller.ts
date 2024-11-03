import { Controller, Get, Param } from '@nestjs/common';
import { DateService } from './date.service';

@Controller('api')
export class DateController {
    constructor(private dateService: DateService) {}

    @Get('/:date?')
    getDateInfo(@Param('date') date?: string) {
        return this.dateService.getDate(date);
    }
}
