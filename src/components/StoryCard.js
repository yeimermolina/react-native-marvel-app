import React from 'react';
import { Card, ListItem, Text } from 'react-native-elements';
import { FlatList } from 'react-native';
import { Separator } from './Separator';

const renderCreator = ({ item }) => (
    <ListItem
        title={item.name}
    />
)

const StoryCard = ({ story }) => (
    <Card
        containerStyle={{ margin: 0, padding: 0, borderWidth: 0 }}
        imageStyle={{ height: 300 }}
        image={{ uri: story.thumbnail.path + "." + story.thumbnail.extension }}>
        <Text style={{marginBottom: 10}}>
            {story.description || 'Description for this story is not available'}
        </Text>
        <FlatList
          data={story.creators.items}
          renderItem={renderCreator}
          keyExtractor={(creator) => creator.name}
          ItemSeparatorComponent={() => <Separator />}
          ListHeaderComponent={() => (
              <Text h3>Creators</Text>
          )}
        />
    </Card>
)

export  { StoryCard };