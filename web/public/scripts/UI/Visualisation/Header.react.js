import './Header.less'
import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _b from 'bem-cn'

import * as UIActions from 'Actions/Visualisation/UI.actions'

import FontAwsome from 'react-fontawesome'

class Header extends Component {
    constructor (props) {
        super(props)
        this.boxClassName = 'Header'
        this._b = _b(this.boxClassName)
    }

    render () {
        const hidden = this.props.VisualisationUI.getIn(['settings', 'visible'])
        
        return (
            <section
                className={ this._b }>
                <span 
                    className={ this._b('Label') }
                    >
                    SDSJ Dashboards
                </span>
                <FontAwsome 
                    name="cog" 
                    size="2x"
                    className={ this._b('OpenSettingsButton').state({ hidden }).toString() }
                    onClick={ () => this.handleSettingsOpen() }
                    />
            </section>
        )
    }

    handleSettingsOpen () {
        const {
            UIActions,
        } = this.props

        UIActions.openSettings()
    }
}

export default connect(
    state => ({
        VisualisationUI: state.VisualisationUI
    }),
    dispatch => ({
        UIActions: bindActionCreators(UIActions, dispatch),
    })
)(Header)