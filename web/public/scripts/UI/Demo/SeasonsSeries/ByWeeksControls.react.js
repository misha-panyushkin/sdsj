import './ByWeeksControls.less'
import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _b from 'bem-cn'

import FA from 'react-fontawesome'

import * as ByWeeksActions from 'Actions/Demo/SeasonsSeries/ByWeeks.actions'

class ByWeeksControls extends Component {
    constructor (props) {
        super(props)
        this.boxClassName = 'ByWeeksControls'
        this._b = _b(this.boxClassName)
    }

    render () {
        const {
            className,

            weekDaysSortCurrent,
            dayHoursSortCurrent,

            dataType,
            isActiveModeGridSize,
        } = this.props

        return (
            <section
                className={ this._b.mix(className) }>

                <div 
                    className={ this._b('DayHoursSort') }
                    >
                    <FA 
                        className={ this._b('DayHoursSortDefault').mix(['Item', !dayHoursSortCurrent ? 'Active' : '']).toString() }
                        name="bars"
                        onClick={ () => this.handleDayHoursSortDefaultClick() }
                        />
                    <FA 
                        className={ this._b('DayHoursSortAsc').mix(['Item', dayHoursSortCurrent == 'asc' ? 'Active' : '']).toString() }
                        name="sort-amount-asc"
                        onClick={ () => this.handleDayHoursSortAscClick() }
                        />
                    <FA 
                        className={ this._b('DayHoursSortDesc').mix(['Item', dayHoursSortCurrent == 'desc' ? 'Active' : '']).toString() }
                        name="sort-amount-desc"
                        onClick={ () => this.handleDayHoursSortDescClick() }
                        />
                </div>
                
                <div 
                    className={ this._b('WeekDaysSort') }
                    >
                    <FA 
                        className={ this._b('WeekDaysSortAsc').mix(['Item', weekDaysSortCurrent == 'asc' ? 'Active' : '']).toString() }
                        name="sort-amount-desc"
                        onClick={ () => this.handleWeekDaysSortAscClick() }
                        />
                    <FA 
                        className={ this._b('WeekDaysSortDesc').mix(['Item', weekDaysSortCurrent == 'desc' ? 'Active' : '']).toString() }
                        name="sort-amount-asc"
                        onClick={ () => this.handleWeekDaysSortDescClick() }
                        />
                    <FA 
                        className={ this._b('WeekDaysSortDefault').mix(['Item', !weekDaysSortCurrent ? 'Active' : '']).toString() }
                        name="bars"
                        onClick={ () => this.handleWeekDaysSortDefaultClick() }
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
                        className={ this._b('ModeGridSize').mix(['Item', isActiveModeGridSize ? 'Active' : '']).toString() }
                        name="circle"
                        onClick={ () => this.handleModeGridSizeClick() }
                        />
                </div>

            </section>
        )
    }

    handleWeekDaysSortDefaultClick () {
        this.handleSort({
            axis: 'y', 
            order: null,
        })
    }
    handleWeekDaysSortAscClick () {
        this.handleSort({
            axis: 'y', 
            order: 'asc',
        })
    }
    handleWeekDaysSortDescClick () {
        this.handleSort({
            axis: 'y', 
            order: 'desc',
        })
    }

    handleDayHoursSortDefaultClick () {
        this.handleSort({
            axis: 'x', 
            order: null,
        })
    }
    handleDayHoursSortAscClick () {
        this.handleSort({
            axis: 'x', 
            order: 'asc',
        })
    }
    handleDayHoursSortDescClick () {
        this.handleSort({
            axis: 'x', 
            order: 'desc',
        })
    }

    handleSort (...args) {
        const {
            ByWeeksActions,
        } = this.props
        
        ByWeeksActions.setSort(...args)
    }



    handleModeIncomeClick () {
        const {
            ByWeeksActions,
        } = this.props
        
        ByWeeksActions.switchModeDataType('incomes')
    }

    handleModeExpenseClick () {
        const {
            ByWeeksActions,
        } = this.props
        
        ByWeeksActions.switchModeDataType('expenses')
    }


    handleModeGridSizeClick () {
        const {
            ByWeeksActions,
        } = this.props
        
        ByWeeksActions.switchModeGridSize()
    }
}

export default connect(
    state => ({
        dayHoursSortCurrent: state.DemoSeasonsSeriesByWeeks.getIn(['ui', 'sort', 'x', 'order']),
        weekDaysSortCurrent: state.DemoSeasonsSeriesByWeeks.getIn(['ui', 'sort', 'y', 'order']),
        
        dataType: state.DemoSeasonsSeriesByWeeks.getIn(['ui', 'mode', 'datatype']),
        isActiveModeGridSize: state.DemoSeasonsSeriesByWeeks.getIn(['ui', 'mode', 'gridsize', 'active'], false),
    }), 
    dispatch => ({
        ByWeeksActions: bindActionCreators(ByWeeksActions, dispatch),
    }),
)(ByWeeksControls)