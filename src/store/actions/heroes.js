import axios from '../../api/axios';
import { heroes } from '../../api/urls';
import { SET_HEROES } from './actionTypes';

export const getHeroes = () => async dispatch => {
    try {
        const { data } = await axios.get(heroes);
        dispatch(setHeroes(data.data.results));
    } catch (e) {
        console.log('error', e);
    }
}

const setHeroes = (heroes) => {
    return {
        type: SET_HEROES,
        payload: heroes
    }
}

