import { INCREASE_PAGINATION_OFFSET, RESET_PAGINATION } from '../actions/actionTypes';

const initialState = {
    offset: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case INCREASE_PAGINATION_OFFSET:
            return {
                ...state,
                offset: state.offset + 20
            };
        case RESET_PAGINATION:
            return initialState;
        default:
            return state;
    }
}