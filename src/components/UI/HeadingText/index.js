import React from 'react';
import { Text, StyleSheet } from 'react-native';

const HeadingText = (props) => (
    <Text {...props} style={[styles.textHeading, props.style]}>{props.children}</Text>
)

const styles = StyleSheet.create({
    textHeading: {
        fontSize: 26,
        fontWeight: "bold"
    }
})

export default HeadingText;
