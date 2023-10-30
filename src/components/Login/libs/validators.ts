import { InputName } from "./types"

const RegExpLogin = /^.{1,25}$/
const RegExpPassword = /^.{6,30}$/
const RegExpTaskName = /^.{1,50}$/

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
        case 'type':
            return checkTypeValue(value)
        default:
            return true
    }
}