import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, ActivityIndicator } from 'react-native';
import { getStory } from '../../store/actions';
import { StoryCard } from '../../components';

class StoryDetail extends Component {
  componentDidMount() {
    if (this.props.storyId) {
      this.props.getStory(this.props.storyId);
    }
  }

  render() {
    let card = <ActivityIndicator size="large" />

    if (!this.props.isLoading && this.props.story) {
      card = (
        <StoryCard 
          story={this.props.story}
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

const mapStateToProps = ({ stories, ui }) => ({
  story: stories.storyDetail,
  isLoading: ui.isLoading
})

export default connect(mapStateToProps, { 
  getStory
})(StoryDetail);