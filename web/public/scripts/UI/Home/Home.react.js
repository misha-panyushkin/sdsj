import './Home.less'
import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _b from 'bem-cn'

import Demo from 'UI/Demo/Demo.react'

class Home extends Component {
    constructor (props) {
        super(props)
        this.boxClassName = 'Home'
        this._b = _b(this.boxClassName)
    }

    render () {
        return (
            <section
                className={ this._b }>
                <Demo/>
            </section>
        )
    }
}

export default connect(
    state => ({
    }),
    dispatch => ({
        
    })
)(Home)