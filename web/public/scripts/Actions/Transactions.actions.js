import * as d3 from "d3"

export const TRANSACTIONS_GET = 'TRANSACTIONS_GET'
export const TRANSACTIONS_FILTER = 'TRANSACTIONS_FILTER'
export const TRANSACTIONS_SHOULD_UPDATE = 'TRANSACTIONS_SHOULD_UPDATE'

export function getTransactions () {
    return (dispatch, getState) => {
        d3.csv('/data/xab.csv', typePrettifier, (error, data) => {
            dispatch({
                type: TRANSACTIONS_GET,
                data,
            })
        })
    }
}

function typePrettifier (row) {
    const datetime = row.tr_datetime.split(' ')
    const day = +datetime[0]
    const time = datetime[1]
    const amount = +row.amount

    return Object.assign(row, {
        day,
        time,
        amount,
    })
}

export function filterTransactions ({ 
            mccCodes,
    transactionTypes,
}) {
    console.log('mccCodes.size', mccCodes.size)
    console.log('transactionTypes.size', transactionTypes.size)
   return {
        type: TRANSACTIONS_FILTER,
        filter: {
            mccCodes,
            transactionTypes,
        },
    }
}

export function setTransactionsShouldUpdateFlag ({ shouldUpdate }) {
    return {
        type: TRANSACTIONS_SHOULD_UPDATE,
        shouldUpdate,
    }
}