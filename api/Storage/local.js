"use strict";

const I = require("immutable");

let STORE = I.Map({});

let ID_NUMBER = 0;

class LocalStorage {
    constructor () {}

    setTransactions (transactions) {
        STORE = STORE.set('transactions', I.fromJS(transactions))
    }

    setDayTimeSeries (series) {
        STORE = STORE.set('dayTimeSeries', I.fromJS(series))
    }

    setSeasonsSeries (series) {
        STORE = STORE.set('seasonsSeries', I.fromJS(series))
    }

    getStore () {
        return STORE
    }
}

module.exports = new LocalStorage;