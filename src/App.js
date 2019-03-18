// import React, { Component } from "react";
// import { StyleSheet, View } from "react-native";
// import { connect } from 'react-redux';

// import PlaceInput from "./components/PlaceInput/PlaceInput";
// import PlaceList from "./components/PlaceList/PlaceList";
// import PlaceDetail from "./components/PlaceDetail/PlaceDetail";
// import { addPlace, deletePlace, selectPlace, deselectPlace } from './store/actions/index';

// export class App extends Component {
//   state = {
//     places: [],
//     selectedPlace: null
//   };

//   placeAddedHandler = placeName => {
//     this.props.onAddPlace(placeName);
//   };

//   placeDeletedHandler = () => {
//     this.props.onDeletePlace();
//   };

//   modalClosedHandler = () => {
//     this.props.onDeselectPlace();
//   };

//   placeSelectedHandler = key => {
//     this.props.onSelectPlace(key);
//   };

//   render() {
//     const { places, selectedPlace } = this.props;
//     return (
//       <View style={styles.container}>
//         <PlaceDetail
//           selectedPlace={selectedPlace}
//           onItemDeleted={this.placeDeletedHandler}
//           onModalClosed={this.modalClosedHandler}
//         />
//         <PlaceInput onPlaceAdded={this.placeAddedHandler} />
//         <PlaceList
//           places={places}
//           onItemSelected={this.placeSelectedHandler}
//         />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 26,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "flex-start"
//   }
// });

// const mapStateToProps = ({ places }) => {
//   return {
//     places: places.places,
//     selectedPlace: places.selectedPlace
//   };
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     onAddPlace: (name) => dispatch(addPlace(name)),
//     onDeletePlace: () => dispatch(deletePlace()),
//     onSelectPlace: (key) => dispatch(selectPlace(key)),
//     onDeselectPlace: () => dispatch(deselectPlace())
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App);
