import I from 'immutable'
import { 
    createSelector,
} from 'reselect'
import moment from 'moment'

const getSort = ({ state }) =>
    state.DemoSeasonsSeriesByMonths.getIn(['ui', 'sort'], I.Map())

const getSeriesByMonths = ({ state }) =>
    state.DemoSeasonsSeries.getIn(['data', 'series', 'byMonth'], I.List())

const ByMonths = createSelector(
    [ getSeriesByMonths, getSort ],
    ( seriesByMonths, sortData ) => {

        let SeriesByMonths = seriesByMonths

        const xOrder = sortData.getIn(['x', 'order'])
        if (xOrder) {
            SeriesByMonths = SeriesByMonths.map(day => {
                const sorted = day.get('byDay').sort((a,b) => {
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

                return day.set('byDay', sorted)
            })
        }

        const yOrder = sortData.getIn(['y', 'order'])
        if (yOrder) {
            SeriesByMonths = SeriesByMonths.sort((a, b) => {
                const aSumm = a.get('byDay').reduce((s, v) => v.getIn(['total', 'expenses']) + s, 0)
                const bSumm = b.get('byDay').reduce((s, v) => v.getIn(['total', 'expenses']) + s, 0)
                
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
            return month.get('byDay').map(day => day.getIn(['total', 'expenses']))
        }).toJS()

        
        const SeriesByMonthsSumByOX = []
        SeriesByMonths.forEach((d, rowIndex) => d.forEach((hv, columnIndex) => {
            SeriesByMonthsSumByOX[columnIndex] = (SeriesByMonthsSumByOX[columnIndex] || {
                value: 0,
                x: columnIndex,
                y: 0,
            })
            SeriesByMonthsSumByOX[columnIndex].value += hv
        }))

        const SeriesByMonthsSumByOY = []
        SeriesByMonths.forEach((d, rowIndex) => d.forEach((hv, columnIndex) => {
            SeriesByMonthsSumByOY[rowIndex] = (SeriesByMonthsSumByOY[rowIndex] || {
                value: 0,
                x: 0,
                y: rowIndex,
            })
            SeriesByMonthsSumByOY[rowIndex].value += hv
        }))

        SeriesByMonths = SeriesByMonths.reduce((result, list, rowIndex) => result.concat(
            list.map((value, columnIndex) => ({
                value,
                x: columnIndex,
                y: rowIndex,
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