import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

/**
 * Tweede Tabblad van de Tab Navigatie
 */
export default class MyRecipes extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    My Recipes
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});