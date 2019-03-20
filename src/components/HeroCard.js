import React from 'react';
import { Card } from 'react-native-elements';
import { Text, StyleSheet } from 'react-native';

const HeroCard = ({ hero }) => (
    <Card
        containerStyle={{ margin: 0, padding: 0, borderWidth: 0 }}
        imageStyle={{ height: 300 }}
        image={{ uri: hero.thumbnail.path + "." + hero.thumbnail.extension }}>
        <Text style={{marginBottom: 10}}>
            {hero.description || 'Description for this hero is not available'}
        </Text>
        {/* <Button
            icon={<Icon name='code' color='#ffffff' />}
            backgroundColor='#03A9F4'
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title='VIEW NOW' /> */}
    </Card>
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

export  { HeroCard };
