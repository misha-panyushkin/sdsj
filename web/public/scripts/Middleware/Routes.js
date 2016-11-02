import I from 'immutable'

export const Routes = I.Map({
    'getSeasonsSeries': I.Map({
        path: '/demo/seasonsSeries',
        params: I.Map({
            method: 'GET',
            credentials: 'same-origin',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }),
        }),
    }),
})