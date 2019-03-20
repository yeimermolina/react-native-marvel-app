import React from 'react';
import { View, Text, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const HeroeCard = ({ heroe, onPress }) => (
    <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.cardContainer}>
            <View style={styles.imageContainer}>
                <Image 
                    source={
                        { uri: heroe.thumbnail.path + "." + heroe.thumbnail.extension }
                    } 
                    style={styles.heroeImage}
                />
            </View>
            <View style={styles.heroNameContainer}>
                <Text style={styles.heroName}>{heroe.name}</Text>
            </View>
            <View style={styles.heroDescriptionContainer}>
                <Text style={styles.heroDescription}>{heroe.description || 'Description not available'}</Text>
            </View>
        </View>
    </TouchableWithoutFeedback>
)

const styles = StyleSheet.create({
    cardContainer: {
        paddingBottom: 10,
        backgroundColor: 'black'
    },
    imageContainer: {
        width: "100%",
        height: 300
    },
    heroeImage: {
        width: "100%",
        height: "100%"
    },
    heroNameContainer: {
        padding: 5,
        backgroundColor: 'black',
        alignItems: 'center'
    },
    heroName: {
        fontSize: 24,
        textAlign: 'center',
        color: 'white'
    },
    heroDescriptionContainer: {
        padding: 5
    },
    heroDescription: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    }
})

export  { HeroeCard };
