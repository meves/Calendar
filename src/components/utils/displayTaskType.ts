import { TaskTypes } from "../Login/libs/enum"

export const displayTaskType = (type?: number) => {
    
    switch (type) {
        case 1:
            return TaskTypes.Current
        case 2:
            return TaskTypes.Important
        case 3:
            return TaskTypes.Urgent
    }
}