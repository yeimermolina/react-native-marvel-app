import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { 
  HEROES_SCREEN_NAME,
  COMICS_SCREEN_NAME,
  STORIES_SCREEN_NAME
} from '../../constants';

const startTabs = () => {
    Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? 'md-body' : 'ios-body', 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-paper' : 'ios-paper', 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-star' : 'ios-star', 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-menu' : 'ios-menu', 30)
    ]).then(sources => {
          Navigation.setRoot({
            root: {
              sideMenu: {
                left: {
                  component: {
                    name: 'awesome-places.SideDrawerScreen',
                  }
                },
                center: {
                  bottomTabs: {
                    id: 'tabs',
                    options: {
                      topbar: {
                        visible: true,
                      }
                    },
                    children: [
                      {
                        stack: {
                          id: 'tab1',
                          children: [
                            {
                              component: {
                                name: HEROES_SCREEN_NAME,
                                options: {
                                    topBar: {
                                        title: {
                                            text: 'HEROES'
                                        },
                                        leftButtons: [
                                            {
                                            id: 'nav_user_btn',
                                            icon: sources[3],
                                            color: 'white',
                                            title: 'Menu'
                                            }
                                        ]
                                  },
                                  bottomTab: {
                                    fontSize: 12,
                                    text: 'Heroes',
                                    icon: sources[0],
                                  }
                                }
                              },
                            },
                          ]
                        }
                      },
                      {
                        stack: {
                          id: 'tab2',
                          children: [
                            {
                              component: {
                                name: COMICS_SCREEN_NAME,
                                options: {
                                  topBar: {
                                    title: {
                                        text: 'COMICS'
                                    },
                                    leftButtons: [
                                        {
                                        id: 'nav_user_btn',
                                        icon: sources[3],
                                        color: 'white',
                                        title: 'Menu'
                                        }
                                    ]
                                },
                                  bottomTab: {
                                    id: 'comics',
                                    text: 'Comics',
                                    fontSize: 12,
                                    icon: sources[1],
                                  }
                                }
                              },
                            },
                          ]
                        }
                      },
                      {
                        stack: {
                          id: 'tab2',
                          children: [
                            {
                              component: {
                                name: STORIES_SCREEN_NAME,
                                options: {
                                  topBar: {
                                    title: {
                                        text: 'STORIES'
                                    },
                                    leftButtons: [
                                        {
                                        id: 'nav_user_btn',
                                        icon: sources[3],
                                        color: 'white',
                                        title: 'Menu'
                                        }
                                    ]
                                },
                                  bottomTab: {
                                    id: 'stories',
                                    text: 'STORIES',
                                    fontSize: 12,
                                    icon: sources[2],
                                  }
                                }
                              },
                            },
                          ]
                        }
                      },
                    ],
                  },
                }
              }
            }
          });



    });
    
    
    
}

export default startTabs;
