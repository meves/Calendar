import { InputName } from "./types"

const RegExpLogin = /^.{1,25}$/
const RegExpPassword = /^.{6,30}$/
const RegExpTaskName = /^.{1,30}$/
const RegExpTaskDescription = /^.{1,200}$/

const startDate = new Date('2023-01-01')
const endDate = new Date('2023-12-31')

const checkDate = (value: string) => {
    const currentDate = new Date(value)    
    return startDate <= currentDate && currentDate <= endDate
}

const startTypeValue = 1
const endTypeValue = 3

const checkTypeValue = (value: string) => {
    const currentTypeValue = Number(value)
    return startTypeValue <= Number(value) && Number(value) <= endTypeValue
}

export const validate = (type: InputName, value: string) => {
    switch (type) {
        case 'login':
            return RegExpLogin.test(value)
        case 'password':
            return RegExpPassword.test(value)
        case 'name':
            return RegExpTaskName.test(value)
        case 'description':
            return RegExpTaskDescription.test(value)
        case 'date':
            return checkDate(value)
        case 'type':
            return checkTypeValue(value)
        default:
            return true
    }
}