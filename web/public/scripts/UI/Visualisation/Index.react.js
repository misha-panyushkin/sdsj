import './Index.less'
import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _b from 'bem-cn'

import * as TransactionsActions from 'Actions/Transactions.actions'
import * as TransactionTypesActions from 'Actions/TransactionTypes.actions'
import * as MccCodesActions from 'Actions/MccCodes.actions'
import * as UIActions from 'Actions/Visualisation/UI.actions'

import Visualisation from './Visualisation.react'
import Settings from './Settings.react'
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
                <Visualisation visible={ !isSettingsVisible } />
                <Settings visible={ isSettingsVisible }/>
                { isSettingsVisible 
                    ? null
                    : <FontAwsome 
                        name="cog" 
                        size="2x"
                        className={ this._b('OpenSettingsButton').toString() }
                        onClick={ () => this.handleSettingsOpen() }
                        />
                }
            </section>
        )
    }

    handleSettingsOpen () {
        const {
            UIActions,
        } = this.props

        UIActions.openSettings()
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
        UIActions: bindActionCreators(UIActions, dispatch),
    })
)(Index)