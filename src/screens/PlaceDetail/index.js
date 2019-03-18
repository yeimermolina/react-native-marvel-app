import React, { Component } from "react";
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { View, Image, Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from "react-native";
import { deletePlace} from '../../store/actions'
import MapView from 'react-native-maps';


class PlaceDetail extends Component {
  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    Navigation.pop(this.props.componentId);
  }
  render () {
    return (
      <View style={styles.container}>
        <View>
          <View>
            <MapView
              initialRegion={{
                ...this.props.selectedPlace.location,
                latitudeDelta: 0.0122,
                longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
              }}
              style={styles.map}
            >
              <MapView.Marker coordinate={this.props.selectedPlace.location} />
            </MapView>
          </View>
          <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
        </View>
        <View>
            <TouchableOpacity onPress={this.placeDeletedHandler}>
              <View style={styles.deleteButton}>
              <Icon size={30} name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} color="red" />
                <Text>Delete</Text>
              </View>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22
  },
  placeImage: {
    width: "100%",
    height: 200
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  deleteButton: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  map: {
    width: "100%",
    height: 250
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: key => dispatch(deletePlace(key))
  };
};

export default connect(null, mapDispatchToProps)(PlaceDetail);
