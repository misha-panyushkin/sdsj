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

    render () {
        const {
            className,
            
            SeriesByMonths,
            SeriesByMonthsSumByOX,
            SeriesByMonthsSumByOY,

            rowsLabels,
            columnsLabels,

            ByWeeksActions,
        } = this.props

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
                    />

                <VisualSeasonsSeries 
                    className={ this._b('OX') }
                    width={ 30 * columnsLabels.length }
                    height={ 80 }
                    data={ SeriesByMonthsSumByOX } 
                    rowsLabels={ [] }
                    columnsLabels={ [] }
                    gridSize={ 25 }
                    />

                <VisualSeasonsSeries 
                    className={ this._b('OY') }
                    width={ 88 }
                    height={ 30 * rowsLabels.length }
                    data={ SeriesByMonthsSumByOY } 
                    rowsLabels={ [] }
                    columnsLabels={ [] }
                    gridSize={ 25 }
                    />
            </article>
        )
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
        ByMonthsSelector({
            state
        })
    ),
    dispatch => ({
        ByMonthsActions: bindActionCreators(ByMonthsActions, dispatch),
    })
)(SeasonsSeriesByMonth)