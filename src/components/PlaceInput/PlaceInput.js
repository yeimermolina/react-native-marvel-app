import React from "react";
import DefaultInput from "../UI/DefaultInput";

const PlaceInput = props => (
  <DefaultInput 
    placeholder="Place Name"
    value={props.placeData.value}
    valid={props.placeData.valid}
    touched={props.placeData.touched}
    onChangeText={props.onChangeText}
  />
)

export default PlaceInput;
