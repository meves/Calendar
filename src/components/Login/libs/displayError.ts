import { WRONG_DATE, WRONG_LOGIN, WRONG_PASSWORD, WRONG_TASK_DESCRIPTION, WRONG_TASK_NAME, WRONG_TYPE } from "./constants";
import { InputName } from "./types";

export const displayError = (inputName: InputName ) => {
    switch (inputName) {
        case 'login':
            return WRONG_LOGIN
        case 'password':
            return WRONG_PASSWORD
        case 'name':
            return WRONG_TASK_NAME
        case 'description':
            return WRONG_TASK_DESCRIPTION
        case 'date':
            return WRONG_DATE
        case 'type':
            return WRONG_TYPE
    }
}