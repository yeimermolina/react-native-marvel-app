import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { FlatList, ScrollView } from 'react-native';

import { HEROE_DETAIL_SCREEN_NAME } from '../../constants';
import { HeroeCard } from '../../components';
import { getHeroes } from '../../store/actions';

class Heroes extends Component {
  renderHeroe = (heroe) => {
    return (
      <HeroeCard 
        heroe={heroe.item} 
        onPress={() => this.handleSelectedHeroe(heroe.item.id, heroe.item.name)} 
      />
    )
  }

  handleSelectedHeroe = (heroeId, heroeName) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: HEROE_DETAIL_SCREEN_NAME,
        passProps: {
          heroeId: heroeId
        },
        options: {
          topBar: {
            title: {
              text: heroeName
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
          renderItem={this.renderHeroe.bind(this)}
          keyExtractor={(heroe) => heroe.id.toString()}
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = ({ heroes }) => ({
  heroes: heroes.heroesList
})

export default connect(mapStateToProps, { getHeroes })(Heroes);
