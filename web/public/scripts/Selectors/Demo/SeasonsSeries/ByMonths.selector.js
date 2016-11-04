import I from 'immutable'
import { 
    createSelector,
} from 'reselect'
import moment from 'moment'

const getDataType = ({ state }) =>
    state.DemoSeasonsSeriesByMonths.getIn(['ui', 'mode', 'datatype'])

const getSort = ({ state }) =>
    state.DemoSeasonsSeriesByMonths.getIn(['ui', 'sort'], I.Map())

const getSeriesByMonths = ({ state }) =>
    state.DemoSeasonsSeries.getIn(['data', 'series', 'byMonth'], I.List())

const ByMonths = createSelector(
    [ getSeriesByMonths, getSort, getDataType ],
    ( seriesByMonths, sortData, dataType ) => {

        let SeriesByMonths = seriesByMonths

        const xOrder = sortData.getIn(['x', 'order'])
        if (xOrder) {
            SeriesByMonths = SeriesByMonths.map(day => {
                const sorted = day.get('byDay').sort((a,b) => {
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

                return day.set('byDay', sorted)
            })
        }

        const yOrder = sortData.getIn(['y', 'order'])
        if (yOrder) {
            SeriesByMonths = SeriesByMonths.sort((a, b) => {
                const aSumm = a.get('byDay').reduce((s, v) => v.getIn(['total', dataType]) + s, 0)
                const bSumm = b.get('byDay').reduce((s, v) => v.getIn(['total', dataType]) + s, 0)
                
                if (aSumm < bSumm) {
                    return yOrder == 'asc' ? -1 : 1
                } else if (aSumm > bSumm) {
                    return yOrder == 'asc' ? 1 : -1
                } else {
                    return 0
                }
            })
        }

        
        const rowsLabels = SeriesByMonths.map(month => {
            const date = month.getIn(['info', 'date'])
            return moment(date).format('MMM YY')
        }).toJS()
        
        const columnsLabels = SeriesByMonths.size 
            ? SeriesByMonths.getIn([0, 'byDay']).map(d => {
                const date = d.getIn(['info', 'date'])
                return moment(date).format('D')
            }).toJS()
            : []


        SeriesByMonths = SeriesByMonths.map(month => {
            return month.get('byDay').map(day => I.Map({
                value: day.getIn(['total', dataType]),
                data: day,
            }))
        }).toJS()
        
        const SeriesByMonthsSumByOX = []
        SeriesByMonths.forEach((d, rowIndex) => d.forEach((point, columnIndex) => {
            SeriesByMonthsSumByOX[columnIndex] = (SeriesByMonthsSumByOX[columnIndex] || {
                value: 0,
                x: columnIndex,
                y: 0,
                state: {},
            })
            SeriesByMonthsSumByOX[columnIndex].value += point.value
        }))

        const SeriesByMonthsSumByOY = []
        SeriesByMonths.forEach((d, rowIndex) => d.forEach((point, columnIndex) => {
            SeriesByMonthsSumByOY[rowIndex] = (SeriesByMonthsSumByOY[rowIndex] || {
                value: 0,
                x: 0,
                y: rowIndex,
                state: {},
            })
            SeriesByMonthsSumByOY[rowIndex].value += point.value
        }))

        SeriesByMonths = SeriesByMonths.reduce((result, list, rowIndex) => result.concat(
            list.map((point, columnIndex) => ({
                value: point.value,
                x: columnIndex,
                y: rowIndex,
                state: {},
                data: point.data,
            }))
        ), [])

        return {
            SeriesByMonths,
            SeriesByMonthsSumByOX,
            SeriesByMonthsSumByOY,

            rowsLabels,
            columnsLabels,
        }
    }
)

export default ByMonths