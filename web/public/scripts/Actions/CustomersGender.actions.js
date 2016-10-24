import * as d3 from "d3"

export const CUSTOMERS_GENDER_GET = 'CUSTOMERS_GENDER_GET'

export function getCustomersGender () {
    return (dispatch, getState) => {
        d3.csv('/data/customers_gender_train.csv', (error, data) => {
            dispatch({
                type: CUSTOMERS_GENDER_GET,
                data,
            })
        })
    }
}