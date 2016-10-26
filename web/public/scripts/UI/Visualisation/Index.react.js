import './Index.less'
import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _b from 'bem-cn'

import * as TransactionsActions from 'Actions/Transactions.actions'
import * as TransactionTypesActions from 'Actions/TransactionTypes.actions'
import * as MccCodesActions from 'Actions/MccCodes.actions'

import Visualisation from './Visualisation.react'
import Settings from './Settings.react'
import Header from './Header.react'
import FontAwsome from 'react-fontawesome'

class Index extends Component {
    constructor (props) {
        super(props)
        this.boxClassName = 'Index'
        this._b = _b(this.boxClassName)
    }

    render () {
        const isSettingsVisible = this.props.VisualisationUI.getIn(['settings', 'visible'])
        
        return (
            <section
                className={this._b}>

                <Header />
                <Visualisation visible={ !isSettingsVisible } />
                <Settings visible={ isSettingsVisible }/>
            </section>
        )
    }

    componentDidMount () {
        const {
            TransactionsActions,
            TransactionTypesActions,
            MccCodesActions,
        } = this.props

        TransactionTypesActions.getTransactionTypes()
        MccCodesActions.getMccCodes()
        TransactionsActions.getTransactions()
    }
}

export default connect(
    state => ({
        VisualisationUI: state.VisualisationUI
    }),
    dispatch => ({
        TransactionsActions: bindActionCreators(TransactionsActions, dispatch),
        TransactionTypesActions: bindActionCreators(TransactionTypesActions, dispatch),
        MccCodesActions: bindActionCreators(MccCodesActions, dispatch),
    })
)(Index)