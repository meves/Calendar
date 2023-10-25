import { dayDuration } from "./constants"

// возвращает дату в формате 'гггг-мм-дд'
export const generateDaysOfWeeks = (startDate: string, day: number) => {
    return new Date( 
                (new Date(startDate).getTime() + (day*dayDuration)) 
            ).toISOString()
            .slice(0, 10)
}