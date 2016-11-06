import './App.less'
import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _b from 'bem-cn'

class App extends Component {
    constructor (props) {
        super(props)
        this.boxClassName = 'App'
        this._b = _b(this.boxClassName)
    }

    render () {
        return (
            <section
                className={ this._b }>
                {this.props.children}
            </section>
        )
    }
}

export default connect(
    state => ({
    }),
    dispatch => ({
        
    })
)(App)