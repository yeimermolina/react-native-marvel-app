import React from 'react';
import { Provider } from 'react-redux';
import Main from './src/App';
import configureStore from './src/store/index';
const store = configureStore()

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Main />
            </Provider>
        )
    }
}