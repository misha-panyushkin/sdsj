import * as d3 from "d3"

export const TRANSACTION_TYPES_GET = 'TRANSACTION_TYPES_GET'

import {
    populate as populateSettings
} from 'Actions/Visualisation/Settings.actions'

export function getTransactionTypes () {
    return (dispatch, getState) => {
        d3.csv('/data/transaction_types.csv', typePrettifier, (error, data) => {
            dispatch({
                type: TRANSACTION_TYPES_GET,
                data,
            })

            dispatch(populateSettings({
                transactionTypes: getState().TransactionTypes.getIn(['data', 'typesAll']),
            }))
        })
    }
}

function typePrettifier (row) {
    const type = +row.tr_type
    const description = row.tr_description

    return {
        type,
        description,
    }
}