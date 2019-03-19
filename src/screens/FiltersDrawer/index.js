import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { 
    nameStartsWithChange, 
    getHeroes,
    resetPagination
} from '../../store/actions';

class SideDrawer extends Component {
    constructor(props) {
        super(props);
        state = {
            activeComponentId: 'heroes'
        }

        screenEventListener = Navigation.events().registerComponentDidAppearListener( ( { componentId } ) => {
            // Check which tab screen the usar was
            if (['heroes', 'comics', 'stories'].includes(componentId)) {
                this.setState({ activeComponentId: componentId })
            }
        })
    }
    componentWillUnmount() {
        this.screenEventListener.remove();
    }

    handleSearchPress = () => {
        this.props.resetPagination();
        switch (this.state.activeComponentId) {
            case 'heroes':
                this.props.getHeroes();
                break
            default:
                this.props.getHeroes();
                break
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.containerTitle}>Search</Text>
                <View>
                    <Text style={styles.inputLabel}>Name:</Text>
                    <TextInput
                        style={styles.inputField}
                        onChangeText={(name) => this.props.nameStartsWithChange(name)}
                        value={this.props.name}
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

const mapStateToProps = ({ filters }) => ({
    name: filters.nameStartsWith
})

export default connect(mapStateToProps, { 
    nameStartsWithChange,
    getHeroes,
    resetPagination
})(SideDrawer);
