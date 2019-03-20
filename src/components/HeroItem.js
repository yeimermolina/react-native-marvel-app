import React from 'react';
import { ListItem } from 'react-native-elements';

const HeroeItem = ({ hero, onPress }) => (
    <ListItem
        leftAvatar={{ source: { uri: hero.thumbnail.path + "." + hero.thumbnail.extension }, size: "medium" }}
        title={hero.name}
        onPress={onPress}
    />
)

export { HeroeItem }
