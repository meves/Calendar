import { dayDuration } from "./constants"
import { DayOfTheWeek } from "./types"

export const getStartEndDates = (date: Date) => {
    let startDate: Date = new Date()
    let endDate: Date = new Date()

    const currentDate = new Date(date.toISOString().slice(0, 10))
    const dayOfTheWeek: DayOfTheWeek = currentDate.getDay() as DayOfTheWeek
    
    switch (dayOfTheWeek) {
        case 0:
            endDate = currentDate
            startDate = new Date(currentDate.getTime() - dayDuration*6)
        break
        case 1:
            startDate = currentDate
            endDate = new Date(currentDate.getTime() + dayDuration*6)
        break
        default:
            startDate = new Date(currentDate.getTime() - dayDuration * (dayOfTheWeek-1))
            endDate = new Date(startDate.getTime() + dayDuration*6)
        break
    }

    return { 
        startDate: startDate.toISOString().slice(0, 10), 
        endDate: endDate.toISOString().slice(0, 10) 
    }
}