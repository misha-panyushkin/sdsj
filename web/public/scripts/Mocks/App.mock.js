import I from 'immutable'
export default I.fromJS({


    TRANSACTIONS: {
        state: {},
        data: {},
        generic: {
            customersList: [],
            weekDaysIncomes: [],
        },
    },


    TRANSACTION_TYPES: {
        data: {
            typesAll: [],
        },
        generic: {
            typesAll: [],
        },
    },

    MCC_CODES: {
        data: {
            codesAll: [],
        },
        generic: {
            codesAll: [],
        },  
    },

    CUSTOMERS_GENDER: {
        data: {},
        generic: {
            customersGenderList: [],
        },
    },

    VISUALISATION_SETTINGS: {
        transactionTypes: [],
        mccCodes: [],
    },

    VISUALISATION_SETTINGS_UI: {
        settings: {
            visible: false,
        }
    },




    DEMO: {
        SEASONS_SERIES: {
            data: {
                series: [],
            },
            state: {

            },
            consts: {
                PROCESS: 'PROCESS'
            },
        },

        SEASONS_SERIES_BY_WEEKS: {
            ui: {
                sort: {
                    
                },
            },
        },

        SEASONS_SERIES_BY_MONTHS: {
            ui: {
                sort: {
                    
                },
                mode: {
                    datatype: 'expenses',
                    weather: {
                        active: false,
                    },
                    gridsize: {
                        active: false,
                    },
                },
            },
        },
    }
})