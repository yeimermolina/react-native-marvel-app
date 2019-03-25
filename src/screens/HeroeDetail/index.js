import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { getHero } from '../../store/actions';
import { HeroCard } from '../../components';
import { COMIC_DETAIL_SCREEN_NAME } from '../../constants';

class HeroeDetail extends Component {

  handleSelectComic = (comicId, comicTitle) => {
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

  componentDidMount() {
    this.navigationEventListener = Navigation.events().bindComponent(this);
    if (this.props.heroId) {
      this.props.getHero(this.props.heroId);
    }
  }

  componentWillUnmount() {
    if (this.navigationEventListener) {
      this.navigationEventListener.remove();
    }
  }

  // componentDidDisappear() {
    // Navigation.pop(this.props.componentId);
    // Navigation.popTo('heroes');
    // this.props.resetHeroeDetail();
  // }

  render() {
    let card = <ActivityIndicator size="large" />

    if (!this.props.isLoading && this.props.hero) {
      card = (
        <HeroCard 
          hero={this.props.hero}
          onPressComic={this.handleSelectComic}
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

const mapStateToProps = ({ heroes, ui }) => ({
  hero: heroes.heroDetail,
  isLoading: ui.isLoading
})

export default connect(mapStateToProps, { 
  getHero
})(HeroeDetail);
