import { SET_HEROES } from '../actions/actionTypes';

const initialState = {
    heroesList: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_HEROES:
            return {
                ...state,
                heroesList: action.payload
            }
        default:
            return state;
    }
}