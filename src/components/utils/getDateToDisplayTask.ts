export const getDateToDisplayTask = (date?: string) => {    
    return `${date?.slice(-2)}.${date?.slice(5,7)}.${date?.slice(0,4)}`
}