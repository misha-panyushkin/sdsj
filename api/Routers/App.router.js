const _ = require('lodash');
const express = require('express');
const router = express.Router();

const d3 = require('d3');

const fs = require('fs');
const parse = require('csv-parse');

const LocalStorage = require('../Storage/local')
const WeekDaysTransactionCalculator = require('../Helpers/WeekDaysTransactionCalculator')
const SeasonsTransactionManager = require('../Helpers/SeasonsTransactionManager')

const WeatherStore = require('../data/js/weather')
const HolidayStore = require('../data/js/holidays')

router.get('/init', function (req, res, next) {
    // req.body.
    fs.readFile(__dirname+'/../data/csv/xaa.csv', 'utf8', function (err, data) {
        const transactions = d3.csvParse(data, function (d) {
            const tr_datetime = d.tr_datetime.split(' ')
            const day = +tr_datetime[0]
            const time = tr_datetime[1]

            return {
                customer_id: d.customer_id,
                day,
                time,
                mcc_code: d.mcc_code,
                tr_type: d.tr_type,
                amount: +d.amount,
                term_id: d.term_id,
            }
        });
        
        setUpTransactions(transactions)

        res.status(200).json({
            success: true
        });
    });
});

function setUpTransactions (nextTransactions) {
    console.log('transactions.length', nextTransactions.length);
        
    LocalStorage.setTransactions(nextTransactions)
    nextTransactions = LocalStorage.getStore().get('transactions')
    // const WDTC = new WeekDaysTransactionCalculator(4)
    const STM = new SeasonsTransactionManager( WeatherStore, HolidayStore )

    nextTransactions.forEach(d => {
        // WDTC.addTransaction(d)
        STM.addTransaction(d)
    })

    // LocalStorage.setDayTimeSeries(
    //     WDTC.getRowData({
    //         dataType: 'expenses',
    //     })
    // )

    LocalStorage.setSeasonsSeries(
        STM.getRowData()
    )
}

router.get('/dayTimeSeries', function (req, res, next) {
    // req.body.
    res.status(200).json({
        data: {
            series: LocalStorage.getStore().get('dayTimeSeries').toJS(),
        }
    });
});

router.get('/seasonsSeries', function (req, res, next) {
    // req.body.
    res.status(200).json({
        data: {
            series: LocalStorage.getStore().get('seasonsSeries').toJS(),
        }
    });
});

module.exports = router;