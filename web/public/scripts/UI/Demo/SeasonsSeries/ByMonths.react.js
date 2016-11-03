import './ByMonths.less'
import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _b from 'bem-cn'
import I from 'immutable'

import ByMonthsSelector from 'Selectors/Demo/SeasonsSeries/ByMonths.selector'
import * as ByMonthsActions from 'Actions/Demo/SeasonsSeries/ByMonths.actions'

import {
    SeasonsSeries as VisualSeasonsSeries,
} from 'UI/VisualComponents'

class SeasonsSeriesByMonth extends Component {
    constructor (props) {
        super(props)
        this.boxClassName = 'ByMonths'
        this._b = _b(this.boxClassName)
    }

    __markHoverPoints (points, {
        x,
        y,
    }) {
        points.forEach(point => {
            point.state.active = false
            
            if (!isNaN(x) && !isNaN(y)) {
                if (point.x == x && point.y == y) {
                    point.state.active = true
                }
            
            } else if (!isNaN(x)) {
                if (point.x == x) {
                    point.state.active = true
                }
                return
            
            } else if (!isNaN(y)) {
                if (point.y == y) {
                    point.state.active = true
                }
                return
            }
        })
    }

    render () {
        const {
            className,
            
            SeriesByMonths,
            SeriesByMonthsSumByOX,
            SeriesByMonthsSumByOY,

            rowsLabels,
            columnsLabels,

            hoverCoordinates,
        } = this.props

        const hasHoverCoordinates = !isNaN(hoverCoordinates.x) || !isNaN(hoverCoordinates.y)

        this.__markHoverPoints(SeriesByMonths, {
            x: hoverCoordinates.x, 
            y: hoverCoordinates.y,
        })
        this.__markHoverPoints(SeriesByMonthsSumByOX, {
            x: hoverCoordinates.x,
        })
        this.__markHoverPoints(SeriesByMonthsSumByOY, {
            y: hoverCoordinates.y,
        })

        return (
            <article className={ this._b.mix( className ) }>
                <VisualSeasonsSeries 
                    className={ this._b('Main') }
                    width={ 30 * columnsLabels.length }
                    height={ 30 * rowsLabels.length }
                    data={ SeriesByMonths } 
                    rowsLabels={ rowsLabels }
                    columnsLabels={ columnsLabels }
                    gridSize={ 25 }
                    onMouseOver={ (...args) => this.handleMainMouseOver(...args) }
                    onMouseOut={ (...args) => this.handleMainMouseOut(...args) }
                    smoothTransitions={ !hasHoverCoordinates }
                    />

                <VisualSeasonsSeries 
                    className={ this._b('OX') }
                    width={ 30 * columnsLabels.length }
                    height={ 80 }
                    data={ SeriesByMonthsSumByOX } 
                    rowsLabels={ [] }
                    columnsLabels={ [] }
                    gridSize={ 25 }
                    onMouseOver={ (...args) => this.handleOXMouseOver(...args) }
                    onMouseOut={ (...args) => this.handleOXMouseOut(...args) }
                    smoothTransitions={ !hasHoverCoordinates }
                    />

                <VisualSeasonsSeries 
                    className={ this._b('OY') }
                    width={ 88 }
                    height={ 30 * rowsLabels.length }
                    data={ SeriesByMonthsSumByOY } 
                    rowsLabels={ [] }
                    columnsLabels={ [] }
                    gridSize={ 25 }
                    onMouseOver={ (...args) => this.handleOYMouseOver(...args) }
                    onMouseOut={ (...args) => this.handleOYMouseOut(...args) }
                    smoothTransitions={ !hasHoverCoordinates }
                    />
            </article>
        )
    }

    handleMainMouseOver (point) {
        this.props.ByMonthsActions.setHoverCoordinates({
            x: point.x,
            y: point.y,
        })
    }

    handleMainMouseOut (point) {
        this.props.ByMonthsActions.setHoverCoordinates({})
    }

    handleOXMouseOver (point) {
        this.props.ByMonthsActions.setHoverCoordinates({
            x: point.x,
        })
    }

    handleOXMouseOut (point) {
        this.props.ByMonthsActions.setHoverCoordinates({})
    }

    handleOYMouseOver (point) {
        this.props.ByMonthsActions.setHoverCoordinates({
            y: point.y,
        })
    }

    handleOYMouseOut (point) {
        this.props.ByMonthsActions.setHoverCoordinates({})
    }

    // <OrderSwitcher 
    //     onChange={ (order) => ByMonthsActions.setSort('x', order) }/>
    // <OrderSwitcher 
    //     onChange={ (order) => ByMonthsActions.setSort('y', order) }/>

    componentDidMount () {
        // const {
        //     ByMonthsActions,
        // } = this.props

        // setTimeout(() => {
        //     ByMonthsActions.setSort({
        //         axis: 'x', 
        //         order: 'asc',
        //     })
        // }, 2000)

        // setTimeout(() => {
        //     ByMonthsActions.setSort({
        //         axis: 'y', 
        //         order: 'asc',
        //     })
        // }, 4000)

        // setTimeout(() => {
        //     ByMonthsActions.setSort({
        //         axis: 'x', 
        //         order: 'desc',
        //     })
        // }, 6000)

        // setTimeout(() => {
        //     ByMonthsActions.setSort({
        //         axis: 'y', 
        //         order: 'desc',
        //     })
        // }, 8000)

        // setTimeout(() => {
        //     ByMonthsActions.setSort({
        //         axis: 'x', 
        //         order: null,
        //     })
        //     ByMonthsActions.setSort({
        //         axis: 'y', 
        //         order: null,
        //     })
        // }, 10000)
    }
}

export default connect(
    state => Object.assign(
        {},
        ByMonthsSelector({
            state
        }),
        {
            hoverCoordinates: state.DemoSeasonsSeriesByMonths.getIn(['ui', 'hover'], I.Map()).toJS(),
        },
    ),
    dispatch => ({
        ByMonthsActions: bindActionCreators(ByMonthsActions, dispatch),
    })
)(SeasonsSeriesByMonth)