import { generateDaysOfWeeks } from "./generateDaysOfWeeks"
import { getDayMonthFormat } from "./getDayMonthFormat"

export const isCurrentDate = (currentDate: Date, startDate: string, day: number) => {
    const date = new Date(currentDate).toISOString().slice(0, 10)
    return getDayMonthFormat(date) === getDayMonthFormat(generateDaysOfWeeks(startDate, day))
}