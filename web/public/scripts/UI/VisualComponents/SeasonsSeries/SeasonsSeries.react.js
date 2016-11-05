import './SeasonsSeries.less'
import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _b from 'bem-cn'

import D3SeasonsSeries from './SeasonsSeries.d3'

export default class SeasonsSeries extends Component {
    constructor (props) {
        super(props)
        this.boxClassName = 'VisualSeasonsSeries'
        this._b = _b(this.boxClassName)
    }

    render () {
        const {
            className,
            
            width,
            height,
        } = this.props

        return (
            <div className={ this._b.mix( className ) }>
                <svg className={ this._b('SVG') } ref="svg" width={ width } height={ height } />
            </div>
        )

        // <aside  className={ this._b('Aside') }></aside>
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
            rowsLabels,
            columnsLabels,
            gridSize,
            
            onMouseOver,
            onMouseOut,
            onClick,

            smoothTransitions,
            sizes,
            margins,

            weatherMode,
            gridSizeMode,
            holidaysMode,
            scaleLogMode,

        } = this.props

        const eventHandlers = {
            onMouseOver,
            onMouseOut,
            onClick,
        }
        
        if (data && data.length) {
            
            if (!this._d3Layer) {
                this._d3Layer = new D3SeasonsSeries({
                    root: this.refs.svg, 
                    hub: D3DataHub,
                    rowsLabels,
                    columnsLabels,
                    gridSize,
                    margins,
                })
            }
            
            this._d3Layer.update({
                data,
                rowsLabels,
                columnsLabels,
                gridSize,
                eventHandlers,
                smoothTransitions,
                sizes,
                weatherMode,
                gridSizeMode,
                holidaysMode,
                scaleLogMode,
            })
        }
    }
}

SeasonsSeries.defaultProps = {
    gridSize: 20,
    data: [],

    onMouseOver: () => {},
    onMouseOut: () => {},
    onMouseLeave: () => {},
    onClick: () => {},

    smoothTransitions: true,
}