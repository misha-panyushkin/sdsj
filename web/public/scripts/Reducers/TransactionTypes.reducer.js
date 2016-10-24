import I from 'immutable'
import APP_MOCKS from 'Mocks/App.mock'
import {
    TRANSACTION_TYPES_GET,
} from 'Actions/TransactionTypes.actions'
import {
    TRANSACTION_TYPES_BUY,
} from 'Consts/Consts'

const DEFAULT_STATE = APP_MOCKS.get('TRANSACTION_TYPES')

export default function TransactionTypes (state = DEFAULT_STATE, action) {
    let nextState = state
    let typesMap = {}
    
    switch (action.type) {
        case TRANSACTION_TYPES_GET:
            typesMap = I.Map()
            typesMap = action.data.reduce((map, d) => map.set(d.type, I.fromJS(d)), typesMap)
            nextState = nextState.setIn(['data', 'typesAll'], I.fromJS(action.data))
                .setIn(['generic', 'typesAll'], typesMap)
                .setIn(['generic', 'typesBuy'], typesMap.filter(d => TRANSACTION_TYPES_BUY.find(t => t == d.get('type'))))

            return nextState

        default:
            return nextState
    }
}