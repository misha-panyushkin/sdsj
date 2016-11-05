const I = require('immutable')
const moment = require('moment')

module.exports = class SeasonsTransactionManager {
    constructor ( WeatherStore, HolidayStore ) {
        this.startingPoint = moment('02-08-2014', ["DD-MM-YYYY"]).locale('en')
        this.data = I.Map()
        this.WeatherStore = WeatherStore
        this.HolidayStore = HolidayStore
    }

    addTransaction (data) {
        const day = data.get('day')
        const time = data.get('time').split(':')

        const nextDate = this.startingPoint.clone()
            .add(day, 'd')
            .set({
                hour: time[0] > 23 ? 23 : time[0],
                minute: time[1] > 59 ? 59 : time[1],
                second: time[2] > 59 ? 59 : time[2],
            })

        const nextAmount = data.get('amount')

        const weatherData = this.WeatherStore.getIn([ nextDate.year(), nextDate.month() + 1, nextDate.date() ])
        const holidayData = this.HolidayStore.getIn([ nextDate.year(), nextDate.month() + 1, nextDate.date() ])

        this.data = this.data.updateIn(['byWeek'], list => list || I.List())
        this.data = this.data.updateIn(['byWeek', nextDate.weekday()], map => map || I.Map())
        this.data = this.data.updateIn(['byWeek', nextDate.weekday(), 'total'], total => this.__calculateTotal(total, nextAmount))
        this.data = this.data.updateIn(['byWeek', nextDate.weekday(), 'count'], count => this.__increaseCount(count, nextAmount))
        this.data = this.data.updateIn(['byWeek', nextDate.weekday(), 'info'], info => this.__setDateInfo(info, nextDate))
        
        this.data = this.data.updateIn(['byWeek', nextDate.weekday(), 'byHour'], list => list || I.List())
        this.data = this.data.updateIn(['byWeek', nextDate.weekday(), 'byHour', nextDate.hour()], map => map || I.Map())
        this.data = this.data.updateIn(['byWeek', nextDate.weekday(), 'byHour', nextDate.hour(), 'total'], total => this.__calculateTotal(total, nextAmount))
        this.data = this.data.updateIn(['byWeek', nextDate.weekday(), 'byHour', nextDate.hour(), 'count'], count => this.__increaseCount(count, nextAmount))
        this.data = this.data.updateIn(['byWeek', nextDate.weekday(), 'byHour', nextDate.hour(), 'info'], info => this.__setDateInfo(info, nextDate))


        const monthsDiff = nextDate.diff(this.startingPoint, 'month')        

        this.data = this.data.updateIn(['byMonth'], list => list || I.List())
        this.data = this.data.updateIn(['byMonth', monthsDiff], map => map || I.Map())
        this.data = this.data.updateIn(['byMonth', monthsDiff, 'total'], total => this.__calculateTotal(total, nextAmount))
        this.data = this.data.updateIn(['byMonth', monthsDiff, 'count'], count => this.__increaseCount(count, nextAmount))
        this.data = this.data.updateIn(['byMonth', monthsDiff, 'info'], info => this.__setDateInfo(info, nextDate))

        this.data = this.data.updateIn(['byMonth', monthsDiff, 'byDay'], list => list || I.List())
        this.data = this.data.updateIn(['byMonth', monthsDiff, 'byDay', nextDate.date() - 1], map => map || I.Map())
        this.data = this.data.updateIn(['byMonth', monthsDiff, 'byDay', nextDate.date() - 1, 'total'], total => this.__calculateTotal(total, nextAmount))
        this.data = this.data.updateIn(['byMonth', monthsDiff, 'byDay', nextDate.date() - 1, 'count'], count => this.__increaseCount(count, nextAmount))
        this.data = this.data.updateIn(['byMonth', monthsDiff, 'byDay', nextDate.date() - 1, 'info'], info => this.__setDateInfo(info, nextDate))
        this.data = this.data.updateIn(['byMonth', monthsDiff, 'byDay', nextDate.date() - 1, 'extra'], extra => this.__setExtraData(extra, weatherData, holidayData))

        this.data = this.data.updateIn(['byMonth', monthsDiff, 'byDay', nextDate.date() - 1, 'byHour'], list => list || I.List())
        this.data = this.data.updateIn(['byMonth', monthsDiff, 'byDay', nextDate.date() - 1, 'byHour', nextDate.hour()], map => map || I.Map())
        this.data = this.data.updateIn(['byMonth', monthsDiff, 'byDay', nextDate.date() - 1, 'byHour', nextDate.hour(), 'total'], total => this.__calculateTotal(total, nextAmount))
        this.data = this.data.updateIn(['byMonth', monthsDiff, 'byDay', nextDate.date() - 1, 'byHour', nextDate.hour(), 'count'], count => this.__increaseCount(count, nextAmount))
        this.data = this.data.updateIn(['byMonth', monthsDiff, 'byDay', nextDate.date() - 1, 'byHour', nextDate.hour(), 'info'], info => this.__setDateInfo(info, nextDate))
        
        // this.data = this.data.updateIn(['byWeek', nextDate.weekday(), 'byHour', nextDate.hour(), 'byMinute', nextDate.minute(), 'total'], total => this.__calculateTotal(total, nextAmount))
    }

    __calculateTotal (total, nextAmount) {
        total = total || I.Map({
            expenses: -1,
            incomes: 1,
        })

        if (nextAmount > 0)
            return total.update('incomes', prevAmount => prevAmount + nextAmount)
        else if (nextAmount < 0)
            return total.update('expenses', prevAmount => prevAmount + nextAmount)
    }

    __increaseCount (count, nextAmount) {
        count = count || I.Map({
            expenses: 0,
            incomes: 0,
        })

        if (nextAmount > 0)
            return count.update('incomes', prevCount => prevCount + 1)
        else if (nextAmount < 0)
            return count.update('expenses', prevCount => prevCount + 1)
    }

    __setDateInfo (info, nextDate) {
        return info || I.Map({
            date: nextDate.toDate(),
            weekday: nextDate.weekday(),
        })
    }

    __setExtraData (extra, weatherData, holidayData) {
        return extra || I.Map({
            weather: weatherData,
            holiday: holidayData,
        })
    }

    getRowData (o) {
        return this.data.toJS()
    }
}