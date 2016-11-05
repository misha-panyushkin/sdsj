import I from 'immutable'
import { 
    createSelector,
} from 'reselect'
import moment from 'moment'

const getDataType = ({ state }) =>
    state.DemoSeasonsSeriesByWeeks.getIn(['ui', 'mode', 'datatype'])

const getWeekByDataPoints = ({ state }) =>
    state.DemoSeasonsSeriesByWeeks.getIn(['data', 'weekByDataPoints'], I.List())

const getSort = ({ state }) =>
    state.DemoSeasonsSeriesByWeeks.getIn(['ui', 'sort'], I.Map())

const getSeriesByWeeks = ({ state }) =>
    state.DemoSeasonsSeries.getIn(['data', 'series', 'byWeek'], I.List())

const ByWeeks = createSelector(
    [ getSeriesByWeeks, getSort, getWeekByDataPoints, getDataType ],
    ( seriesByWeeks, sortData, weekByDataPoints, dataType ) => {

        let SeriesByWeeks = seriesByWeeks

        if (weekByDataPoints.size) {
            
            weekByDataPoints = weekByDataPoints.map(d => d ? d.setIn(['state', 'major'], true) : d)
            SeriesByWeeks = SeriesByWeeks.map(d => d.setIn(['state', 'minor'], true))

            SeriesByWeeks = SeriesByWeeks.mergeDeepWith((prev, next) => {
                return next ? next : prev
            }, weekByDataPoints)
        }

        const xOrder = sortData.getIn(['x', 'order'])
        if (xOrder) {
            SeriesByWeeks = SeriesByWeeks.map(day => {
                const sorted = day.get('byHour').sort((a,b) => {
                    const aAbs = Math.abs(a.getIn(['total', dataType]))
                    const bAbs = Math.abs(b.getIn(['total', dataType]))
                    if (aAbs < bAbs) {
                        return xOrder == 'asc' ? -1 : 1
                    } else if (aAbs > bAbs) {
                        return xOrder == 'asc' ? 1 : -1
                    } else {
                        return 0
                    }
                })

                return day.set('byHour', sorted)
            })
        }

        const yOrder = sortData.getIn(['y', 'order'])
        if (yOrder) {
            SeriesByWeeks = SeriesByWeeks.sort((a, b) => {
                const aSumm = a.get('byHour').reduce((s, v) => v.getIn(['total', dataType]) + s, 0)
                const bSumm = b.get('byHour').reduce((s, v) => v.getIn(['total', dataType]) + s, 0)
                
                if (aSumm < bSumm) {
                    return yOrder == 'asc' ? -1 : 1
                } else if (aSumm > bSumm) {
                    return yOrder == 'asc' ? 1 : -1
                } else {
                    return 0
                }
            })
        }
        

        const rowsLabels = SeriesByWeeks.map(d => {
            const date = d.getIn(['info', 'date'])
            return moment(date).format('dd')
        }).toJS()
        
        const columnsLabels = SeriesByWeeks.size 
            ? SeriesByWeeks.getIn([0, 'byHour']).map(d => {
                const date = d.getIn(['info', 'date'])
                return moment(date).format('HH')
            }).toJS()
            : []


        SeriesByWeeks = SeriesByWeeks.map(day => {
            return day.get('byHour').map(hour => I.Map({
                value: hour.getIn(['total', dataType]),
                data: hour.set('state', day.get('state')),
            }))
        }).toJS()

        const SeriesByWeeksSumByOX = []
        SeriesByWeeks.forEach((d, rowIndex) => d.forEach((point, columnIndex) => {
            SeriesByWeeksSumByOX[columnIndex] = (SeriesByWeeksSumByOX[columnIndex] || {
                value: 1,
                x: columnIndex,
                y: 0,
                state: {},
            })
            SeriesByWeeksSumByOX[columnIndex].value += point.value
        }))

        const SeriesByWeeksSumByOY = []
        SeriesByWeeks.forEach((d, rowIndex) => d.forEach((point, columnIndex) => {
            SeriesByWeeksSumByOY[rowIndex] = (SeriesByWeeksSumByOY[rowIndex] || {
                value: 1,
                x: 0,
                y: rowIndex,
                state: {},
            })
            SeriesByWeeksSumByOY[rowIndex].value += point.value
        }))

        SeriesByWeeks = SeriesByWeeks.reduce((result, list, rowIndex) => result.concat(
            list.map((point, columnIndex) => ({
                value: point.value,
                x: columnIndex,
                y: rowIndex,
                state: {
                    major: point.data && point.data.state && point.data.state.major,
                    minor: point.data && point.data.state && point.data.state.minor,
                },
                data: point.data,
            }))
        ), [])
        
        return {
            SeriesByWeeks,
            SeriesByWeeksSumByOX,
            SeriesByWeeksSumByOY,

            rowsLabels,
            columnsLabels,
        }
    }
)

export default ByWeeks