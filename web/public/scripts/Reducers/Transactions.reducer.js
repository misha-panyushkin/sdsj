import I from 'immutable'
import APP_MOCKS from 'Mocks/App.mock'
import {
    TRANSACTIONS_GET,
    TRANSACTIONS_FILTER,
    TRANSACTIONS_SHOULD_UPDATE,
} from 'Actions/Transactions.actions'

const DEFAULT_STATE = APP_MOCKS.get('TRANSACTIONS')

export default function Transactions (state = DEFAULT_STATE, action) {
    let nextState = state
    let customersMap, customersList
    
    switch (action.type) {

        case TRANSACTIONS_GET:
            customersMap = {}
            customersList = []
            nextState = nextState.setIn(['data', 'transactions'], I.fromJS(action.data))
            nextState.getIn(['data', 'transactions']).forEach(data => {
                const customer = customersMap[data.get('customer_id')] || new Customer(data.get('customer_id'))
                customer.setData(data)
                customersMap[data.get('customer_id')] = customer
            })

            for (var i in customersMap) {
                customersList.push(customersMap[i])
            }

            nextState = nextState.setIn(['generic', 'customersList'], I.fromJS(customersList))
            nextState = nextState.setIn(['state', 'shouldUpdate'], true)

            return nextState

        case TRANSACTIONS_FILTER:
            customersMap = {}
            customersList = []
            nextState.getIn(['data', 'transactions']).forEach(data => {
                const customer = customersMap[data.get('customer_id')] || new Customer(data.get('customer_id'))
                customer.setData(data, action.filter)
                customersMap[data.get('customer_id')] = customer
            })

            for (var i in customersMap) {
                customersList.push(customersMap[i])
            }

            nextState = nextState.setIn(['generic', 'customersList'], I.fromJS(customersList))
            nextState = nextState.setIn(['state', 'shouldUpdate'], true)

            return nextState

        case TRANSACTIONS_SHOULD_UPDATE:
            nextState = nextState.setIn(['state', 'shouldUpdate'], action.shouldUpdate)
            return nextState

        default:
            return nextState
    }
}

class Point {
    constructor (x, y) {
        Object.assign(this, {
            x,
            y,
        })
    }
}

class Customer {
    constructor (id) {
        Object.assign(this, {
            id,
            income: {
                id,
                points: [],
                total: 0,
            },
            expense: {
                id,
                points: [],
                total: 0,
            },
            budget: {
                id,
                points: [],
                total: 0,
            },

            currentIndex: -1,
        })
    }

    setData (data, filter) {
        const daysDiff = data.get('day') - this.currentIndex

        for (var day = 0; day < daysDiff; day++) {
            this.currentIndex++
            this.addPoint()
            this.calculateValues(0)
        }

        if (this.validationCheck(data, filter)) 
            this.calculateValues(data.get('amount'))
    }

    validationCheck (data, filter) {
        if (!filter)
            return true

        const codes = filter.mccCodes
        if (codes && codes.size && !codes.find(d => d.get('code') == data.get('mcc_code')))
            return false

        const types = filter.transactionTypes
        if (types && types.size && !types.find(d => d.get('type') == data.get('tr_type')))
            return false

        return true
    }

    addPoint () {
        this.income.points.push(new Point(this.currentIndex, 0))
        this.expense.points.push(new Point(this.currentIndex, 0))
        this.budget.points.push(new Point(this.currentIndex, 0))
    }

    calculateValues (value) {
        if (value > 0) {
            this.income.points[this.currentIndex].y += value
            this.income.total += value
        
        } else if (value < 0) {
            this.expense.points[this.currentIndex].y += value
            this.expense.total += value
        }

        this.budget.points[this.currentIndex].y = this.income.total + this.expense.total
    }
}