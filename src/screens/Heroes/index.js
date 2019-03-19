import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { FlatList, ScrollView, Button, Text } from 'react-native';

import { HEROE_DETAIL_SCREEN_NAME } from '../../constants';
import { HeroeCard } from '../../components';
import { getHeroes, heroIncreaseOffset } from '../../store/actions';
import Wrapper from '../../hoc/Wrapper';

class Heroes extends Component {
  renderHero = (hero) => {
    return (
      <HeroeCard 
        heroe={hero.item} 
        onPress={() => this.handleSelectedHeroe(hero.item.id, hero.item.name)} 
      />
    )
  }

  handleSelectedHeroe = (heroId, heroName) => {
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

  onLoadMoreHeroes = () => {
    this.props.heroIncreaseOffset();
    this.props.getHeroes()
  }

  componentDidMount() {
    this.props.getHeroes();
  }

  render() {
    return (
      <ScrollView>
        <FlatList
          data={this.props.heroes}
          renderItem={this.renderHero.bind(this)}
          keyExtractor={(hero) => hero.id.toString()}
        />
        {
          this.props.noResults ? (
            <Text>No Results</Text>
          ) : (
            <Button 
              title="Load More Results"
              onPress={this.onLoadMoreHeroes}
            />
          )
        }
        
      </ScrollView>
    )
  }
}

const mapStateToProps = ({ heroes }) => ({
  heroes: heroes.heroesList,
  noResults: heroes.noResults
})

export default connect(mapStateToProps, { 
  getHeroes,
  heroIncreaseOffset
})(Wrapper(Heroes));
