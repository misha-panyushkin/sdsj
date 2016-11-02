module.exports = class WeekDaysTransactionCalculator {

    constructor (baseWeekDayIndex) {
        this.baseWeekDayIndex = baseWeekDayIndex
        this.week = new Week()
    }

    addTransaction (data, filter) {
        const dayNumber = data.get('day')
        const weekNumber = Math.floor((dayNumber + this.baseWeekDayIndex)/ 7)
        const weekDay = dayNumber + this.baseWeekDayIndex - weekNumber * 7
        const amount = data.get('amount')
        const time = data.get('time')
        const timeOfDay = parseInt(time.split(':')[0])

        if (this.validationCheck(data, filter)) {
            this.week.update(weekDay, amount, timeOfDay)
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

    getRowData (...args) {
        return this.week.getRowData(...args)
    }
}

class Week {
    constructor () {
        this.week = []
        for (var i = 0; i < 7; i++) {
            this.week.push(new Day())
        }
    }

    update (weekDay, amount, timeOfDay) {
        this.week[weekDay].update(amount, timeOfDay)
    }

    getRowData (...args) {
        return this.week.map(d => d.getRowData(...args))
    }
}

class Day {
    constructor () {
        this.timeOfDay = []
        for (var i = 0; i < 24; i++) {
            this.timeOfDay.push(new TimeOfDay(i))
        }
    }

    update (amount, timeOfDay) {
        this.timeOfDay[timeOfDay].update(amount)
    }

    getRowData (...args) {
        return this.timeOfDay.map(d => d.getRowData(...args))
    }
}

class TimeOfDay {
    constructor () {
        this.incomes = 0
        this.expenses = 0
    }

    update (amount) {
        if (amount > 0) {
            this.incomes += amount
        
        } else if (amount < 0) {
            this.expenses += amount
        }
    }

    getRowData (o) {
        return this[o.dataType] || 0
    }
}