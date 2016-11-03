import I from 'immutable'
import APP_MOCKS from 'Mocks/App.mock'

import {
    BY_MONTHS_SORT,
    BY_MONTHS_HOVER_COORDINATES,
    BY_MONTHS_SELECTED_COORDINATES,
} from 'Actions/Demo/SeasonsSeries/ByMonths.actions'

const DEFAULT_STATE = APP_MOCKS.getIn(['DEMO', 'SEASONS_SERIES_BY_MONTHS'])

export default function ByMonthsUI (state = DEFAULT_STATE, action) {
    let nextState = state
    
    switch (action.type) {

        
        case BY_MONTHS_SORT:
            nextState = nextState.setIn(['ui', 'sort', action.axis, 'order'], action.order)
            return nextState

        
        case BY_MONTHS_HOVER_COORDINATES:
            
            if (!isNaN(action.x)) {
                nextState = nextState.setIn(['ui', 'hover', 'x'], action.x)
            } else {
                nextState = nextState.deleteIn(['ui', 'hover', 'x'])
            }
            
            if (!isNaN(action.y)) {
                nextState = nextState.setIn(['ui', 'hover', 'y'], action.y)
            } else {
                nextState = nextState.deleteIn(['ui', 'hover', 'y'])
            }

            return nextState

        
        case BY_MONTHS_SELECTED_COORDINATES:
            
            if (!isNaN(action.x)) {
                nextState = nextState.setIn(['ui', 'selected', 'x'], action.x)
            } else {
                nextState = nextState.deleteIn(['ui', 'selected', 'x'])
            }
            
            if (!isNaN(action.y)) {
                nextState = nextState.setIn(['ui', 'selected', 'y'], action.y)
            } else {
                nextState = nextState.deleteIn(['ui', 'selected', 'y'])
            }

            return nextState

        default:
            return nextState
    }
}