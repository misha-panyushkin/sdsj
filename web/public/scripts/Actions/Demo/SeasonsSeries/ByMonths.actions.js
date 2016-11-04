export const BY_MONTHS_SORT = 'BY_MONTHS_SORT'
export const BY_MONTHS_HOVER_COORDINATES = 'BY_MONTHS_HOVER_COORDINATES'
export const BY_MONTHS_SELECTED_COORDINATES = 'BY_MONTHS_SELECTED_COORDINATES'

export const BY_MONTHS_MODE_WEATHER = 'BY_MONTHS_MODE_WEATHER'

export function setSort ({ 
    axis,
    order,
}) {
    return {
        type: BY_MONTHS_SORT,
        axis,
        order,
    }
}

export function setHoverCoordinates ({ 
    x,
    y,
}) {
    return {
        type: BY_MONTHS_HOVER_COORDINATES,
        x,
        y,
    }
}

export function setSelectedCoordinates ({ 
    x,
    y,
}) {
    return {
        type: BY_MONTHS_SELECTED_COORDINATES,
        x,
        y,
    }
}


export function switchModeWeather (isActive) {
    return {
        type: BY_MONTHS_MODE_WEATHER,
        isActive,
    }
}