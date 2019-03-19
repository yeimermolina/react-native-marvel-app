/** @format */
import React from 'react';
import { Navigation } from "react-native-navigation";
import { Provider } from 'react-redux';
import configureStore from './src/store/index';

import {
  HOME_SCREEN_NAME,
  HEROES_SCREEN_NAME,
  HEROE_DETAIL_SCREEN_NAME,
  COMICS_SCREEN_NAME,
  COMIC_DETAIL_SCREEN_NAME,
  STORIES_SCREEN_NAME,
  STORY_DETAIL_SCREEN_NAME,
  SIDEDRAWER_SCREEN_NAME
} from './src/constants';

import HomeScreen from './src/screens/Home';
import HeroesScreen from './src/screens/Heroes';
import HeroDetailScreen from './src/screens/HeroeDetail';
import ComicsScreen from './src/screens/Comics';
import ComicDetailScreen from './src/screens/ComicDetail';
import StoriesScreen from './src/screens/Stories';
import StoryDetailScreen from './src/screens/StoryDetail';
import SideDrawerScreen from './src/screens/SideDrawer'

const store = configureStore()

function WrappedComponent(Component) {
    return function inject(props) {
      const EnhancedComponent = () => (
        <Provider store={store}>
          <Component
            {...props}
          />
        </Provider>
      );
  
      return <EnhancedComponent />;
    };
  }


Navigation.registerComponent(HOME_SCREEN_NAME, () => WrappedComponent(HomeScreen));
Navigation.registerComponent(HEROES_SCREEN_NAME, () => WrappedComponent(HeroesScreen));
Navigation.registerComponent(HEROE_DETAIL_SCREEN_NAME, () => WrappedComponent(HeroDetailScreen));
Navigation.registerComponent(COMICS_SCREEN_NAME, () => WrappedComponent(ComicsScreen));
Navigation.registerComponent(COMIC_DETAIL_SCREEN_NAME, () => WrappedComponent(ComicDetailScreen));
Navigation.registerComponent(STORIES_SCREEN_NAME, () => WrappedComponent(StoriesScreen));
Navigation.registerComponent(STORY_DETAIL_SCREEN_NAME, () => WrappedComponent(StoryDetailScreen));
Navigation.registerComponent(SIDEDRAWER_SCREEN_NAME, () => WrappedComponent(SideDrawerScreen));


Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
        topBar: {
          background: {
            color: '#a50000'
          },
          title: {
            color: 'white',
          },
          backButton: {
            title: '', // Remove previous screen name from back button
            color: 'white'
          },
          buttonColor: 'white',
        },
        statusBar: {
          style: 'light'
        },
        layout: {
          orientation: ['portrait']
        },
        bottomTabs: {
          titleDisplayMode: 'alwaysShow'
        },
        bottomTab: {
          textColor: 'gray',
          selectedTextColor: '#a50000',
          iconColor: 'gray',
          selectedIconColor: '#a50000',
        }
    });
    Navigation.setRoot({
    root: {
        component: {
        id: 'home-screen',
        name: HOME_SCREEN_NAME
    }   
    }});
});