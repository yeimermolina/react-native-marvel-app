import { 
    SET_STORIES,
    SET_STORY_DETAIL,
    LOAD_MORE_STORIES,
    RESET_STORIES_FILTERS_AND_PAGINATION,
    STORY_NAME_FILTER_CHANGED,
    STORY_INCREASE_OFFSET
} from '../actions/actionTypes';

const initialState = {
    storiesList: [],
    storyDetail: null,
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
        case SET_STORIES:
            return {
                ...state,
                storiesList: action.payload,
                noResults: action.payload.length === 0
            }
        case SET_STORY_DETAIL:
            return {
                ...state,
                storyDetail: action.payload
            }
        case LOAD_MORE_STORIES:
            return {
                ...state,
                storiesList: [
                    ...state.storiesList,
                    ...action.payload
                ],
                noResults: action.payload.length === 0
            }
        case RESET_STORIES_FILTERS_AND_PAGINATION:
            return {
                ...state,
                pagination: {
                    ...initialState.pagination
                }
            }
        case STORY_NAME_FILTER_CHANGED:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    nameStartsWith: action.payload
                }
            }
        case STORY_INCREASE_OFFSET: 
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