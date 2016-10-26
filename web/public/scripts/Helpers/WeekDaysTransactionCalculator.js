export default class WeekDaysTransactionCalculator {

    constructor (baseWeekDayIndex) {
        this.baseWeekDayIndex = baseWeekDayIndex
        this.week = new Week()
    }

    addTransaction (data) {
        const dayNumber = data.get('day')
        const weekNumber = Math.floor((dayNumber + this.baseWeekDayIndex)/ 7)
        const weekDay = dayNumber + this.baseWeekDayIndex - weekNumber * 7
        const amount = data.get('amount')

        this.week.update(weekDay, amount)
    }

    getRowData () {
        return this.week.getRowData()
    }
}

class Week {
    constructor () {
        this.week = []
        for (var i = 0; i < 7; i++) {
            this.week.push(new Day())
        }
    }

    update (weekDay, amount) {
        this.week[weekDay].update(amount)
    }

    getRowData () {
        return this.week.map(d => d.getRowData())
    }
}

class Day {
    constructor () {
        this.amount = 0
    }

    update (amount) {
        this.amount += amount
    }

    getRowData () {
        return {
            amount: this.amount
        }
    }
}