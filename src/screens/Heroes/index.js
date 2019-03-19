import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, ScrollView } from 'react-native';
import { HeroeCard } from '../../components';

import { getHeroes } from '../../store/actions';

class Heroes extends Component {
  renderHeroe = (heroe) => {
    return <HeroeCard heroe={heroe.item} />
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
