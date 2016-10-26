export default class CustomerDataCalculator {
    constructor (id) {
        this.data = {}
        Object.assign(this.data, {
            id,
            income: {
                id,
                points: [],
                total: 0,
                mccCodes: {
                    ranking: {},
                },
                transactionTypes: {
                    ranking: {},
                },
            },
            expense: {
                id,
                points: [],
                total: 0,
                mccCodes: {
                    ranking: {},
                },
                transactionTypes: {
                    ranking: {},
                },
            },
            budget: {
                id,
                points: [],
                total: 0,
                mccCodes: {
                    ranking: {},
                },
                transactionTypes: {
                    ranking: {},
                },
            },

            currentIndex: -1,
        })
    }

    setData (data, filter) {
        const daysDiff = data.get('day') - this.data.currentIndex

        for (var day = 0; day < daysDiff; day++) {
            this.data.currentIndex++
            this.addPoint()
            this.calculateValues(0)
        }

        if (this.validationCheck(data, filter)) {
            this.calculateValues(data.get('amount'), data)
        }
    }

    validationCheck (data, filter) {
        if (!filter)
            return true

        const codes = filter.mccCodes
        if (codes && codes.size && !codes.find(d => d.get('code') == data.get('mcc_code')))
            return false

        const types = filter.transactionTypes
        if (types && types.size && !types.find(d => d.get('type') == data.get('tr_type')))
            return false

        return true
    }

    addPoint () {
        this.data.income.points.push({x: this.data.currentIndex, y: 0})
        this.data.expense.points.push({x: this.data.currentIndex, y: 0})
        this.data.budget.points.push({x: this.data.currentIndex, y: 0})
    }

    calculateValues (value, data) {
        const mccCode = data && data.get('mcc_code')
        const transactionType = data && data.get('tr_type')

        if (value > 0) {
            this.data.income.points[this.data.currentIndex].y += value
            this.data.income.total += value
            
            if (mccCode) {
                const mccCodeRank = this.data.income.mccCodes.ranking[mccCode] || 0
                this.data.income.mccCodes.ranking[mccCode] = mccCodeRank + 1
            }   

            if (transactionType) {
                const transactionTypeRank = this.data.income.transactionTypes.ranking[transactionType] || 0
                this.data.income.transactionTypes.ranking[transactionType] = transactionTypeRank + 1
            }
        
        } else if (value < 0) {
            this.data.expense.points[this.data.currentIndex].y += value
            this.data.expense.total += value

            if (mccCode) {
                const mccCodeRank = this.data.expense.mccCodes.ranking[mccCode] || 0
                this.data.expense.mccCodes.ranking[mccCode] = mccCodeRank + 1
            }

            if (transactionType) {
                const transactionTypeRank = this.data.expense.transactionTypes.ranking[transactionType] || 0
                this.data.expense.transactionTypes.ranking[transactionType] = transactionTypeRank + 1
            }
        }

        this.data.budget.points[this.data.currentIndex].y = this.data.income.total + this.data.expense.total
    }

    getRowData () {
        return this.data
    }
}