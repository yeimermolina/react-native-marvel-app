import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { 
    getHeroes,
    resetHeroesFiltersAndPagination,
    heroNameFilterChange
} from '../../store/actions';

class SideDrawer extends Component {
    state = {
        activeComponentId: 'heroes'
    }

    constructor(props) {
        super(props);
        // screenEventListener = Navigation.events().registerComponentDidAppearListener( ( { componentId } ) => {
        //     if (['heroes', 'comics', 'stories'].includes(componentId)) {
        //         this.setState({ activeComponentId: componentId })
        //     }
        // })
    }
    // componentWillUnmount() {
    //     this.screenEventListener.remove();
    // }

    handleSearchPress = () => {
        switch (this.state.activeComponentId) {
            case 'heroes':
                this.props.resetHeroesFiltersAndPagination();
                this.props.getHeroes();
                break;
            default:
                this.props.getHeroes();
                break;
        }
    }

    handleInputName = (name) => {
        switch (this.state.activeComponentId) {
            case 'heroes':
                this.props.heroNameFilterChange(name);
                break;
            default:
                this.props.heroNameFilterChange(name);
                break;
        }
    }

    getInputValue = () => {
        switch (this.state.activeComponentId) {
            case 'heroes':
                return this.props.nameFromHero;
            default:
                return this.props.nameFromHero;
        }
    }

    render() {
        const value = this.getInputValue();
        return (
            <View style={styles.container}>
                <Text style={styles.containerTitle}>Search</Text>
                <View>
                    <Text style={styles.inputLabel}>Name:</Text>
                    <TextInput
                        style={styles.inputField}
                        onChangeText={(name) => this.handleInputName(name)}
                        value={value}
                    />
                </View>
                <Button 
                    title='Search'
                    onPress={this.handleSearchPress}
                />
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        backgroundColor: "#a50000",
        flex: 1
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#eee',
        padding: 22
    },
    drawerItemIcon: {
        marginRight: 10
    },
    containerTitle: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    inputLabel: {
        color: 'white'
    },
    inputField: {
        borderWidth: 1,
        borderColor: 'white',
        color: 'white'
    }
});

const mapStateToProps = ({ heroes }) => ({
    nameFromHero: heroes.filters.nameStartsWith
})

export default connect(mapStateToProps, { 
    getHeroes,
    resetHeroesFiltersAndPagination,
    heroNameFilterChange
})(SideDrawer);
