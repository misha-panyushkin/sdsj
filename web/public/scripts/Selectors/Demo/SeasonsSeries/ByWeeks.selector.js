import I from 'immutable'
import { 
    createSelector,
} from 'reselect'
import moment from 'moment'

const getSort = ({ state }) =>
    state.DemoSeasonsSeriesByWeeks.getIn(['ui', 'sort'], I.Map())

const getSeriesByWeeks = ({ state }) =>
    state.DemoSeasonsSeries.getIn(['data', 'series', 'byWeek'], I.List())

const ByWeeks = createSelector(
    [ getSeriesByWeeks, getSort ],
    ( seriesByWeeks, sortData ) => {

        let SeriesByWeeks = seriesByWeeks

        const xOrder = sortData.getIn(['x', 'order'])
        if (xOrder) {
            SeriesByWeeks = SeriesByWeeks.map(day => {
                const sorted = day.get('byHour').sort((a,b) => {
                    const aAbs = Math.abs(a.getIn(['total', 'expenses']))
                    const bAbs = Math.abs(b.getIn(['total', 'expenses']))
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
                const aSumm = a.get('byHour').reduce((s, v) => v.getIn(['total', 'expenses']) + s, 0)
                const bSumm = b.get('byHour').reduce((s, v) => v.getIn(['total', 'expenses']) + s, 0)
                
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
            return day.get('byHour').map(hour => hour.getIn(['total', 'expenses']))
        }).toJS()

        const SeriesByWeeksSumByOX = []
        SeriesByWeeks.forEach((d, rowIndex) => d.forEach((hv, columnIndex) => {
            SeriesByWeeksSumByOX[columnIndex] = (SeriesByWeeksSumByOX[columnIndex] || {
                value: 0,
                x: columnIndex,
                y: 0,
                state: {},
            })
            SeriesByWeeksSumByOX[columnIndex].value += hv
        }))

        const SeriesByWeeksSumByOY = []
        SeriesByWeeks.forEach((d, rowIndex) => d.forEach((hv, columnIndex) => {
            SeriesByWeeksSumByOY[rowIndex] = (SeriesByWeeksSumByOY[rowIndex] || {
                value: 0,
                x: 0,
                y: rowIndex,
                state: {},
            })
            SeriesByWeeksSumByOY[rowIndex].value += hv
        }))

        SeriesByWeeks = SeriesByWeeks.reduce((result, list, rowIndex) => result.concat(
            list.map((value, columnIndex) => ({
                value,
                x: columnIndex,
                y: rowIndex,
                state: {},
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