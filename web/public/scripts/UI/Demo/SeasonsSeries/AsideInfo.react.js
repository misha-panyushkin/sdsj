import './AsideInfo.less'
import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _b from 'bem-cn'

export default class AsideInfo extends Component {
    constructor (props) {
        super(props)
        this.boxClassName = 'AsideInfo'
        this._b = _b(this.boxClassName)
    }

    render () {
        const {
            points,
            className,
        } = this.props

        const info = this.__processPoints(points)

        return (
            <section
                className={ this._b.mix(className) }>
                
                <div className={ this._b('TotalExpenses').mix('Item') }>
                    <span className={ this._b('TotalExpensesLabel') }>
                        AVERAGE EXPENSE
                    </span>
                    <span className={ this._b('TotalExpensesNumber') }>
                        { this.__processNumberDimensions(info.average.expenses) }
                    </span>
                </div>
                
                <div className={ this._b('TotalIncomes').mix('Item') }>
                    <span className={ this._b('TotalIncomesLabel') }>
                        AVERAGE INCOME
                    </span>
                    <span className={ this._b('TotalIncomesNumber') }>
                        { this.__processNumberDimensions(info.average.incomes) }
                    </span>
                </div>
                
                <div className={ this._b('CountExpenses').mix('Item') }>
                    <span className={ this._b('CountExpensesLabel') }>
                        EXPENSE TRANS. NUMBER
                    </span>
                    <span className={ this._b('CountExpensesNumber') }>
                        { this.__processNumberDimensions(info.count.expenses) }
                    </span>
                </div>
                
                <div className={ this._b('CountIncomes').mix('Item') }>
                    <span className={ this._b('CountIncomesLabel') }>
                        INCOME TRANS. NUMBER
                    </span>
                    <span className={ this._b('CountIncomesNumber') }>
                        { this.__processNumberDimensions(info.count.incomes) }
                    </span>
                </div>

            </section>
        )
    }

    __processPoints (points) {
        return points.reduce((result, point) => {
            const data = point.data

            result.total.expenses += Math.abs(data.total.expenses)
            result.total.incomes += data.total.incomes

            result.count.expenses += data.count.expenses
            result.count.incomes += data.count.incomes

            result.average.expenses = result.count.expenses > 0 ? result.total.expenses / result.count.expenses : 0
            result.average.incomes = result.count.incomes > 0 ? result.total.incomes / result.count.incomes : 0

            return result
        }, {
            total: {
                expenses: 0,
                incomes: 0,
            },
            count: {
                expenses: 0,
                incomes: 0,
            },
            average: {
                expenses: 0,
                incomes: 0,
            },
        })
    }

    __processNumberDimensions (number) {
        const rounded = Math.round(number)
        const stringified = rounded.toString()
        const length = stringified.length

        let result = stringified
        let postfix = ''
        if (length > 9) {
            result = result.slice(0, -9)
            postfix = 'B'
        
        } else if (length > 6) {
            result = result.slice(0, -6)
            postfix = 'M'
        
        } else if (length > 3) {
            result = result.slice(0, -3)
            postfix = 'K'
        }

        return result + postfix
    }
}