import I from 'immutable'
import APP_MOCKS from 'Mocks/App.mock'

import {
    SEASONS_SERIES_REQUEST,
    SEASONS_SERIES_SUCCESS,
    SEASONS_SERIES_FAILURE,
} from 'Actions/Demo/SeasonsSeries.actions'

const DEFAULT_STATE = APP_MOCKS.getIn(['DEMO', 'SEASONS_SERIES'])

export default function UI (state = DEFAULT_STATE, action) {
    let nextState = state
    
    switch (action.type) {

        case SEASONS_SERIES_REQUEST:
            nextState = nextState.setIn(['state', 'process'], nextState.getIn(['consts', 'PROCESS']))
            return nextState

        case SEASONS_SERIES_SUCCESS:
            nextState = nextState.deleteIn(['state', 'process'])
            nextState = nextState.setIn(['data', 'series'], I.fromJS(action.response.data.series))
            return nextState

        case SEASONS_SERIES_FAILURE:
            nextState = nextState.deleteIn(['state', 'process'])
            return nextState

        default:
            return nextState
    }
}