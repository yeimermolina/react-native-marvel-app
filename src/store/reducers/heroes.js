import { 
    SET_HEROES,
    SET_HERO_DETAIL,
    LOAD_MORE_HEROES,
    RESET_HEROES_FILTERS_AND_PAGINATION,
    HERO_NAME_FILTER_CHANGED,
    HERO_INCREASE_OFFSET
} from '../actions/actionTypes';

const initialState = {
    heroesList: [],
    heroDetail: {},
    noResults: false,
    filters: {
        nameStartsWith: ''
    },
    pagination: {
        offset: 0,
        limit: 20
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_HEROES:
            return {
                ...state,
                heroesList: action.payload,
                noResults: action.payload.length === 0
            }
        case SET_HERO_DETAIL:
            return {
                ...state,
                heroDetail: action.payload
            }
        case LOAD_MORE_HEROES:
            return {
                ...state,
                heroesList: [
                    ...state.heroesList,
                    ...action.payload
                ],
                noResults: action.payload.length === 0
            }
        case RESET_HEROES_FILTERS_AND_PAGINATION:
            return {
                ...state,
                pagination: {
                    ...initialState.pagination
                }
            }
        case HERO_NAME_FILTER_CHANGED:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    nameStartsWith: action.payload
                }
            }
        case HERO_INCREASE_OFFSET: 
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    offset: state.pagination.offset + 20
                }
            }
        default:
            return state;
    }
}