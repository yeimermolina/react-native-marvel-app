import { SET_HEROES, SET_HERO_DETAIL } from '../actions/actionTypes';

const initialState = {
    heroesList: [],
    heroDetail: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_HEROES:
            return {
                ...state,
                heroesList: action.payload
            }
        case SET_HERO_DETAIL:
            return {
                ...state,
                heroDetail: action.payload
            }
        default:
            return state;
    }
}