import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { View, Text, Button, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import Wrapper from '../../hoc/Wrapper';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage';
import PickLocation from '../../components/PickLocation';
import MainText from '../../components/UI/MainText';
import HeadingText from '../../components/UI/HeadingText';
import { addPlace, startAddPlace } from '../../store/actions';
import validate from '../../utility/validation';

class SharePlaceScreen extends Component {
    static navigatorStyle =  {
        navBarButtonColor: 'red'
    }

    reset = () => {
        this.setState({
            controls: {
                placeName: {
                    value: "",
                    valid: "false",
                    touched: "false",
                    validationRules: {
                        notEmpty: true
                    }
                },
                location: {
                    value: null,
                    valid: false
                },
                image: {
                    value: null,
                    valid: false
                }
            }
        })
    }

    redirectToFindPlaces = () => {
        Navigation.mergeOptions(this.props.componentId, {
            bottomTabs: {
                currentTabIndex: 0
            }
        });
    }

    placeAddedHandler = () => {
        this.props.onAddPlace(
            this.state.controls.placeName.value, 
            this.state.controls.location.value,
            this.state.controls.image.value
        );
        this.reset();
        this.imagePicker.reset();
        this.locationPicker.reset();
    }

    placeNameChangeHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: val,
                        valid: validate(val, prevState.controls.placeName.validationRules),
                        touched: true
                    }
                }
            }
        })
    }

    locationPickedHandler = location => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    location: {
                        value: location,
                        valid: true
                    }
                }
            }
        })
    }

    imagePickedHandler = (image) => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    image: {
                        value: image,
                        valid: true
                    }
                }
            }
        })
    }

    componentWillMount() {
        this.reset();
    }

    componentDidMount() {
        this.navigationEventListener = Navigation.events().bindComponent(this);
    }

    componentWillUnmount() {
        if (this.navigationEventListener) {
            this.navigationEventListener.remove();
        }
    }

    componentDidAppear() {
        this.props.onStartAddPlace();
    }

    componentDidUpdate() {
        if (this.props.placeAdded) {
            this.redirectToFindPlaces();
            this.props.onStartAddPlace();
        }
    }

    render() {
        const { isLoading } = this.props;
        let submitButton = (
            <Button 
                title="Share Place" 
                onPress={this.placeAddedHandler}
                disabled={!this.state.controls.placeName.valid || !this.state.controls.location.valid || !this.state.controls.image.valid}
            />
        );

        if (isLoading) {
            submitButton = <ActivityIndicator />;
        }
        return (
            <ScrollView >
                <View style={styles.container}>
                    <MainText><HeadingText>Share a Place with us!</HeadingText></MainText>
                    <PickImage 
                        onImagePicked={this.imagePickedHandler}
                        ref={ref => (this.imagePicker = ref) }
                    />
                    <PickLocation 
                        onLocationPicked={this.locationPickedHandler}
                        ref={ref => (this.locationPicker = ref) }
                    />
                    <PlaceInput 
                        placeData={this.state.controls.placeName}
                        onChangeText={this.placeNameChangeHandler}
                    />
                    <View style={styles.button}>
                        {submitButton}
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    placeholder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "80%",
        height: 150
    },
    button: {
        margin: 5
    }
})

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        placeAdded: state.places.placeAdded
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image)),
        onStartAddPlace: () => dispatch(startAddPlace())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper(SharePlaceScreen));
