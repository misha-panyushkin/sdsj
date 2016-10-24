import * as d3 from "d3"

export const MCC_CODES_GET = 'MCC_CODES_GET'

import {
    populate as populateSettings
} from 'Actions/Visualisation/Settings.actions'

export function getMccCodes () {
    return (dispatch, getState) => {
        d3.csv('/data/mcc_codes.csv', codePrettifier, (error, data) => {
            dispatch({
                type: MCC_CODES_GET,
                data,
            })

            dispatch(populateSettings({
                mccCodes: getState().MccCodes.getIn(['data', 'codesAll']),
            }))
        })
    }
}

function codePrettifier (row) {
    const code = +row.mcc_code
    const description = row.mcc_description

    return {
        code,
        description,
    }
}