import { Routes } from 'Middleware/Routes'
import {
    API_CALL
} from 'Middleware/API'

export const MCC_CODES_REQUEST = 'MCC_CODES_REQUEST'
export const MCC_CODES_SUCCESS = 'MCC_CODES_SUCCESS'
export const MCC_CODES_FAILURE = 'MCC_CODES_FAILURE'

export function getMccCodes ({ search }) {
    return {
        [API_CALL]: {
            route: Routes.get('getMccCodes').set('search', search),
            types: [ MCC_CODES_REQUEST, MCC_CODES_SUCCESS, MCC_CODES_FAILURE ]
        }
    }
}