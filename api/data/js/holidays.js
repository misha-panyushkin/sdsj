"use strict"

const I = require("immutable");
const moment = require('moment')

const HolidaysList = [
    {
        data: {
            name: 'Unity Day',
        },
        date: {
            year: 2014,
            month: 11,
            day: 3,
        },
    },
    {
        data: {
            name: 'Unity Day',
        },
        date: {
            year: 2014,
            month: 11,
            day: 4,
        },
    },

    {
        data: {
            name: 'New Year',
        },
        date: {
            year: 2015,
            month: 1,
            day: 1,
        },
    },
    {
        data: {
            name: 'New Year',
        },
        date: {
            year: 2015,
            month: 1,
            day: 2,
        },
    },
    {
        data: {
            name: 'New Year',
        },
        date: {
            year: 2015,
            month: 1,
            day: 3,
        },
    },
    {
        data: {
            name: 'New Year',
        },
        date: {
            year: 2015,
            month: 1,
            day: 4,
        },
    },
    {
        data: {
            name: 'New Year',
        },
        date: {
            year: 2015,
            month: 1,
            day: 5,
        },
    },
    {
        data: {
            name: 'New Year',
        },
        date: {
            year: 2015,
            month: 1,
            day: 6,
        },
    },
    {
        data: {
            name: 'New Year',
        },
        date: {
            year: 2015,
            month: 1,
            day: 7,
        },
    },
    {
        data: {
            name: 'New Year',
        },
        date: {
            year: 2015,
            month: 1,
            day: 8,
        },
    },
    {
        data: {
            name: 'New Year',
        },
        date: {
            year: 2015,
            month: 1,
            day: 9,
        },
    },
    {
        data: {
            name: 'New Year',
        },
        date: {
            year: 2015,
            month: 1,
            day: 10,
        },
    },
    {
        data: {
            name: 'New Year',
        },
        date: {
            year: 2015,
            month: 1,
            day: 11,
        },
    },

    {
        data: {
            name: "Defender's Day",
        },
        date: {
            year: 2015,
            month: 2,
            day: 21,
        },
    },
    {
        data: {
            name: "Defender's Day",
        },
        date: {
            year: 2015,
            month: 2,
            day: 22,
        },
    },
    {
        data: {
            name: "Defender's Day",
        },
        date: {
            year: 2015,
            month: 2,
            day: 23,
        },
    },

    {
        data: {
            name: 'Women Day',
        },
        date: {
            year: 2015,
            month: 3,
            day: 7,
        },
    },
    {
        data: {
            name: 'Women Day',
        },
        date: {
            year: 2015,
            month: 3,
            day: 8,
        },
    },
    {
        data: {
            name: 'Women Day',
        },
        date: {
            year: 2015,
            month: 3,
            day: 9,
        },
    },
    

    {
        data: {
            name: 'Spring and Labour Day',
        },
        date: {
            year: 2015,
            month: 5,
            day: 1,
        },
    },
    {
        data: {
            name: 'Spring and Labour Day',
        },
        date: {
            year: 2015,
            month: 5,
            day: 2,
        },
    },
    {
        data: {
            name: 'Spring and Labour Day',
        },
        date: {
            year: 2015,
            month: 5,
            day: 3,
        },
    },
    {
        data: {
            name: 'Spring and Labour Day',
        },
        date: {
            year: 2015,
            month: 5,
            day: 4,
        },
    },

    {
        data: {
            name: 'Victory Day',
        },
        date: {
            year: 2015,
            month: 5,
            day: 9,
        },
    },
    {
        data: {
            name: 'Victory Day',
        },
        date: {
            year: 2015,
            month: 5,
            day: 10,
        },
    },
    {
        data: {
            name: 'Victory Day',
        },
        date: {
            year: 2015,
            month: 5,
            day: 11,
        },
    },

    {
        data: {
            name: 'Russia Day',
        },
        date: {
            year: 2015,
            month: 6,
            day: 12,
        },
    },
    {
        data: {
            name: 'Russia Day',
        },
        date: {
            year: 2015,
            month: 6,
            day: 13,
        },
    },
    {
        data: {
            name: 'Russia Day',
        },
        date: {
            year: 2015,
            month: 6,
            day: 14,
        },
    },


    {
        data: {
            name: 'Unity Day',
        },
        date: {
            year: 2015,
            month: 11,
            day: 4,
        },
    },
]

let HolidaysStore = I.Map() 

HolidaysList.map(v => {
    HolidaysStore = HolidaysStore.setIn([v.date.year, v.date.month, v.date.day], I.fromJS(v))
})

module.exports = HolidaysStore