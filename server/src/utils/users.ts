import { Role } from "../types/types"

const isString = (string: string): boolean => {
    return typeof string === 'string'
}
export const parseToString = (valueFromRequest: any): string => {
    if (!isString(valueFromRequest)) {
        throw new Error(`incorrect ${valueFromRequest} or missing value `)
    }
    return valueFromRequest;
}

const isRole = (param: any): boolean => {
    return (param === 'admin' || param === 'user')
}

export const parseRole = (roleFromRequest: any): Role => {
    if (!isString(roleFromRequest) || !isRole(roleFromRequest)) {
        throw new Error('Incorrect or missing Role')
    }
    return roleFromRequest
}