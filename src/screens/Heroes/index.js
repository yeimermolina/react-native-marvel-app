import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { FlatList, ScrollView } from 'react-native';

import { HEROE_DETAIL_SCREEN_NAME } from '../../constants';
import { HeroeCard } from '../../components';
import { getHeroes } from '../../store/actions';
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
      </ScrollView>
    )
  }
}

const mapStateToProps = ({ heroes }) => ({
  heroes: heroes.heroesList
})

export default connect(mapStateToProps, { getHeroes })(Wrapper(Heroes));
