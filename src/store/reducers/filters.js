import { NAME_STARTS_WITH_CHANGE, RESET_FILTERS } from '../actions/actionTypes';

const initialState = {
    offset: 0,
    limit: 20,
    nameStartsWith: '',
    orderBy: 'name',
    orderOptions: [
        'name',
        'modified',
        '-name',
        '-modified'
    ]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case NAME_STARTS_WITH_CHANGE:
            return {
                ...state,
                nameStartsWith: action.payload
            };
        case RESET_FILTERS:
            return initialState;
        default:
            return state;
    }
}