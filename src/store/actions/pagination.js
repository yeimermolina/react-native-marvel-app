import { INCREASE_PAGINATION_OFFSET, RESET_PAGINATION } from './actionTypes';

export const resetPagination = () => {
    return {
        type: RESET_PAGINATION
    }
}

export const increasePaginationOffset = () => {
    return {
        type: INCREASE_PAGINATION_OFFSET
    }
}