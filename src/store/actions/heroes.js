import axios from '../../api/axios';
import { heroes } from '../../api/urls';
import {
    SET_HEROES,
    SET_HERO_DETAIL
} from './actionTypes';

export const getHeroes = () => async dispatch => {
    try {
        const { data } = await axios.get(heroes);
        dispatch(setHeroes(data.data.results));
    } catch (e) {
        console.log('error', e);
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

const setHeroeDetail = (hero) => ({
    type: SET_HERO_DETAIL,
    payload: hero
})

