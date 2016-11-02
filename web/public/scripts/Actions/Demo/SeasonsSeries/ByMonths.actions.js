export const BY_MONTHS_SORT = 'BY_MONTHS_SORT'

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