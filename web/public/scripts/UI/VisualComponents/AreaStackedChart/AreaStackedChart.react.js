import './AreaStackedChart.less'
import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _b from 'bem-cn'

import D3AreaStackedChart from './AreaStackedChart.d3'
import Ranking from '../Ranking/Ranking.react'

export default class AreaStackedChart extends Component {
    constructor (props) {
        super(props)
        this.boxClassName = 'AreaStackedChart'
        this._b = _b(this.boxClassName)
    }

    shouldComponentUpdate (nextProps, nextState) {
        return nextProps.shouldUpdate
    }

    render () {
        return (
            <article className={ this._b }>
                <svg className={ this._b('SVG') } ref="svg" width={ window.innerWidth - 300 } height={ 245 } />
                <aside  className={ this._b('Aside') }>
                    { this.renderRanking() }
                </aside>
            </article>
        )
    }

    renderRanking () {
        const {
            dataList,
        } = this.props

        return (
            <Ranking dataList={ dataList } />
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
            dataList,
            D3DataHub,
        } = this.props
        
        if (dataList && dataList.length) {
            if (this._d3Layer) {
                this._d3Layer.update(dataList)
            } else {
                this._d3Layer = new D3AreaStackedChart(this.refs.svg, D3DataHub)
                this._d3Layer.update(dataList)
            }
        }
    }
}