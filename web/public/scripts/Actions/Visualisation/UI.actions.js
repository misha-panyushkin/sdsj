export const VISUALISATION_UI_OPEN_SETTINGS = 'VISUALISATION_UI_OPEN_SETTINGS'
export const VISUALISATION_UI_CLOSE_SETTINGS = 'VISUALISATION_UI_CLOSE_SETTINGS'

import {
    filterTransactions,
} from 'Actions/Transactions.actions'

export function openSettings () {
    return {
        type: VISUALISATION_UI_OPEN_SETTINGS,
    }
}

export function closeSettings () {
    return (dispatch, getState) => {
        dispatch({
            type: VISUALISATION_UI_CLOSE_SETTINGS,
        })

        dispatch(filterTransactions({
            mccCodes: getState().VisualisationSettings.get('mccCodes').filter(code => code.get('checked')),
            transactionTypes: getState().VisualisationSettings.get('transactionTypes').filter(type => type.get('checked')),
        }))
    }
}