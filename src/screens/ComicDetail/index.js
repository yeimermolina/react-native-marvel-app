import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { ScrollView, ActivityIndicator } from 'react-native';
import { getComic } from '../../store/actions';
import { ComicCard } from '../../components';
import { HEROE_DETAIL_SCREEN_NAME } from '../../constants';

class ComicDetail extends Component {
  handleSelectHero = (heroId, heroName) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: HEROE_DETAIL_SCREEN_NAME,
        passProps: {
          heroId: heroId
        },
        options: {
          topBar: {
            title: {
              text: heroName
            }
          }
        }
      }
    });
  }

  componentDidMount() {
    if (this.props.comicId) {
      this.props.getComic(this.props.comicId);
    }
  }

  render() {
    let card = <ActivityIndicator size="large" />

    if (!this.props.isLoading && this.props.comic) {
      card = (
        <ComicCard 
          comic={this.props.comic}
          onPressHero={this.handleSelectHero}
        />
      );
    }

    return (
      <ScrollView>
        {card}
      </ScrollView>
    )
  }
}

const mapStateToProps = ({ comics, ui }) => ({
  comic: comics.comicDetail,
  isLoading: ui.isLoading
})

export default connect(mapStateToProps, { 
  getComic
})(ComicDetail);
