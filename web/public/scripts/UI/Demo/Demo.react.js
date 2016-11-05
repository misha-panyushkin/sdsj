import './Demo.less'
import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _b from 'bem-cn'

import SeasonsSeries from './SeasonsSeries/SeasonsSeries.react'
import Intro from './Intro/Intro.react'

class Demo extends Component {
    constructor (props) {
        super(props)
        this.boxClassName = 'Demo'
        this._b = _b(this.boxClassName)
    }

    render () {
        return (
            <section
                className={ this._b }>
                    <Intro/>
                    <SeasonsSeries />
            </section>
        )
    }
}

export default connect(
    state => ({
    }),
    dispatch => ({
        
    })
)(Demo)