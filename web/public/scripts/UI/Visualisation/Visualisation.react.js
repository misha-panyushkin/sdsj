import './Visualisation.less'
import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _b from 'bem-cn'
import * as d3 from "d3"

import D3Data, {
    Brush as D3Brush,
    DataHub as D3DataHub,
} from './Visualisation.d3'

import * as TransactionsActions from 'Actions/Transactions.actions'

class Visualisation extends Component {
    constructor (props) {
        super(props)
        this.boxClassName = 'Visualisation'
        this._b = _b(this.boxClassName)
    }

    render () {
        const {
            visible
        } = this.props
        
        return (
            <section
                className={ this._b.state({ visible }) }>
                <svg className={ this._b('svg') } ref="income" width={ window.innerWidth - 50 } height="245"/>
                <svg className={ this._b('svg') } ref="expense" width={ window.innerWidth - 50 } height="245"/>
                <svg className={ this._b('svg') } ref="budget" width={ window.innerWidth - 50 } height="245"/>
                <svg className={ this._b('svg') } ref="brush" width={ window.innerWidth - 50 } height="65"/>
            </section>
        )
    }

    componentDidMount () {
        this._d3Data = {}
        
        this._d3Data.Income = new D3Data(this.refs.income, D3DataHub)
        this._d3Data.Expense = new D3Data(this.refs.expense, D3DataHub)
        this._d3Data.Budget = new D3Data(this.refs.budget, D3DataHub)
        this._d3Data.Brush = new D3Brush(this.refs.brush, D3DataHub)
    }

    shouldComponentUpdate (nextProps, nextState) {
        return nextProps.shouldUpdate || this.props.visible != nextProps.visible
    }

    componentDidUpdate () {
        const {
            visible,
            shouldUpdate,
        } = this.props
        visible && shouldUpdate && this.handleDataUpdate()

        const {
            TransactionsActions,
        } = this.props
        if (shouldUpdate) {
            TransactionsActions.setTransactionsShouldUpdateFlag({
                shouldUpdate: false
            })
        }
    }

    handleDataUpdate () {
        const {
            customersList,
        } = this.props
        
        console.log('customersList.length', customersList.length)
        
        if (customersList && customersList.length) {
            this._d3Data.Income.update(customersList.map(c => c.income))
            this._d3Data.Expense.update(customersList.map(c => c.expense))
            this._d3Data.Budget.update(customersList.map(c => c.budget))
            this._d3Data.Brush.update(customersList.map(c => c.budget))
        }
    }
}

export default connect(
    state => ({
        customersList: state.Transactions.getIn(['generic', 'customersList']).toJS(),
        shouldUpdate: !!state.Transactions.getIn(['state', 'shouldUpdate']),
    }),
    dispatch => ({
        TransactionsActions: bindActionCreators(TransactionsActions, dispatch)
    })
)(Visualisation)