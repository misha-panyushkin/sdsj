import './WeekDays.less'
import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _b from 'bem-cn'

import D3WeekDays from './WeekDays.d3'

export default class WeekDays extends Component {
    constructor (props) {
        super(props)
        this.boxClassName = 'WeekDays'
        this._b = _b(this.boxClassName)
    }

    render () {
        return (
            <div className={ this._b }>
                <svg className={ this._b('SVG') } ref="svg" width={ window.innerWidth - 300 } height={ 400 } />
                <aside  className={ this._b('Aside') }></aside>
            </div>
        )
    }

    componentDidMount () {
        this.handleUpdate()
    }

    componentDidUpdate () {
        this.handleUpdate()
    }

    handleUpdate () {
        const {
            data,
            D3DataHub,
        } = this.props
        
        if (data && data.length) {
            if (this._d3Layer) {
                this._d3Layer.update(data)
            } else {
                this._d3Layer = new D3WeekDays(this.refs.svg, D3DataHub)
                this._d3Layer.update(data)
            }
        }
    }
}