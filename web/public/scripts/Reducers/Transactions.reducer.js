import I from 'immutable'
import APP_MOCKS from 'Mocks/App.mock'
import {
    TRANSACTIONS_GET,
    TRANSACTIONS_FILTER,
    TRANSACTIONS_SHOULD_UPDATE,
} from 'Actions/Transactions.actions'

import WeekDaysTransactionCalculator from 'Helpers/WeekDaysTransactionCalculator'
import CustomerDataCalculator from 'Helpers/CustomerDataCalculator'

const DEFAULT_STATE = APP_MOCKS.get('TRANSACTIONS')

export default function Transactions (state = DEFAULT_STATE, action) {
    let nextState = state
    let customersMap, customersList, WDTC
    
    switch (action.type) {

        case TRANSACTIONS_GET:
            customersMap = {}
            customersList = []
            nextState = nextState.setIn(['data', 'transactions'], I.fromJS(action.data))

            WDTC = new WeekDaysTransactionCalculator(4)
            
            nextState.getIn(['data', 'transactions']).forEach(data => {

                WDTC.addTransaction(data)

                const customer = customersMap[data.get('customer_id')] || new CustomerDataCalculator(data.get('customer_id'))
                customer.setData(data)
                customersMap[data.get('customer_id')] = customer
            })

            for (var i in customersMap) {
                customersList.push(customersMap[i].getRowData())
            }

            nextState = nextState.setIn(['generic', 'customersList'], I.fromJS(customersList))
            nextState = nextState.setIn(['generic', 'weekDaysIncomes'], I.fromJS(WDTC.getRowData({
                dataType: 'expenses',
            })))
            nextState = nextState.setIn(['state', 'shouldUpdate'], true)

            return nextState

        case TRANSACTIONS_FILTER:
            customersMap = {}
            customersList = []

            WDTC = new WeekDaysTransactionCalculator(4)

            nextState.getIn(['data', 'transactions']).forEach(data => {

                WDTC.addTransaction(data, action.filter)

                const customer = customersMap[data.get('customer_id')] || new CustomerDataCalculator(data.get('customer_id'))
                customer.setData(data, action.filter)
                customersMap[data.get('customer_id')] = customer
            })

            for (var i in customersMap) {
                customersList.push(customersMap[i].getRowData())
            }


            nextState = nextState.setIn(['generic', 'customersList'], I.fromJS(customersList))
            nextState = nextState.setIn(['generic', 'weekDaysIncomes'], I.fromJS(WDTC.getRowData({
                dataType: 'expenses',
            })))
            nextState = nextState.setIn(['state', 'shouldUpdate'], true)

            return nextState

        case TRANSACTIONS_SHOULD_UPDATE:
            nextState = nextState.setIn(['state', 'shouldUpdate'], action.shouldUpdate)
            return nextState

        default:
            return nextState
    }
}