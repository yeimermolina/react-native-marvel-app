import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { View, FlatList, ScrollView, Button, Text, ActivityIndicator, StyleSheet } from 'react-native';

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

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "blue"
        }}
      />
    );
  }

  //Check why loading Prop is not true
  // renderFooter = () => {
  //   if (!this.props.isLoading) return <ActivityIndicator />;
  //   console.log('LOAD', this.props)
  //   return (
  //     <Button 
  //       title="Load More Results"
  //       onPress={this.onLoadMoreHeroes}
  //     />
  //   );
  // };

  onLoadMoreHeroes = () => {
    this.props.heroIncreaseOffset();
    this.props.getHeroes()
  }

  componentDidMount() {
    this.props.getHeroes();
  }

  render() {
    let loadMoreButton = (
      <Button 
        title="Load More Results"
        onPress={this.onLoadMoreHeroes}
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
          data={this.props.heroes}
          renderItem={this.renderHero.bind(this)}
          keyExtractor={(hero) => hero.id.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          // ListFooterComponent={this.renderFooter}
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

const mapStateToProps = ({ heroes, ui }) => ({
  heroes: heroes.heroesList,
  noResults: heroes.noResults,
  isLoading: ui.isLoading
})

export default connect(mapStateToProps, { 
  getHeroes,
  heroIncreaseOffset
})(Wrapper(Heroes));
