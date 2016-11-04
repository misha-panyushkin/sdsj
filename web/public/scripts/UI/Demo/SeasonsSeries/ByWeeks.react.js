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
import ByWeeksControls from './ByWeeksControls.react'
import {
    SeasonsSeries as VisualSeasonsSeries,
} from 'UI/VisualComponents'

class SeasonsSeriesByWeeks extends Component {
    constructor (props) {
        super(props)
        this.boxClassName = 'ByWeeks'
        this._b = _b(this.boxClassName)
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

            isActiveModeGridSize,
        } = this.props

        const hasHoverCoordinates = !isNaN(hoverCoordinates.x) || !isNaN(hoverCoordinates.y)
        const activePoints = SeriesByWeeks.filter(point => point.state.active)

        return (
            <article className={ this._b.mix( className ) }>

                <ByWeeksControls 
                    className={ this._b('Controls').toString() }
                    />

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

                    margins={ {
                        top: 50, 
                        right: 0, 
                        bottom: 50,
                        left: 60,
                    } }

                    gridSizeMode={ isActiveModeGridSize }
                    />

                <VisualSeasonsSeries 
                    className={ this._b('OX') }
                    width={ 25 * columnsLabels.length }
                    height={ 25 }
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

                    margins={ {
                        top: 0, 
                        right: 0, 
                        bottom: 0,
                        left: 0,
                    } }
                    />

                <VisualSeasonsSeries 
                    className={ this._b('OY') }
                    width={ 25 }
                    height={ 25 * rowsLabels.length }
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

                    margins={ {
                        top: 0, 
                        right: 0, 
                        bottom: 0,
                        left: 0,
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
            isActiveModeGridSize: state.DemoSeasonsSeriesByWeeks.getIn(['ui', 'mode', 'gridsize', 'active'], false),
        },
    ),
    dispatch => ({
        ByWeeksActions: bindActionCreators(ByWeeksActions, dispatch),
    }),
    (stateProps, dispatchProps, ownProps) => {

        __markHoverPoints(stateProps.SeriesByWeeks, {
            x: stateProps.hoverCoordinates.x, 
            y: stateProps.hoverCoordinates.y,
        })
        __markHoverPoints(stateProps.SeriesByWeeksSumByOX, {
            x: stateProps.hoverCoordinates.x,
        })
        __markHoverPoints(stateProps.SeriesByWeeksSumByOY, {
            y: stateProps.hoverCoordinates.y,
        })

        return Object.assign(
            {},
            ownProps,
            stateProps,
            dispatchProps,
        )
    }
)(SeasonsSeriesByWeeks)

function __markHoverPoints (points, {
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