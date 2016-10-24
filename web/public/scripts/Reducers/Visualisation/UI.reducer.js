import I from 'immutable'
import APP_MOCKS from 'Mocks/App.mock'

import {
    VISUALISATION_UI_OPEN_SETTINGS,
    VISUALISATION_UI_CLOSE_SETTINGS,
} from 'Actions/Visualisation/UI.actions'

const DEFAULT_STATE = APP_MOCKS.get('VISUALISATION_SETTINGS_UI')

export default function UI (state = DEFAULT_STATE, action) {
    let nextState = state
    
    switch (action.type) {

        case VISUALISATION_UI_OPEN_SETTINGS:
            nextState = nextState.setIn(['settings', 'visible'], true)
            return nextState

        case VISUALISATION_UI_CLOSE_SETTINGS:
            nextState = nextState.setIn(['settings', 'visible'], false)
            return nextState

        default:
            return nextState
    }
}