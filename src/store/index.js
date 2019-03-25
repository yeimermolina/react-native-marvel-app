import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import uiReducer from './reducers/ui';
import heroesReducer from './reducers/heroes';
import comicsReducer from './reducers/comics';
import storiesReducer from './reducers/stories';

const rootReducer = combineReducers({
    ui: uiReducer,
    heroes: heroesReducer,
    comics: comicsReducer,
    stories: storiesReducer
});

const store = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
};

export default store;
