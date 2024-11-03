import { Injectable } from '@nestjs/common';

@Injectable()
export class DateService {
    private isDateValid(date: Date, dateString: string): boolean {
        const [year, month, day] = dateString.split('-').map(Number);
        return (
            date.getFullYear() === year &&
            date.getMonth() + 1 === month &&
            date.getDate() === day
        );
    }
    getDate(date: string) {
        const now = date ? new Date(date) : new Date();

        if (!isNaN(Number(date))) {
            return {
                utc: new Date(Number(date)).toUTCString(),
                unix: Number(date),
            };
        }

        if (isNaN(now.getTime()) || (date && !this.isDateValid(now, date))) {
            return { error: 'Invalid Date' };
        }
        return {
            utc: now.toUTCString(),
            unix: now.getTime(),
        };
    }
}
