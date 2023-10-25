export const saveToLocalStorage = (name: string, data: any): void => {
    localStorage.setItem(name, JSON.stringify(data))
}

export function getFromLocalStorage<T>(name: string): T | null {
    const data = localStorage.getItem(name)
    if (data) {
        return JSON.parse(data) as T
    }
    return null
}

export const deleteFromLocalStorage = (name: string): boolean => {
    const data = localStorage.getItem(name)
    if (data) {
        localStorage.removeItem(name)
        return true
    }
    return false
}