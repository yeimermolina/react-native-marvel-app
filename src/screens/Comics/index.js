import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import { View, FlatList, ScrollView, Button, Text, ActivityIndicator, StyleSheet } from 'react-native';

import { COMIC_DETAIL_SCREEN_NAME } from '../../constants';
import { Separator } from '../../components';
import { getComics, comicIncreaseOffset } from '../../store/actions';
import Wrapper from '../../hoc/Wrapper';

class Comics extends Component {
  renderComic = ({ item }) => {
    return (
      <ListItem
        leftAvatar={{ source: { uri: item.thumbnail.path + "." + item.thumbnail.extension }}}
        title={item.title}
        onPress={() => this.handleSelectedComic(item.id, item.title)}
      />
    )
  }

  handleSelectedComic = (comicId, comicTitle) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: COMIC_DETAIL_SCREEN_NAME,
        passProps: {
          comicId: comicId
        },
        options: {
          topBar: {
            title: {
              text: comicTitle
            }
          }
        }
      }
    });
  }

  onLoadMoreComics = () => {
    this.props.comicIncreaseOffset();
    this.props.getComics()
  }

  componentDidMount() {
    this.props.getComics();
  }

  render() {
    let loadMoreButton = (
      <Button 
        title="Load More Results"
        onPress={this.onLoadMoreComics}
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
          data={this.props.comics}
          renderItem={this.renderComic.bind(this)}
          keyExtractor={(comic) => comic.id.toString()}
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

const mapStateToProps = ({ comics, ui }) => ({
  comics: comics.comicsList,
  noResults: comics.noResults,
  isLoading: ui.isLoading
})

export default connect(mapStateToProps, { 
  getComics,
  comicIncreaseOffset
})(Wrapper(Comics));

