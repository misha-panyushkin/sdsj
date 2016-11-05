import I from 'immutable'
import APP_MOCKS from 'Mocks/App.mock'

import {
    BY_WEEKS_SORT,
    BY_WEEKS_HOVER_COORDINATES,
    BY_WEEKS_SET_UP_WEEK_BY_DATA_POINTS,

    BY_WEEKS_MODE_DATA_TYPE,
    BY_WEEKS_MODE_GRIDSIZE,
    BY_WEEKS_MODE_SCALE_LOG,
} from 'Actions/Demo/SeasonsSeries/ByWeeks.actions'

const DEFAULT_STATE = APP_MOCKS.getIn(['DEMO', 'SEASONS_SERIES_BY_WEEKS'])

export default function ByWeeksUI (state = DEFAULT_STATE, action) {
    let nextState = state
    let nextWeekByDataPoints
    
    switch (action.type) {


        case BY_WEEKS_SORT:
            nextState = nextState.setIn(['ui', 'sort', action.axis, 'order'], action.order)
            return nextState


        case BY_WEEKS_HOVER_COORDINATES:
            
            if (!isNaN(action.x)) {
                nextState = nextState.setIn(['ui', 'hover', 'x'], action.x)
            } else {
                nextState = nextState.deleteIn(['ui', 'hover', 'x'])
            }
            
            if (!isNaN(action.y)) {
                nextState = nextState.setIn(['ui', 'hover', 'y'], action.y)
            } else {
                nextState = nextState.deleteIn(['ui', 'hover', 'y'])
            }

            return nextState


        case BY_WEEKS_SET_UP_WEEK_BY_DATA_POINTS:

            nextWeekByDataPoints = I.List()
            action.dataPoints.map(dataPoint => {
                const weekDay = dataPoint.info.weekday
                let nextDay = I.fromJS(dataPoint)
                
                for (var i = 0; i < 24; i++) {
                    nextDay = nextDay.updateIn(['byHour', i], hour => hour || I.fromJS({
                        total: {
                            expenses: -1,
                            incomes: 1,
                        },
                        count: {
                            expenses: -1,
                            incomes: 1,
                        }
                    }))
                }

                nextWeekByDataPoints = nextWeekByDataPoints.set(weekDay, nextDay)
            })
            nextState = nextState.setIn(['data', 'weekByDataPoints'], nextWeekByDataPoints)
            return nextState


        case BY_WEEKS_MODE_DATA_TYPE:
            nextState = nextState.updateIn(['ui', 'mode', 'datatype'], () => action.dataType)
            return nextState

        case BY_WEEKS_MODE_GRIDSIZE:
            nextState = nextState.updateIn(['ui', 'mode', 'gridsize', 'active'], active => typeof action.isActive == "boolean" ? action.isActive : !active)
            return nextState

        case BY_WEEKS_MODE_SCALE_LOG:
            nextState = nextState.updateIn(['ui', 'mode', 'scalelog', 'active'], active => typeof action.isActive == "boolean" ? action.isActive : !active)
            return nextState

        default:
            return nextState
    }
}