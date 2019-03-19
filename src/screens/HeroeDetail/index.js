import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { getHero } from '../../store/actions';

class HeroeDetail extends Component {
  componentDidMount() {
    if (this.props.heroId) {
      this.props.getHero(this.props.heroId);
    }
  }

  render() {
    return (
      <View>
        <Text>HEROES DETAIL {this.props.hero.name}</Text>
      </View>
    )
  }
}

const mapStateToProps = ({ heroes }) => ({
  hero: heroes.heroDetail
})

export default connect(mapStateToProps, { getHero })(HeroeDetail);
