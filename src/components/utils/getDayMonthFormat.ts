export const getDayMonthFormat = (date: string) => {    
    return `${date.slice(-2)}.${date.slice(-5,-3)}`
}