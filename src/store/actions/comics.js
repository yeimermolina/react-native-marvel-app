import axios from '../../api/axios';
import { comics } from '../../api/urls';
import {
    SET_COMICS,
    SET_COMIC_DETAIL,
    LOAD_MORE_COMICS,
    RESET_COMICS_FILTERS_AND_PAGINATION,
    COMIC_NAME_FILTER_CHANGED,
    COMIC_INCREASE_OFFSET
} from './actionTypes';
import { uiStartLoading, uiStopLoading } from './ui';

export const getComics = () => async (dispatch, getStore) => {
    dispatch(uiStartLoading());
    try {
        const filters = getStore().comics.filters;
        const pagination = getStore().comics.pagination;
        const { data } = await axios.get(comics, {
            params: {
                nameStartsWith: filters.nameStartsWith || null,
                offset: pagination.offset
            }
        });
        if (pagination.offset > 0) {
            dispatch(loadMoreComics(data.data.results));
        } else {
            dispatch(setComics(data.data.results));
        }
    } catch (e) {
        console.log('error', e.response || e);
    }
    dispatch(uiStopLoading());
}

export const getComic = (comicId) => async dispatch => {
    dispatch(uiStartLoading());
    try {
        const { data } = await axios.get(`${comics}/${comicId}`);
        const heroes = await axios.get(`${comics}/${comicId}/characters`);
        dispatch(setComicDetail({
            ...data.data.results[0],
            heroes: heroes.data.data.results
        }));
    } catch {
        console.log('error', e);
    }
    dispatch(uiStopLoading());
}

const setComics = (comics) => {
    return {
        type: SET_COMICS,
        payload: comics
    }
}

const loadMoreComics = (comics) => {
    return {
        type: LOAD_MORE_COMICS,
        payload: comics
    }
}

const setComicDetail = (comic) => ({
    type: SET_COMIC_DETAIL,
    payload: comic
})

export const resetComicsFiltersAndPagination = () => ({
    type: RESET_COMICS_FILTERS_AND_PAGINATION
})

export const comicNameFilterChange = (name) => ({
    type: COMIC_NAME_FILTER_CHANGED,
    payload: name
})

export const comicIncreaseOffset = () => ({
    type: COMIC_INCREASE_OFFSET
})

