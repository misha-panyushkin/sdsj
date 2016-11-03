export const BY_WEEKS_SORT = 'BY_WEEKS_SORT'
export const BY_WEEKS_HOVER_COORDINATES = 'BY_WEEKS_HOVER_COORDINATES'
export const BY_WEEKS_SET_UP_WEEK_BY_DATA_POINTS = 'BY_WEEKS_SET_UP_WEEK_BY_DATA_POINTS'

export function setSort ({ 
    axis,
    order,
}) {
    return {
        type: BY_WEEKS_SORT,
        axis,
        order,
    }
}

export function setHoverCoordinates ({ 
    x,
    y,
}) {
    return {
        type: BY_WEEKS_HOVER_COORDINATES,
        x,
        y,
    }
}

export function setWeekDaysByDataPoints (dataPoints) {
    return {
        type: BY_WEEKS_SET_UP_WEEK_BY_DATA_POINTS,
        dataPoints,
    }
}