import I from 'immutable'
import APP_MOCKS from 'Mocks/App.mock'

import {
    BY_WEEKS_SORT,
    BY_WEEKS_HOVER_COORDINATES,
} from 'Actions/Demo/SeasonsSeries/ByWeeks.actions'

const DEFAULT_STATE = APP_MOCKS.getIn(['DEMO', 'SEASONS_SERIES_BY_WEEKS'])

export default function ByWeeksUI (state = DEFAULT_STATE, action) {
    let nextState = state
    
    switch (action.type) {

        case BY_WEEKS_SORT:
            nextState = nextState.setIn(['ui', 'sort', action.axis, 'order'], action.order)
            return nextState

        case BY_WEEKS_HOVER_COORDINATES:
            
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

        default:
            return nextState
    }
}