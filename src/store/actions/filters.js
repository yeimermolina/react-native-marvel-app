import { NAME_STARTS_WITH_CHANGE, RESET_FILTERS } from './actionTypes';

export const nameStartsWithChange = (name) => {
    return {
        type: NAME_STARTS_WITH_CHANGE,
        payload: name
    }
}

export const resetFilters = () => ({
    type: RESET_FILTERS
});