import axios from '../../api/axios';
import { heroes } from '../../api/urls';
import {
    SET_HEROES,
    SET_HERO_DETAIL,
    LOAD_MORE_HEROES,
    RESET_HEROES_FILTERS_AND_PAGINATION,
    HERO_NAME_FILTER_CHANGED,
    HERO_INCREASE_OFFSET
} from './actionTypes';

export const getHeroes = () => async (dispatch, getStore) => {
    try {
        const filters = getStore().heroes.filters;
        const pagination = getStore().heroes.pagination;
        const { data } = await axios.get(heroes, {
            params: {
                nameStartsWith: filters.nameStartsWith || null,
                offset: pagination.offset
            }
        });
        if (pagination.offset > 0) {
            dispatch(loadMoreHeroes(data.data.results));
        } else {
            dispatch(setHeroes(data.data.results));
        }
        
    } catch (e) {
        console.log('error', e.response || e);
    }
}

export const getHero = (heroId) => async dispatch => {
    try {
        const { data } = await axios.get(`${heroes}/${heroId}`);
        dispatch(setHeroeDetail(data.data.results[0]));
    } catch {
        console.log('error', e);
    }
}

const setHeroes = (heroes) => {
    return {
        type: SET_HEROES,
        payload: heroes
    }
}

const loadMoreHeroes = (heroes) => {
    return {
        type: LOAD_MORE_HEROES,
        payload: heroes
    }
}

const setHeroeDetail = (hero) => ({
    type: SET_HERO_DETAIL,
    payload: hero
})

export const resetHeroesFiltersAndPagination = () => ({
    type: RESET_HEROES_FILTERS_AND_PAGINATION
})

export const heroNameFilterChange = (name) => ({
    type: HERO_NAME_FILTER_CHANGED,
    payload: name
})

export const heroIncreaseOffset = () => ({
    type: HERO_INCREASE_OFFSET
})

