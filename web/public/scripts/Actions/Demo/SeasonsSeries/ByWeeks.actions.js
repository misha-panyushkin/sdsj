export const BY_WEEKS_SORT = 'BY_WEEKS_SORT'
export const BY_WEEKS_HOVER_COORDINATES = 'BY_WEEKS_HOVER_COORDINATES'
export const BY_WEEKS_SET_UP_WEEK_BY_DATA_POINTS = 'BY_WEEKS_SET_UP_WEEK_BY_DATA_POINTS'

export const BY_WEEKS_MODE_DATA_TYPE = 'BY_WEEKS_MODE_DATA_TYPE'
export const BY_WEEKS_MODE_GRIDSIZE = 'BY_WEEKS_MODE_GRIDSIZE'

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

export function switchModeDataType (dataType) {
    return {
        type: BY_WEEKS_MODE_DATA_TYPE,
        dataType,
    }
}

export function switchModeGridSize (isActive) {
    return {
        type: BY_WEEKS_MODE_GRIDSIZE,
        isActive,
    }
}