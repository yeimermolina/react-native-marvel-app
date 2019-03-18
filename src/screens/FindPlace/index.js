import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import Wrapper from '../../hoc/Wrapper';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';

import PlaceList from '../../components/PlaceList/PlaceList';
import { getPlaces } from '../../store/actions';

class FindPlaceScreen extends Component {
  state = {
    placesLoaded: false,
    removeAnim: new Animated.Value(1)
  }

  placesSearchHandler = () => {
    Animated.timing(this.state.removeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        placesLoaded: true
      });
      this.placesLoadedHandler();
    });
    // this.setState({ placesLoaded: true });
  }

  placesLoadedHandler = () => {

  }

  itemSelectedHandler = key => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'awesome-places.PlaceDetailScreen',
        passProps: {
          text: 'Pushed screen',
          selectedPlace: this.props.places.find(place => place.key === key)
        },
        options: {
          topBar: {
            title: {
              text: 'Place Detail'
            }
          }
        }
      }
    });
    }

    componentDidMount () {
      this.navigationEventListener = Navigation.events().bindComponent(this);
    }

    componentWillUnmount() {
      if (this.navigationEventListener) {
          this.navigationEventListener.remove();
      }
    }

    componentDidAppear() {
      this.props.onLoadPlaces();
  }

    render() {
      let content = (
        <Animated.View 
          style={{
            opacity: this.state.removeAnim,
            transform: [
              {
                scale: this.state.removeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [12, 1]
                })
              }
            ]
          }}
        >
          <TouchableOpacity onPress={this.placesSearchHandler}>
            <View style={styles.searchButton}>
              <Text style={styles.searchButtonText}>Find Places</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
        
      );

      if(this.state.placesLoaded) {
        content = (
          <PlaceList 
            places={this.props.places}
            onItemSelected={this.itemSelectedHandler}
          />
        )
      }

      return (
        <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
          {content}
        </View>
      );
    }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchButton: {
    borderColor: 'orange',
    borderWidth: 3,
    borderRadius: 50,
    padding: 20
  },
  searchButtonText: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 26
  }
});

const mapStateToProps = state => {
    return {
      places: state.places.places  
    };
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadPlaces: () => dispatch(getPlaces())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper(FindPlaceScreen));
