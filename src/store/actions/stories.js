import axios from '../../api/axios';
import { stories } from '../../api/urls';
import {
    SET_STORIES,
    SET_STORY_DETAIL,
    LOAD_MORE_STORIES,
    RESET_STORIES_FILTERS_AND_PAGINATION,
    STORY_NAME_FILTER_CHANGED,
    STORY_INCREASE_OFFSET
} from './actionTypes';
import { uiStartLoading, uiStopLoading } from './ui';

export const getStories = () => async (dispatch, getStore) => {
    dispatch(uiStartLoading());
    try {
        const filters = getStore().stories.filters;
        const pagination = getStore().stories.pagination;
        const { data } = await axios.get(stories, {
            params: {
                nameStartsWith: filters.nameStartsWith || null,
                offset: pagination.offset
            }
        });
        console.log(data.data.results);
        if (pagination.offset > 0) {
            dispatch(loadMoreStories(data.data.results));
        } else {
            dispatch(setStories(data.data.results));
        }
    } catch (e) {
        console.log('error', e.response || e);
    }
    dispatch(uiStopLoading());
}

export const getStory = (storyId) => async dispatch => {
    dispatch(uiStartLoading());
    try {
        const { data } = await axios.get(`${stories}/${storyId}`);
        console.log(data.data.results)
        dispatch(setStoryDetail({
            ...data.data.results[0]
        }));
    } catch (e) {
        console.log('error', e);
    }
    dispatch(uiStopLoading());
}

const setStories = (stories) => {
    return {
        type: SET_STORIES,
        payload: stories
    }
}

const loadMoreStories = (stories) => {
    return {
        type: LOAD_MORE_STORIES,
        payload: stories
    }
}

const setStoryDetail = (story) => ({
    type: SET_STORY_DETAIL,
    payload: story
})

export const resetStoriesFiltersAndPagination = () => ({
    type: RESET_STORIES_FILTERS_AND_PAGINATION
})

export const storyNameFilterChange = (name) => ({
    type: STORY_NAME_FILTER_CHANGED,
    payload: name
})

export const storyIncreaseOffset = () => ({
    type: STORY_INCREASE_OFFSET
})

