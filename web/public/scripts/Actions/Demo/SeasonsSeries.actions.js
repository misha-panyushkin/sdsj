import { Routes } from 'Middleware/Routes'
import {
    API_CALL
} from 'Middleware/API'

export const SEASONS_SERIES_REQUEST = 'SEASONS_SERIES_REQUEST'
export const SEASONS_SERIES_SUCCESS = 'SEASONS_SERIES_SUCCESS'
export const SEASONS_SERIES_FAILURE = 'SEASONS_SERIES_FAILURE'

export function getSeasonsSeries ({ search }) {
    return {
        [API_CALL]: {
            route: Routes.get('getSeasonsSeries').set('search', search),
            types: [ SEASONS_SERIES_REQUEST, SEASONS_SERIES_SUCCESS, SEASONS_SERIES_FAILURE ]
        }
    }
}