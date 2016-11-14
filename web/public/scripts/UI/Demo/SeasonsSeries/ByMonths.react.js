import './ByMonths.less'
import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _b from 'bem-cn'
import I from 'immutable'

import ByMonthsSelector from 'Selectors/Demo/SeasonsSeries/ByMonths.selector'
import * as ByMonthsActions from 'Actions/Demo/SeasonsSeries/ByMonths.actions'
import * as ByWeeksActions from 'Actions/Demo/SeasonsSeries/ByWeeks.actions'

import AsideInfo from './AsideInfo.react'
import ByMonthsControls from './ByMonthsControls.react'
import {
    SeasonsSeries as VisualSeasonsSeries,
} from 'UI/VisualComponents'

class SeasonsSeriesByMonth extends Component {
    constructor (props) {
        super(props)
        this.boxClassName = 'ByMonths'
        this._b = _b(this.boxClassName)
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
            selectedCoordinates,

            isActiveModeWeather,
            isActiveModeGridSize,
            isActiveModeHolidays,
            isActiveModeScaleLog,
        } = this.props

        const hasHoverCoordinates = !isNaN(hoverCoordinates.x) || !isNaN(hoverCoordinates.y)

        const activePoints = SeriesByMonths.filter(point => point.state.active)
        
        return (
            <article 
                className={ this._b.mix( className ) }
                id="ByMonthsVisualisation"
                >

                <ByMonthsControls 
                    className={ this._b('Controls').toString() }
                    />
                    
                <VisualSeasonsSeries 
                    className={ this._b('Main').mix('ByMonthsVisualisationSeries') }
                    width={ 28.39 * columnsLabels.length }
                    height={ 28 * rowsLabels.length }
                    data={ SeriesByMonths } 
                    rowsLabels={ rowsLabels }
                    columnsLabels={ columnsLabels }
                    gridSize={ 25 }
                    
                    onMouseOver={ (...args) => this.handleMainMouseOver(...args) }
                    onMouseOut={ (...args) => this.handleMainMouseOut(...args) }
                    onClick={ (...args) => this.handleMainClick(...args) }
                    
                    // smoothTransitions={ !hasHoverCoordinates }
                    sizes={ {
                        width: columnsLabels.length,
                        height: rowsLabels.length,
                    } }

                    margins={ {
                        top: 50, 
                        right: 0, 
                        bottom: 50,
                        left: 86,
                    } }

                    weatherMode={ isActiveModeWeather }
                    gridSizeMode={ isActiveModeGridSize }
                    holidaysMode={ isActiveModeHolidays }
                    scaleLogMode={ isActiveModeScaleLog }

                    spinner={ true }
                    spinnerBoxStyles={{
                        width: 880,
                        height: 420,
                    }}
                    />

                <VisualSeasonsSeries 
                    className={ this._b('OX') }
                    width={ 25 * columnsLabels.length }
                    height={ 25 }
                    data={ SeriesByMonthsSumByOX } 
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
                    className={ this._b('OY').mix('ByMonthsVisualisationSeries') }
                    width={ 25 }
                    height={ 25 * rowsLabels.length }
                    data={ SeriesByMonthsSumByOY } 
                    rowsLabels={ [] }
                    columnsLabels={ [] }
                    gridSize={ 25 }
                    
                    onMouseOver={ (...args) => this.handleOYMouseOver(...args) }
                    onMouseOut={ (...args) => this.handleOYMouseOut(...args) }
                    onClick={ (...args) => this.handleOYClick(...args) }

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
                    className={ this._b('Aside') }
                    points={ activePoints }
                    />

            </article>
        )
    }

    handleMainClick (point) {
        const {
            ByMonthsActions,
            ByWeeksActions,
            selectedCoordinates,
            SeriesByMonths,
        } = this.props
        
        if (selectedCoordinates.x != point.x || selectedCoordinates.y != point.y) {
            ByMonthsActions.setSelectedCoordinates({
                x: point.x,
                y: point.y,
            })
            ByWeeksActions.setWeekDaysByDataPoints(
                SeriesByMonths.filter(point => point.state.selected).map(point => point.data)
            )
        
        } else {
            ByMonthsActions.setSelectedCoordinates({})
            ByWeeksActions.setWeekDaysByDataPoints([])
        }
    }

    handleOYClick (point) {
        const {
            ByMonthsActions,
            ByWeeksActions,
            selectedCoordinates,
            SeriesByMonths,
        } = this.props
        
        if (selectedCoordinates.y != point.y) {
            ByMonthsActions.setSelectedCoordinates({
                y: point.y,
            })
            ByWeeksActions.setWeekDaysByDataPoints(
                SeriesByMonths.filter(point => point.state.selected).map(point => point.data)
            )
        
        } else {
            ByMonthsActions.setSelectedCoordinates({})
            ByWeeksActions.setWeekDaysByDataPoints([])
        }   
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
        const {
            ByMonthsActions,
        } = this.props

        // setTimeout(() => {
        //     ByMonthsActions.switchModeWeather()
        // }, 2000)

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
            selectedCoordinates: state.DemoSeasonsSeriesByMonths.getIn(['ui', 'selected'], I.Map()).toJS(),
            isActiveModeWeather: state.DemoSeasonsSeriesByMonths.getIn(['ui', 'mode', 'weather', 'active'], false),
            isActiveModeGridSize: state.DemoSeasonsSeriesByMonths.getIn(['ui', 'mode', 'gridsize', 'active'], false),
            isActiveModeHolidays: state.DemoSeasonsSeriesByMonths.getIn(['ui', 'mode', 'holidays', 'active'], false),
            isActiveModeScaleLog: state.DemoSeasonsSeriesByMonths.getIn(['ui', 'mode', 'scalelog', 'active'], false),
        },
    ),
    dispatch => ({
        ByMonthsActions: bindActionCreators(ByMonthsActions, dispatch),
        ByWeeksActions: bindActionCreators(ByWeeksActions, dispatch),
    }),
    (stateProps, dispatchProps, ownProps) => {

        __markHoverPoints(stateProps.SeriesByMonths, {
            x: stateProps.hoverCoordinates.x, 
            y: stateProps.hoverCoordinates.y,
        })
        __markHoverPoints(stateProps.SeriesByMonthsSumByOX, {
            x: stateProps.hoverCoordinates.x,
        })
        __markHoverPoints(stateProps.SeriesByMonthsSumByOY, {
            y: stateProps.hoverCoordinates.y,
        })


        __markSelectedPoints(stateProps.SeriesByMonths, {
            x: stateProps.selectedCoordinates.x, 
            y: stateProps.selectedCoordinates.y,
        })
        // __markSelectedPoints(stateProps.SeriesByMonthsSumByOX, {
        //     x: stateProps.selectedCoordinates.x,
        // })
        __markSelectedPoints(stateProps.SeriesByMonthsSumByOY, {
            y: stateProps.selectedCoordinates.y,
        })

        return Object.assign(
            {},
            ownProps,
            stateProps,
            dispatchProps,
        )
    }
)(SeasonsSeriesByMonth)

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

function __markSelectedPoints (points, {
    x,
    y,
}) {
    points.forEach(point => {
        point.state.selected = false
        
        if (!isNaN(x) && !isNaN(y)) {
            if (point.x == x && point.y == y) {
                point.state.selected = true
            }
        
        } else if (!isNaN(x)) {
            if (point.x == x) {
                point.state.selected = true
            }
            return
        
        } else if (!isNaN(y)) {
            if (point.y == y) {
                point.state.selected = true
            }
            return
        }
    })
}