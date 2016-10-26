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
            weekDays,
        } = this.props
        
        const income = customersList.map(c => c.get('income'))
        const expense = customersList.map(c => c.get('expense'))
        const budget = customersList.map(c => c.get('budget'))
        debugger
        return (
            <section
                className={ this._b.state({ visible }) }>

                <LineChart {...this.props} D3DataHub={ this.D3DataHub } dataList={ income.toJS() } />
                <AreaStackedChart {...this.props} D3DataHub={ this.D3DataHub } dataList={ income.toJS() } />
                <BarChart {...this.props} D3DataHub={ this.D3DataHub } dataList={ income.toJS() } />
                
                <Brush {...this.props} D3DataHub={ this.D3DataHub } dataList={ income.toJS() } />

            </section>
        )

        // <WeekDays data={ weekDays.toJS() }/>
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
        weekDays: state.Transactions.getIn(['generic', 'weekDays']),
        shouldUpdate: !!state.Transactions.getIn(['state', 'shouldUpdate']),
    }),
    dispatch => ({
        TransactionsActions: bindActionCreators(TransactionsActions, dispatch)
    })
)(Visualisation)