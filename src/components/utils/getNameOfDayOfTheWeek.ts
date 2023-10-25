export const getNameOfDayOfTheWeek = (date: string) => {
    
    switch (new Date(date).getDay()) {
        case 0:
            return 'Вс'
        case 1:
            return 'Пн'
        case 2:
            return 'Вт'
        case 3:
        return 'Ср'
        case 4:
        return 'Чт'
        case 5:
        return 'Пт'
        case 6:
        return 'Сб'
    }    
}