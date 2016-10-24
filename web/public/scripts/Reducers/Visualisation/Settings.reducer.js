import I from 'immutable'
import APP_MOCKS from 'Mocks/App.mock'
import {
    VISUALISATION_UPDATE_TRANSACTION_TYPES,
    VISUALISATION_UPDATE_MCC_CODES,
    VISUALISATION_SETTINGS_POPULATE,
} from 'Actions/Visualisation/Settings.actions'

const DEFAULT_STATE = APP_MOCKS.get('VISUALISATION_SETTINGS')

export default function Settings (state = DEFAULT_STATE, action) {
    let nextState = state
    
    switch (action.type) {

        case VISUALISATION_UPDATE_TRANSACTION_TYPES:
            action.updatedItems.forEach(item => {
                const nextItemEntry = nextState.get('transactionTypes').findEntry(i => i.get('type') == item.get('type'))
                if (nextItemEntry) {
                    nextState = nextState.setIn(['transactionTypes', nextItemEntry[0]], item)
                }
            })
            return nextState

        case VISUALISATION_UPDATE_MCC_CODES:
            action.updatedItems.forEach(item => {
                const nextItemEntry = nextState.get('mccCodes').findEntry(i => i.get('code') == item.get('code'))
                if (nextItemEntry) {
                    nextState = nextState.setIn(['mccCodes', nextItemEntry[0]], item)
                }
            })
            return nextState

        case VISUALISATION_SETTINGS_POPULATE:
            if (action.transactionTypes) {
                nextState = nextState.set('transactionTypes', action.transactionTypes.map(type => {
                    type = type.set('label', type.get('description'))
                    type = type.set('checked', type.get('checked') || false)
                    return type
                }))
            }

            if (action.mccCodes) {
                nextState = nextState.set('mccCodes', action.mccCodes.map(code => {
                    code = code.set('label', code.get('description'))
                    code = code.set('checked', code.get('checked') || false)
                    return code
                }))
            }

            return nextState

        default:
            return nextState
    }
}