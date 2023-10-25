export const getFullNameOfWeekDay = (date?: string) => {
    
    if (date) {
        switch (new Date(date).getDay()) {
            case 0:
                return 'Воскресенье'
            case 1:
                return 'Понедельник'
            case 2:
                return 'Вторник'
            case 3:
            return 'Среда'
            case 4:
            return 'Четверг'
            case 5:
            return 'Пятница'
            case 6:
            return 'Суббота'
        }
    }
}