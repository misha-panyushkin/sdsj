import './ByMonthsControls.less'
import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _b from 'bem-cn'

import FA from 'react-fontawesome'

import * as ByMonthsActions from 'Actions/Demo/SeasonsSeries/ByMonths.actions'

class ByMonthsControls extends Component {
    constructor (props) {
        super(props)
        this.boxClassName = 'ByMonthsControls'
        this._b = _b(this.boxClassName)
    }

    render () {
        const {
            className,

            monthsSortCurrent,
            daysSortCurrent,

            dataType,
            isActiveModeWeather,
            isActiveModeGridSize,
            isActiveModeHolidays,
            isActiveModeScaleLog,
        } = this.props

        return (
            <section
                className={ this._b.mix(className) }>

                <div 
                    className={ this._b('DaysSort') }
                    >
                    <FA 
                        className={ this._b('DaysSortDefault').mix(['Item', !daysSortCurrent ? 'Active' : '']).toString() }
                        name="bars"
                        onClick={ () => this.handleDaysSortDefaultClick() }
                        />
                    <FA 
                        className={ this._b('DaysSortAsc').mix(['Item', daysSortCurrent == 'asc' ? 'Active' : '']).toString() }
                        name="sort-amount-asc"
                        onClick={ () => this.handleDaysSortAscClick() }
                        />
                    <FA 
                        className={ this._b('DaysSortDesc').mix(['Item', daysSortCurrent == 'desc' ? 'Active' : '']).toString() }
                        name="sort-amount-desc"
                        onClick={ () => this.handleDaysSortDescClick() }
                        />
                </div>
                
                <div 
                    className={ this._b('MonthsSort') }
                    >
                    <FA 
                        className={ this._b('MonthsSortAsc').mix(['Item', monthsSortCurrent == 'asc' ? 'Active' : '']).toString() }
                        name="sort-amount-desc"
                        onClick={ () => this.handleMonthsSortAscClick() }
                        />
                    <FA 
                        className={ this._b('MonthsSortDesc').mix(['Item', monthsSortCurrent == 'desc' ? 'Active' : '']).toString() }
                        name="sort-amount-asc"
                        onClick={ () => this.handleMonthsSortDescClick() }
                        />
                    <FA 
                        className={ this._b('MonthsSortDefault').mix(['Item', !monthsSortCurrent ? 'Active' : '']).toString() }
                        name="bars"
                        onClick={ () => this.handleMonthsSortDefaultClick() }
                        />
                </div>

                <div 
                    className={ this._b('Modes') }
                    >
                    <FA 
                        className={ this._b('ModeIncome').mix(['Item', dataType == 'incomes' ? 'Active' : '']).toString() }
                        name="plus"
                        onClick={ () => this.handleModeIncomeClick() }
                        />
                    <FA 
                        className={ this._b('ModeExpense').mix(['Item', dataType == 'expenses' ? 'Active' : '']).toString() }
                        name="minus"
                        onClick={ () => this.handleModeExpenseClick() }
                        />
                    <FA 
                        className={ this._b('ModeWeather').mix(['Item', isActiveModeWeather ? 'Active' : '']).toString() }
                        name="cloud"
                        onClick={ () => this.handleModeWeatherClick() }
                        />
                    <FA 
                        className={ this._b('ModeGridSize').mix(['Item', isActiveModeGridSize ? 'Active' : '']).toString() }
                        name="circle"
                        onClick={ () => this.handleModeGridSizeClick() }
                        />
                    <FA 
                        className={ this._b('ModeHolidays').mix(['Item', isActiveModeHolidays ? 'Active' : '']).toString() }
                        name="star"
                        onClick={ () => this.handleModeHolidaysClick() }
                        />
                    <FA 
                        className={ this._b('ModeScaleLog').mix(['Item', isActiveModeScaleLog ? 'Active' : '']).toString() }
                        name="gbp"
                        onClick={ () => this.handleModeScaleLogClick() }
                        />
                </div>

            </section>
        )
    }

    handleMonthsSortDefaultClick () {
        this.handleSort({
            axis: 'y', 
            order: null,
        })
    }
    handleMonthsSortAscClick () {
        this.handleSort({
            axis: 'y', 
            order: 'asc',
        })
    }
    handleMonthsSortDescClick () {
        this.handleSort({
            axis: 'y', 
            order: 'desc',
        })
    }

    handleDaysSortDefaultClick () {
        this.handleSort({
            axis: 'x', 
            order: null,
        })
    }
    handleDaysSortAscClick () {
        this.handleSort({
            axis: 'x', 
            order: 'asc',
        })
    }
    handleDaysSortDescClick () {
        this.handleSort({
            axis: 'x', 
            order: 'desc',
        })
    }

    handleSort (...args) {
        const {
            ByMonthsActions,
        } = this.props
        
        ByMonthsActions.setSort(...args)
    }



    handleModeIncomeClick () {
        const {
            ByMonthsActions,
        } = this.props
        
        ByMonthsActions.switchModeDataType('incomes')
    }

    handleModeExpenseClick () {
        const {
            ByMonthsActions,
        } = this.props
        
        ByMonthsActions.switchModeDataType('expenses')
    }


    handleModeWeatherClick () {
        const {
            ByMonthsActions,
        } = this.props
        
        ByMonthsActions.switchModeWeather()
    }

    handleModeGridSizeClick () {
        const {
            ByMonthsActions,
        } = this.props
        
        ByMonthsActions.switchModeGridSize()
    }

    handleModeHolidaysClick () {
        const {
            ByMonthsActions,
        } = this.props
        
        ByMonthsActions.switchModeHolidays()
    }

    handleModeScaleLogClick () {
        const {
            ByMonthsActions,
        } = this.props
        
        ByMonthsActions.switchModeScaleLog()
    }
}

export default connect(
    state => ({
        daysSortCurrent: state.DemoSeasonsSeriesByMonths.getIn(['ui', 'sort', 'x', 'order']),
        monthsSortCurrent: state.DemoSeasonsSeriesByMonths.getIn(['ui', 'sort', 'y', 'order']),
        
        dataType: state.DemoSeasonsSeriesByMonths.getIn(['ui', 'mode', 'datatype']),
        isActiveModeWeather: state.DemoSeasonsSeriesByMonths.getIn(['ui', 'mode', 'weather', 'active'], false),
        isActiveModeGridSize: state.DemoSeasonsSeriesByMonths.getIn(['ui', 'mode', 'gridsize', 'active'], false),
        isActiveModeHolidays: state.DemoSeasonsSeriesByMonths.getIn(['ui', 'mode', 'holidays', 'active'], false),
        isActiveModeScaleLog: state.DemoSeasonsSeriesByMonths.getIn(['ui', 'mode', 'scalelog', 'active'], false),
    }), 
    dispatch => ({
        ByMonthsActions: bindActionCreators(ByMonthsActions, dispatch),
    }),
)(ByMonthsControls)