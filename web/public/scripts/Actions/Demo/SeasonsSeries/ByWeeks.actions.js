export const BY_WEEKS_SORT = 'BY_WEEKS_SORT'

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