import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import placesReducer from './reducers/places';
import uiReducer from './reducers/ui';
import authReducer from './reducers/auth';
import heroesReducer from './reducers/heroes';
import filtersReducer from './reducers/filters';
import paginationReducer from './reducers/pagination'

const rootReducer = combineReducers({
    places: placesReducer,
    ui: uiReducer,
    auth: authReducer,
    heroes: heroesReducer,
    filters: filtersReducer,
    pagination: paginationReducer
});

const store = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
};

export default store;
