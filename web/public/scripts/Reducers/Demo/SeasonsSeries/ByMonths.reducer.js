import I from 'immutable'
import APP_MOCKS from 'Mocks/App.mock'

import {
    BY_MONTHS_SORT,
} from 'Actions/Demo/SeasonsSeries/ByMonths.actions'

const DEFAULT_STATE = APP_MOCKS.getIn(['DEMO', 'SEASONS_SERIES_BY_MONTHS'])

export default function ByMonthsUI (state = DEFAULT_STATE, action) {
    let nextState = state
    
    switch (action.type) {

        case BY_MONTHS_SORT:
            nextState = nextState.setIn(['ui', 'sort', action.axis, 'order'], action.order)
            return nextState

        default:
            return nextState
    }
}