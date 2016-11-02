import './ByWeeks.less'
import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _b from 'bem-cn'
import I from 'immutable'

import ByWeeksSelector from 'Selectors/Demo/SeasonsSeries/ByWeeks.selector'
import * as ByWeeksActions from 'Actions/Demo/SeasonsSeries/ByWeeks.actions'

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

            ByWeeksActions,
        } = this.props

        return (
            <article className={ this._b.mix( className ) }>
                <VisualSeasonsSeries 
                    className={ this._b('Main') }
                    width={ 30 * columnsLabels.length }
                    height={ 32 * rowsLabels.length }
                    data={ SeriesByWeeks } 
                    rowsLabels={ rowsLabels }
                    columnsLabels={ columnsLabels }
                    gridSize={ 25 }/>

                <VisualSeasonsSeries 
                    className={ this._b('OX') }
                    width={ 30 * columnsLabels.length }
                    height={ 80 }
                    data={ SeriesByWeeksSumByOX } 
                    rowsLabels={ [] }
                    columnsLabels={ [] }
                    gridSize={ 25 }
                    />

                <VisualSeasonsSeries 
                    className={ this._b('OY') }
                    width={ 87 }
                    height={ 32 * rowsLabels.length }
                    data={ SeriesByWeeksSumByOY } 
                    rowsLabels={ [] }
                    columnsLabels={ [] }
                    gridSize={ 25 }
                    />

            </article>
        )
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
        ByWeeksSelector({
            state
        })
    ),
    dispatch => ({
        ByWeeksActions: bindActionCreators(ByWeeksActions, dispatch),
    })
)(SeasonsSeriesByWeeks)