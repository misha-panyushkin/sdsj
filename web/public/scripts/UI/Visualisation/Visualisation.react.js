import './Visualisation.less'
import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _b from 'bem-cn'
import * as d3 from "d3"

import {
    DataHub,

    WeekDays,
    LineChart,
    AreaStackedChart,
    BarChart,

    Brush,
} from './VisualComponents'

import * as TransactionsActions from 'Actions/Transactions.actions'

class Visualisation extends Component {
    constructor (props) {
        super(props)
        this.boxClassName = 'Visualisation'
        this._b = _b(this.boxClassName)
        this.D3DataHub = new DataHub()
    }

    render () {
        const {
            visible,
            customersList,
            weekDaysIncomes,
        } = this.props
        
        const income = customersList.map(c => c.get('income'))
        const expense = customersList.map(c => c.get('expense'))
        const budget = customersList.map(c => c.get('budget'))
        
        return (
            <section
                className={ this._b.state({ visible }) }>

                <LineChart {...this.props} D3DataHub={ this.D3DataHub } dataList={ expense.toJS() } />
                <AreaStackedChart {...this.props} D3DataHub={ this.D3DataHub } dataList={ expense.toJS() } />
                <BarChart {...this.props} D3DataHub={ this.D3DataHub } dataList={ expense.toJS() } />
                
                <Brush {...this.props} D3DataHub={ this.D3DataHub } dataList={ expense.toJS() } />

                <WeekDays data={ weekDaysIncomes.toJS() }/>

            </section>
        )
    }

    shouldComponentUpdate (nextProps, nextState) {
        return nextProps.shouldUpdate || this.props.visible != nextProps.visible
    }

    componentDidUpdate () {
        const {
            shouldUpdate,
            TransactionsActions,
        } = this.props

        if (shouldUpdate) {
            TransactionsActions.setTransactionsShouldUpdateFlag({
                shouldUpdate: false
            })
        }
    }
}

export default connect(
    state => ({
        customersList: state.Transactions.getIn(['generic', 'customersList']),
        weekDaysIncomes: state.Transactions.getIn(['generic', 'weekDaysIncomes']),
        shouldUpdate: !!state.Transactions.getIn(['state', 'shouldUpdate']),
    }),
    dispatch => ({
        TransactionsActions: bindActionCreators(TransactionsActions, dispatch)
    })
)(Visualisation)