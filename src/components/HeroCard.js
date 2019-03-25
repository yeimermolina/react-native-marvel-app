import React from 'react';
import { Card, ListItem, Text } from 'react-native-elements';
import { StyleSheet, FlatList } from 'react-native';
import { Separator } from './Separator';

const renderComic = ({ item }, onPressComic) => (
    <ListItem
        leftAvatar={{ source: { uri: item.thumbnail.path + "." + item.thumbnail.extension }, size: "medium", rounded: false }}
        title={item.title}
        onPress={() => onPressComic(item.id, item.title)}
    />
)

const HeroCard = ({ hero, onPressComic }) => (
    <Card
        containerStyle={{ margin: 0, padding: 0, borderWidth: 0 }}
        imageStyle={{ height: 300 }}
        image={{ uri: hero.thumbnail.path + "." + hero.thumbnail.extension }}>
        <Text style={{marginBottom: 10}}>
            {hero.description || 'Description for this hero is not available'}
        </Text>
        <FlatList
          data={hero.comics}
          renderItem={(comic) => renderComic(comic, onPressComic)}
          keyExtractor={(comic) => comic.id.toString()}
          ItemSeparatorComponent={() => <Separator />}
          ListHeaderComponent={() => (
              <Text h3>Comics</Text>
          )}
        />
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
