import './Settings.less'
import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _b from 'bem-cn'

import * as SettingsActions from 'Actions/Visualisation/Settings.actions'
import * as UIActions from 'Actions/Visualisation/UI.actions'

import FontAwsome from 'react-fontawesome'

class Settings extends Component {
    constructor (props) {
        super(props)
        this.boxClassName = 'Settings'
        this._b = _b(this.boxClassName)
    }

    render () {
        const {
            visible
        } = this.props

        return (
            <section
                className={this._b.state({ visible })}>
                <Controls className={ this._b('Controls') }/>
                <ItemsList items={ this.props.transactionTypes } handleChange={ (...args) => this.handleTransactionTypesChange(...args) }/>
                <ItemsList items={ this.props.mccCodes } handleChange={ (...args) => this.handleMccCodesChange(...args) }/>
                <FontAwsome 
                    name="close" 
                    size="2x"
                    className={ this._b('CloseButton').toString() }
                    onClick={ () => this.handleSettingsClose() }
                    />
            </section>
        )
    }

    handleSettingsClose () {
        const {
            UIActions,
        } = this.props

        UIActions.closeSettings()
    }

    handleTransactionTypesChange (item4Update, isChecked) {
        const {
            SettingsActions,
        } = this.props

        SettingsActions.updateTransactionTypes({
            updatedItems: [item4Update.set('checked', isChecked)]
        })
    }

    handleMccCodesChange (item4Update, isChecked) {
        const {
            SettingsActions,
        } = this.props

        SettingsActions.updateMccCodes({
            updatedItems: [item4Update.set('checked', isChecked)]
        })
    }
}

export default connect(
    state => ({
        transactionTypes: state.VisualisationSettings.get('transactionTypes').sortBy(t => !t.get('checked')),
        mccCodes: state.VisualisationSettings.get('mccCodes').sortBy(c => !c.get('checked')),
    }),
    dispatch => ({
        SettingsActions: bindActionCreators(SettingsActions, dispatch),
        UIActions: bindActionCreators(UIActions, dispatch),
    })
)(Settings)


class __Controls extends Component {
    constructor (props) {
        super(props)
        this.boxClassName = 'Controls'
        this._b = _b(this.boxClassName)
    }

    render () {
        return (
            <div className={ this._b.mix(this.props.className) }>
                <div 
                    className={ this._b('CustomFilterButtom').mix('AddAllTypes') }
                    onClick={ () => this.handleAddAllTypes() }
                    >
                    add all types
                </div>
                <div 
                    className={ this._b('CustomFilterButtom').mix('RemoveAllTypes') }
                    onClick={ () => this.handleRemoveAllTypes() }
                    >
                    remove all types
                </div>
                <div 
                    className={ this._b('CustomFilterButtom').mix('AddBuyTypes') }
                    onClick={ () => this.handleAddBuyTypes() }
                    >
                    add buy types
                </div>

                <div 
                    className={ this._b('CustomFilterButtom').mix('AddAllCodes') }
                    onClick={ () => this.handleAddAllCodes() }
                    >
                    add all codes
                </div>
                <div 
                    className={ this._b('CustomFilterButtom').mix('RemoveAllCodes') }
                    onClick={ () => this.handleRemoveAllCodes() }
                    >
                    remove all codes
                </div>
                <div 
                    className={ this._b('CustomFilterButtom').mix('AddTourPackageCodes') }
                    onClick={ () => this.handleAddTourPackageCodes() }
                    >
                    add tour package codes
                </div>
            </div>
        )
    }

    handleAddAllTypes () {
        const {
            SettingsActions,
            transactionTypes,
        } = this.props

        SettingsActions.updateTransactionTypes({
            updatedItems: transactionTypes.map(type => type.set('checked', true))
        })
    }

    handleRemoveAllTypes () {
        const {
            SettingsActions,
            transactionTypes,
        } = this.props

        SettingsActions.updateTransactionTypes({
            updatedItems: transactionTypes.map(type => type.set('checked', false))
        })
    }

    handleAddBuyTypes () {
        const {
            SettingsActions,
            transactionTypes,
            transactionTypesBuy,
        } = this.props

        SettingsActions.updateTransactionTypes({
            updatedItems: transactionTypesBuy.map(type => type.set('checked', true).set('label', type.get('description')))
        })
    }

    handleAddAllCodes () {
        const {
            SettingsActions,
            mccCodes,
        } = this.props

        SettingsActions.updateMccCodes({
            updatedItems: mccCodes.map(code => code.set('checked', true))
        })
    }

    handleRemoveAllCodes () {
        const {
            SettingsActions,
            mccCodes,
        } = this.props

        SettingsActions.updateMccCodes({
            updatedItems: mccCodes.map(code => code.set('checked', false))
        })
    }

    handleAddTourPackageCodes () {
        const {
            SettingsActions,
            mccCodes,
            mccCodesTourPackage,
        } = this.props

        SettingsActions.updateMccCodes({
            updatedItems: mccCodesTourPackage.map(code => code.set('checked', true).set('label', code.get('description')))
        })
    }
}

const Controls = connect(
    state => ({
        transactionTypes: state.VisualisationSettings.get('transactionTypes'),
        mccCodes: state.VisualisationSettings.get('mccCodes'),
        transactionTypesBuy: state.TransactionTypes.getIn(['generic', 'typesBuy']),
        mccCodesTourPackage: state.MccCodes.getIn(['generic', 'codesTourPackage']),
    }),
    dispatch => ({
        SettingsActions: bindActionCreators(SettingsActions, dispatch),
    })
)(__Controls)


class ItemsList extends Component {
    constructor (props) {
        super(props)
        this.boxClassName = 'ItemsList'
        this._b = _b(this.boxClassName)
    }

    render () {
        return (
            <ul
                className={this._b}>
                { this.props.items.map((...args) => this.renderItem(...args)) }
            </ul>
        )
    }

    renderItem (item, index) {
        return (
            <li 
                key={ index }
                className={ this._b('Item') }
                >
                <Checkbox                 
                    checked={ item.get('checked') } 
                    label={ item.get('label') } 
                    onChange={ (...args) => this.props.handleChange(item, ...args) }
                    />
            </li>
        )
    }
}

class Checkbox extends Component {
    constructor (props) {
        super(props)
        this.boxClassName = 'Checkbox'
        this._b = _b(this.boxClassName)
    }

    render () {
        const id = Math.floor(Math.random()*1e20)
        return (
            <div className={ this._b }>
                <input className={ this._b('Input') } type="checkbox" id={ id } checked={ this.props.checked } onChange={ (...args) => this.handleChange(...args) }/>
                <label className={ this._b('Label') } htmlFor={ id }>{ this.props.label }</label>
            </div>
        )
    }

    handleChange (event) {
        this.props.onChange(event.target.checked)
        console.log('Checkbox :: event.target.checked', event.target.checked)
    }
}