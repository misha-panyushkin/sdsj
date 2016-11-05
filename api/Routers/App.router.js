const _ = require('lodash');
const express = require('express');
const router = express.Router();
const logger = require('../logs/manager');

const d3 = require('d3');

const fs = require('fs');
const parse = require('csv-parse');
const async = require('async');

const LocalStorage = require('../Storage/local')
const WeekDaysTransactionCalculator = require('../Helpers/WeekDaysTransactionCalculator')
const SeasonsTransactionManager = require('../Helpers/SeasonsTransactionManager')

const WeatherStore = require('../data/js/weather')
const HolidayStore = require('../data/js/holidays')

const STM = new SeasonsTransactionManager( WeatherStore, HolidayStore )

router.get('/init', function (req, res, next) {
    // req.body.
    res.status(200).json({
        success: true,
        process: 'started',
    });

    logger.log('Initialisation process started.', 'Good luck!');

    fs.readdir(__dirname + '/../data/csv/splits/', function(err, filenames) {

        logger.log('Files length:', filenames.length);

        async.eachOfSeries(
            filenames.map(filename => __dirname+'/../data/csv/splits/' + filename),
            (filename, index, callback) => {

                logger.log('Pack #', index + 1, ' process started.');

                fs.readFile(filename, 'utf8', function (err, data) {
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
                    callback()
                });
            },
            () => {
                LocalStorage.setSeasonsSeries(
                    STM.getRowData()
                );
                const seriesString = JSON.stringify( LocalStorage.getStore().get('seasonsSeries').toJS() );
                fs.writeFile(__dirname + '/../data/seasons/series.json', seriesString, error => {
                    if (err) return logger.log('Process write final file error:', error);
                    logger.log('Season series been sucessfully wrote to disk.');
                })
                logger.log('Initialisation process has been successfully finished.', 'Check out the web interface. Bye!');
            }
        )
    });
});

function setUpTransactions (nextTransactions) {
    logger.log('Current transaction pack length:', nextTransactions.length);
        
    // LocalStorage.setTransactions(nextTransactions)
    // nextTransactions = LocalStorage.getStore().get('transactions')
    // const WDTC = new WeekDaysTransactionCalculator(4)

    nextTransactions.forEach(d => {
        // WDTC.addTransaction(d)
        STM.addTransaction(d)
    })

    // LocalStorage.setDayTimeSeries(
    //     WDTC.getRowData({
    //         dataType: 'expenses',
    //     })
    // )
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
    fs.readFile(__dirname + '/../data/seasons/series.json', 'utf8', function (err, data) {
        res.status(200).json({
            data: {
                series: JSON.parse(data),
            }
        });
    });
});

module.exports = router;