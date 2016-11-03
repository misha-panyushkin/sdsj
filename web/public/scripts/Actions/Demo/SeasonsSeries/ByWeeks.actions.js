export const BY_WEEKS_SORT = 'BY_WEEKS_SORT'
export const BY_WEEKS_HOVER_COORDINATES = 'BY_WEEKS_HOVER_COORDINATES'

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