export const BY_MONTHS_SORT = 'BY_MONTHS_SORT'
export const BY_MONTHS_HOVER_COORDINATES = 'BY_MONTHS_HOVER_COORDINATES'

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