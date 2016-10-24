import * as d3 from "d3"

export const VISUALISATION_UPDATE_TRANSACTION_TYPES = 'VISUALISATION_UPDATE_TRANSACTION_TYPES'
export const VISUALISATION_UPDATE_MCC_CODES = 'VISUALISATION_UPDATE_MCC_CODES'
export const VISUALISATION_SETTINGS_POPULATE = 'VISUALISATION_SETTINGS_POPULATE'

export function updateTransactionTypes ({
    updatedItems,
}) {
    return (dispatch, getState) => {
        dispatch({
            type: VISUALISATION_UPDATE_TRANSACTION_TYPES,
            updatedItems,
        })
    }
}

export function updateMccCodes ({
    updatedItems,
}) {
    return (dispatch, getState) => {
        dispatch({
            type: VISUALISATION_UPDATE_MCC_CODES,
            updatedItems,
        })
    }
}


export function populate ({
    transactionTypes,
            mccCodes,
}) {
    return (dispatch, getState) => {
        dispatch({
            type: VISUALISATION_SETTINGS_POPULATE,
            transactionTypes,
            mccCodes,
        })
    }
}