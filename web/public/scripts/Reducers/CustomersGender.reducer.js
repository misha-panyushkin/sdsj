import I from 'immutable'
import APP_MOCKS from 'Mocks/App.mock'
import {
    CUSTOMERS_GENDER_GET,
} from 'Actions/CustomersGender.actions'

const DEFAULT_STATE = APP_MOCKS.get('CUSTOMERS_GENDER')

export default function Transactions (state = DEFAULT_STATE, action) {
    let nextState = state
    let customersMap = {}
    let customersGenderList = []
    
    switch (action.type) {

        case CUSTOMERS_GENDER_GET:
            customersMap = {}
            action.data.forEach(row => {
                if (!customersMap[row.customer_id]) {
                    customersGenderList.push({
                        id: row.customer_id,
                        gender: row.gender,
                    })
                }
            })

            nextState = nextState.setIn(['generic', 'customersGenderList'], I.fromJS(customersGenderList))
            return nextState

        default:
            return nextState
    }
}