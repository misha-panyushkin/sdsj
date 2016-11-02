import './Ranking.less'
import classNames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _b from 'bem-cn'

class Ranking extends Component {
    constructor (props) {
        super(props)
        this.boxClassName = 'Ranking'
        this._b = _b(this.boxClassName)
    }

    render () {
        const {
            dataList,
        } = this.props
        const rankings = dataList.reduce((result, d) => {
            if (d.mccCodes && d.mccCodes.ranking) {
                const nextRanking = d.mccCodes.ranking
                for (var i in nextRanking) {
                    const prevMccCode = result[i] || 0
                    result[i] = prevMccCode + nextRanking[i]
                }
            }

            return result
        }, {})

        const rankingList = []
        for (var i in rankings) {
            rankingList.push({
                id: i,
                count: rankings[i]
            })
        }

        if (rankingList.length) {
            return (
                <ul className={ this._b }>
                    { rankingList.sort((a, b) => b.count - a.count).map((...args) => this.renderRankItem(...args)) }
                </ul>
            )

        } else {
            return null
        }
    }

    renderRankItem (item, index) {
        const {
            mccCodes,
        } = this.props
        
        return (
            <li 
                key={ index }
                className={ this._b('Item') }
                >
                { '(' +  item.count + ')' + mccCodes.getIn([parseInt(item.id), 'description'])}
            </li>
        )
    }
}


export default connect(
    state => ({
        transactionTypes: state.TransactionTypes.getIn(['generic', 'typesAll']),
        mccCodes: state.MccCodes.getIn(['generic', 'codesAll']),
    })
)(Ranking)