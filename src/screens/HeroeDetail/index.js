import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { getHero, resetHeroeDetail } from '../../store/actions';
import { HeroCard } from '../../components';

class HeroeDetail extends Component {
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

  componentDidDisappear() {
    this.props.resetHeroeDetail();
  }

  render() {
    let card = <ActivityIndicator size="large" />

    if (!this.props.isLoading && this.props.hero) {
      card = (
        <HeroCard 
          hero={this.props.hero}
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
  getHero,
  resetHeroeDetail
})(HeroeDetail);
