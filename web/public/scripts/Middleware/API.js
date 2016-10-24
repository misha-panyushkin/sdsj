import fetch from 'isomorphic-fetch'
import { CONFIG } from 'Configuration/Config'

const API_ROOT = CONFIG.get('API_ROOT');

function FETCH_API (route, data) {
    return fetch(
        API_ROOT.concat(route.get('path')), 
        Object.assign(route.get('params').toJS(), {
            body: JSON.stringify(data)
        })

    ).then(response => {
        var contentType = response.headers.get("content-type");
        if(contentType && contentType.indexOf("application/json") !== -1) {
            return response.json().then(json => ({ json, response }));

        } else {
            console.log('Not a JSON');
            return Promise.reject('Not a JSON');

        }

    }).then(({ json, response }) => {
        if (!response.ok) {
            return Promise.reject(json)
        }

        return json;
    })
}

export const API_CALL = Symbol('API_Symbol');

export default store => next => action => {
    const API_CALL_DATA = action[API_CALL];

    if (typeof API_CALL_DATA === 'undefined') {
        return next(action);
    }

    const { 
        route,
        types,
        data
    } = API_CALL_DATA;

    if (!route) {
        throw new Error('Route parameter is undefined.')
    }
    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.')
    }
    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.')
    }

    function constructRequestParams (extra) {
        const fullParams = Object.assign({}, action, extra)
        delete fullParams[API_CALL]
        return fullParams
    }

    const [ requestType, successType, failureType ] = types
    next(constructRequestParams({ type: requestType }))

    return FETCH_API(route, data).then(
        response => next(constructRequestParams({
            response,
            type: successType
        })),
        error => next(constructRequestParams({
            type: failureType,
            error: error.message || 'Something bad happened'
        }))
    )
};