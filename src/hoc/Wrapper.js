import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';

export default function Wrapper(WrappedComponent) {
    return class extends Component {
        componentDidMount() {
            this.navigationEventListener = Navigation.events().bindComponent(this);
          }
        
        componentWillUnmount() {
            // Not mandatory
            if (this.navigationEventListener) {
                this.navigationEventListener.remove();
            }
            Navigation.mergeOptions(this.props.componentId, {
                sideMenu: {
                    left: {
                        visible: false
                    }
                }
            });
        }
        
        navigationButtonPressed({ buttonId }) {
            if (buttonId === 'nav_user_btn') {
                Navigation.mergeOptions(this.props.componentId, {
                    sideMenu: {
                        left: {
                            visible: true
                        },
                        right: {
                            visible: false
                        }
                    }
                });
            }

            if (buttonId === 'nav_user_filters') {
                Navigation.mergeOptions(this.props.componentId, {
                    sideMenu: {
                        right: {
                            visible: true
                        },
                        left: {
                            visible: false
                        }
                    }
                });
            }
        }

        // componentWillMount() {
        //     Navigation.mergeOptions(this.props.componentId, {
        //         sideMenu: {
        //             left: {
        //                 visible: false
        //             }
        //         }
        //     });
        // }

        render() {
            return (
                <WrappedComponent {...this.props} />
            )
        }
    }
}