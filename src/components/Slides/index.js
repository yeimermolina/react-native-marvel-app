import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, Button } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
    renderLastSlide(index) {
        if (index === this.props.data.length - 1) {
            return (
                <View style={styles.buttonContainerStyle}>
                    <Button 
                    title="LET'S GO!"
                    onPress={this.props.onComplete}
                    style={styles.buttonStyle}
                    />
                </View>
            )
        }
    }

    renderSlides() {
        return this.props.data.map((slide, i) => {
          return (
            <View key={slide.text} style={[styles.slideStyle, { backgroundColor: slide.color }]}>
              <Text style={styles.slideText}>{slide.text}</Text>
              {this.renderLastSlide(i)}
            </View>
          )
        });
    }

    render() {
        return (
            <ScrollView
              horizontal
              pagingEnabled
              style={{ flex: 1 }}
            >
              {this.renderSlides()}
            </ScrollView>
        );
    }
}

const styles = {
    slideStyle: {
      flex:1,
      width: SCREEN_WIDTH,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20
    },
    slideText: {
      fontSize: 30,
      textAlign: 'center',
      color: 'white'
    },
    buttonContainerStyle: {
      marginTop: 15
    },
    buttonStyle: {
      backgroundColor: '#0288D1'
    }
};

export default Slides;

