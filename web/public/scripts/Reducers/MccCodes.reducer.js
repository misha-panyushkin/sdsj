import I from 'immutable'
import APP_MOCKS from 'Mocks/App.mock'
import {
    MCC_CODES_GET,
} from 'Actions/MccCodes.actions'
import {
    MCC_CODES_TOUR_PACKAGE,
} from 'Consts/Consts'

const DEFAULT_STATE = APP_MOCKS.get('MCC_CODES')

export default function MccCodes (state = DEFAULT_STATE, action) {
    let nextState = state
    let codesMap = {}
    
    switch (action.type) {
        case MCC_CODES_GET:
            codesMap = I.Map()
            codesMap = action.data.reduce((map, d) => map.set(d.code, I.fromJS(d)), codesMap)
            
            nextState = nextState.setIn(['data', 'codesAll'], I.fromJS(action.data))
                .setIn(['generic', 'codesAll'], codesMap)
                .setIn(['generic', 'codesTourPackage'], codesMap.filter(d => MCC_CODES_TOUR_PACKAGE.find(c => c == d.get('code'))))

            return nextState

        default:
            return nextState
    }
}