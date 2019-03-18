import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import Slides from '../../components/Slides';
import startTabs from '../MainTabs/startMainTabs';

const SLIDE_DATA = [
    { text: 'Welcome to Marvel App', color: '#a50000'},
    { text: 'Discover more about favorites Heroes', color: '#00991f'},
    { text: 'Start Now!', color: '#3268bd'}
];

class Home extends Component {
    onSlidesComplete = () => {
        startTabs();
    }

    render() {
        return (
            <Slides 
                data={SLIDE_DATA}
                onComplete={this.onSlidesComplete}
            />
        );
    }
}

export default Home;
