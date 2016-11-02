const I = require('immutable')

module.exports = class SeasonsTransactionCalculator {
    constructor () {
        this.config = I.fromJS({
            seasons: {
                summer: [[0, 29], [306, 398]],
                autumn: [[30, 121], [399, 490]],
                winter: [[122, 212], [491, 582]],
                spring: [[213, 305], [583, 675]],
            },
            months: {
                summer: {
                    june: [[], []],
                    july: [[], []],
                    august: [[0, 29], []], // beginning on 2nd of august 2014
                },
                autumn: {
                    september: [[30, 59], []],
                    october: [[60, 90], []],
                    november: [[91, 121], []],
                },
                winter: {
                    december: [[], []],
                    january: [[], []],
                    february: [[], []],
                },
                spring: {
                    march: [[], []],
                    april: [[], []],
                    may: [[], []],
                },
            }
        })
        this.data = I.Map()
    }

    addTransaction (data) {
        const day = data.get('day')
        let period

        if (period = this.__SeasonInclusionChecker('summer', day)) {
            this.setSeasonData('summer', data, period)
        }

        if (period = this.__SeasonInclusionChecker('autumn', day)) {
            this.setSeasonData('autumn', data, period)
        }

        if (period = this.__SeasonInclusionChecker('winter', day)) {
            this.setSeasonData('winter', data, period)
        }

        if (period = this.__SeasonInclusionChecker('spring', day)) {
            this.setSeasonData('spring', data, period)
        }
    }

    setSeasonData (seasonType, data, period) {
        const nextAmount = data.get('amount')
        const day = data.get('day')
        const monthDay = day - period.get(0)
        
        if (nextAmount < 0) {
            this.data = this.data.updateIn([seasonType, 'expenses', 'byDay', monthDay, 'amount'], prevAmount => prevAmount ? prevAmount + nextAmount : nextAmount)
            this.data = this.data.updateIn([seasonType, 'expenses', 'byDay', monthDay, 'transactionsCount'], prevCount => (prevCount || 0) + 1)
            this.data = this.data.updateIn([seasonType, 'expenses', 'total', 'amount'], prevAmount => prevAmount ? prevAmount + nextAmount : nextAmount)
            this.data = this.data.updateIn([seasonType, 'expenses', 'total', 'transactionsCount'], prevCount => (prevCount || 0) + 1)
        
        } else if (nextAmount > 0) {
            this.data = this.data.updateIn([seasonType, 'incomes', 'byDay', monthDay, 'amount'], prevAmount => prevAmount ? prevAmount + nextAmount : nextAmount)
            this.data = this.data.updateIn([seasonType, 'incomes', 'byDay', monthDay, 'transactionsCount'], prevCount => (prevCount || 0) + 1)
            this.data = this.data.updateIn([seasonType, 'incomes', 'total', 'amount'], prevAmount => prevAmount ? prevAmount + nextAmount : nextAmount)
            this.data = this.data.updateIn([seasonType, 'incomes', 'total', 'transactionsCount'], prevCount => (prevCount || 0) + 1)
        }
    }

    getRowData (o) {
        return this.data.map(season => season.get(o.dataType)).toJS()
    }

    __SeasonInclusionChecker (seasonType, day) {
        return this.config.getIn(['seasons', seasonType]).find(period => {
            return day >= period.get(0) && day <= period.get(1)
        })
    }
}