import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import { View, FlatList, ScrollView, Button, Text, ActivityIndicator, StyleSheet } from 'react-native';

import { STORY_DETAIL_SCREEN_NAME } from '../../constants';
import { Separator } from '../../components';
import { getStories, storyIncreaseOffset } from '../../store/actions';
import Wrapper from '../../hoc/Wrapper';

class Stories extends Component {
  renderStory = ({ item }) => {
    return (
      <ListItem
        leftAvatar={{ source: { uri: item.thumbnail.path + "." + item.thumbnail.extension }}}
        title={item.title}
        onPress={() => this.handleSelectedStory(item.id, item.title)}
      />
    )
  }

  handleSelectedStory = (storyId, storyTitle) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: STORY_DETAIL_SCREEN_NAME,
        passProps: {
          storyId: storyId
        },
        options: {
          topBar: {
            title: {
              text: storyTitle
            }
          }
        }
      }
    });
  }

  onLoadMoreStories = () => {
    this.props.storyIncreaseOffset();
    this.props.getStories()
  }

  componentDidMount() {
    this.props.getStories();
  }

  render() {
    let loadMoreButton = (
      <Button 
        title="Load More Results"
        onPress={this.onLoadMoreStories}
      />
    );

    if (this.props.isLoading) {
      loadMoreButton = (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <ScrollView>
        <FlatList
          data={this.props.stories}
          renderItem={this.renderStory.bind(this)}
          keyExtractor={(story) => story.id.toString()}
          ItemSeparatorComponent={() => <Separator />}
        />
        {
          this.props.noResults ? (
            <Text>No Results</Text>
          ) : loadMoreButton
        }
        
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const mapStateToProps = ({ stories, ui }) => ({
  stories: stories.storiesList,
  noResults: stories.noResults,
  isLoading: ui.isLoading
})

export default connect(mapStateToProps, { 
  getStories,
  storyIncreaseOffset
})(Wrapper(Stories));

