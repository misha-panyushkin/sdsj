import './ByWeeks.less'
import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _b from 'bem-cn'
import I from 'immutable'

import ByWeeksSelector from 'Selectors/Demo/SeasonsSeries/ByWeeks.selector'
import * as ByWeeksActions from 'Actions/Demo/SeasonsSeries/ByWeeks.actions'

import AsideInfo from './AsideInfo.react'
import {
    SeasonsSeries as VisualSeasonsSeries,
} from 'UI/VisualComponents'

class SeasonsSeriesByWeeks extends Component {
    constructor (props) {
        super(props)
        this.boxClassName = 'ByWeeks'
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
            
            SeriesByWeeks,
            SeriesByWeeksSumByOX,
            SeriesByWeeksSumByOY,

            rowsLabels,
            columnsLabels,

            hoverCoordinates,
        } = this.props

        const hasHoverCoordinates = !isNaN(hoverCoordinates.x) || !isNaN(hoverCoordinates.y)

        this.__markHoverPoints(SeriesByWeeks, {
            x: hoverCoordinates.x, 
            y: hoverCoordinates.y,
        })
        this.__markHoverPoints(SeriesByWeeksSumByOX, {
            x: hoverCoordinates.x,
        })
        this.__markHoverPoints(SeriesByWeeksSumByOY, {
            y: hoverCoordinates.y,
        })

        const activePoints = SeriesByWeeks.filter(point => point.state.active)

        return (
            <article className={ this._b.mix( className ) }>
                <VisualSeasonsSeries 
                    className={ this._b('Main') }
                    width={ 30 * columnsLabels.length }
                    height={ 32 * rowsLabels.length }
                    data={ SeriesByWeeks } 
                    rowsLabels={ rowsLabels }
                    columnsLabels={ columnsLabels }
                    gridSize={ 25 }
                    onMouseOver={ (...args) => this.handleMainMouseOver(...args) }
                    onMouseOut={ (...args) => this.handleMainMouseOut(...args) }
                    // smoothTransitions={ !hasHoverCoordinates }
                    sizes={ {
                        width: columnsLabels.length,
                        height: rowsLabels.length,
                    } }
                    />

                <VisualSeasonsSeries 
                    className={ this._b('OX') }
                    width={ 30 * columnsLabels.length }
                    height={ 80 }
                    data={ SeriesByWeeksSumByOX } 
                    rowsLabels={ [] }
                    columnsLabels={ [] }
                    gridSize={ 25 }
                    onMouseOver={ (...args) => this.handleOXMouseOver(...args) }
                    onMouseOut={ (...args) => this.handleOXMouseOut(...args) }
                    // smoothTransitions={ !hasHoverCoordinates }
                    sizes={ {
                        width: columnsLabels.length,
                        height: 1,
                    } }
                    />

                <VisualSeasonsSeries 
                    className={ this._b('OY') }
                    width={ 87 }
                    height={ 32 * rowsLabels.length }
                    data={ SeriesByWeeksSumByOY } 
                    rowsLabels={ [] }
                    columnsLabels={ [] }
                    gridSize={ 25 }
                    onMouseOver={ (...args) => this.handleOYMouseOver(...args) }
                    onMouseOut={ (...args) => this.handleOYMouseOut(...args) }
                    // smoothTransitions={ !hasHoverCoordinates }
                    sizes={ {
                        width: 1,
                        height: rowsLabels.length,
                    } }
                    />

                <AsideInfo
                    points={ activePoints }
                    />

            </article>
        )
    }

    handleMainMouseOver (point) {
        this.props.ByWeeksActions.setHoverCoordinates({
            x: point.x,
            y: point.y,
        })
    }

    handleMainMouseOut (point) {
        this.props.ByWeeksActions.setHoverCoordinates({})
    }

    handleOXMouseOver (point) {
        this.props.ByWeeksActions.setHoverCoordinates({
            x: point.x,
        })
    }

    handleOXMouseOut (point) {
        this.props.ByWeeksActions.setHoverCoordinates({})
    }

    handleOYMouseOver (point) {
        this.props.ByWeeksActions.setHoverCoordinates({
            y: point.y,
        })
    }

    handleOYMouseOut (point) {
        this.props.ByWeeksActions.setHoverCoordinates({})
    }

    // <OrderSwitcher 
    //     onChange={ (order) => ByWeeksActions.setSort('x', order) }/>
    // <OrderSwitcher 
    //     onChange={ (order) => ByWeeksActions.setSort('y', order) }/>

    componentDidMount () {
        const {
            ByWeeksActions,
        } = this.props

        // setTimeout(() => {
        //     ByWeeksActions.setSort({
        //         axis: 'x', 
        //         order: 'asc',
        //     })
        // }, 2000)

        // setTimeout(() => {
        //     ByWeeksActions.setSort({
        //         axis: 'y', 
        //         order: 'asc',
        //     })
        // }, 4000)

        // setTimeout(() => {
        //     ByWeeksActions.setSort({
        //         axis: 'x', 
        //         order: 'desc',
        //     })
        // }, 6000)

        // setTimeout(() => {
        //     ByWeeksActions.setSort({
        //         axis: 'y', 
        //         order: 'desc',
        //     })
        // }, 8000)

        // setTimeout(() => {
        //     ByWeeksActions.setSort({
        //         axis: 'x', 
        //         order: null,
        //     })
        //     ByWeeksActions.setSort({
        //         axis: 'y', 
        //         order: null,
        //     })
        // }, 10000)
    }
}

export default connect(
    state => Object.assign(
        {},
        ByWeeksSelector({
            state
        }),
        {
            hoverCoordinates: state.DemoSeasonsSeriesByWeeks.getIn(['ui', 'hover'], I.Map()).toJS(),
        },
    ),
    dispatch => ({
        ByWeeksActions: bindActionCreators(ByWeeksActions, dispatch),
    })
)(SeasonsSeriesByWeeks)