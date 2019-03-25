import { 
    SET_COMICS,
    SET_COMIC_DETAIL,
    LOAD_MORE_COMICS,
    RESET_COMICS_FILTERS_AND_PAGINATION,
    COMIC_NAME_FILTER_CHANGED,
    COMIC_INCREASE_OFFSET
} from '../actions/actionTypes';

const initialState = {
    comicsList: [],
    comicDetail: null,
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
        case SET_COMICS:
            return {
                ...state,
                comicsList: action.payload,
                noResults: action.payload.length === 0
            }
        case SET_COMIC_DETAIL:
            return {
                ...state,
                comicDetail: action.payload
            }
        case LOAD_MORE_COMICS:
            return {
                ...state,
                comicsList: [
                    ...state.comicsList,
                    ...action.payload
                ],
                noResults: action.payload.length === 0
            }
        case RESET_COMICS_FILTERS_AND_PAGINATION:
            return {
                ...state,
                pagination: {
                    ...initialState.pagination
                }
            }
        case COMIC_NAME_FILTER_CHANGED:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    nameStartsWith: action.payload
                }
            }
        case COMIC_INCREASE_OFFSET: 
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