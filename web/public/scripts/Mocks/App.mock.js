import I from 'immutable'
export default I.fromJS({


    TRANSACTIONS: {
        state: {},
        data: {},
        generic: {
            customersList: [],
            weekDays: [],
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
})