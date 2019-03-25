import React from 'react';
import { Card, ListItem, Text } from 'react-native-elements';
import { FlatList } from 'react-native';
import { Separator } from './Separator';

const renderHero = ({ item }) => (
    <ListItem
        leftAvatar={{ source: { uri: item.thumbnail.path + "." + item.thumbnail.extension }, size: "medium", rounded: false }}
        title={item.name}
    />
)

const ComicCard = ({ comic }) => (
    <Card
        containerStyle={{ margin: 0, padding: 0, borderWidth: 0 }}
        imageStyle={{ height: 300 }}
        image={{ uri: comic.thumbnail.path + "." + comic.thumbnail.extension }}>
        <Text style={{marginBottom: 10}}>
            {comic.description || 'Description for this comic is not available'}
        </Text>
        <FlatList
          data={comic.heroes}
          renderItem={renderHero}
          keyExtractor={(hero) => hero.id.toString()}
          ItemSeparatorComponent={() => <Separator />}
          ListHeaderComponent={() => (
              <Text h3>Heroes</Text>
          )}
        />
    </Card>
)

export  { ComicCard };