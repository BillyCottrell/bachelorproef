import React, { Component } from 'react';
import RecipeCell from "../components/RecipeCell";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import data from '../data/recipes.json';

/**
 * Startscherm van de applicatie dat een lijst van recepten toont en beheerd.
 */
export default class GetIdeas extends Component {

    /**
     * Navigatie opties dat ervoor zorgt dat er geen menubalk bovenaan tevoorschijn komt
     */
    static navigationOptions = ({
        header: null
    })

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            recipes: []
        }
    }

    /**
     * Deze methode haalt de data asynchroon op vanuit het JSON bestand met een pauze van 2 seconden.
     */
    getData() {
        return new Promise((resolve) => {
            setTimeout(function () {
                resolve(data);
            }, 2000);
        })
    }

    /**
     * Deze methode gaat voor elk item een recept maken waarbij het id, de navigatie,
     * het recept, de index en de methode updateLikes aankoppelen.
     */
    _renderItem = ({ item }) => (
        <RecipeCell
            id={item.id}
            navigation={this.props.navigation}
            recipe={item}
            index={this.state.recipes.indexOf(item)}
            updateLikes={this.updateRecipes}
        />
    );

    _keyExtractor = (item, index) => item.id.toString();

    /**
     * Deze methode dient voor het tonen van de lijst met recepten
     */
    render() {
        const { recipes, loading } = this.state;
        console.log("render");
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                />
                <FlatList
                    data={recipes}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    ListEmptyComponent={<Text>Loading...</Text>}
                />
            </View>
        );
    }

    /**
     * Deze methode updates het recept dat geliked is en updates de volledige lijst.
     * @param {number} recipeIndex - is de positie van het recept in de lijst.
     */
    updateRecipes = (recipeIndex) => {
        const { recipes } = this.state;
        recipes[recipeIndex].likes++;
        this.setState({ recipes });
    }

    /**
     * Deze methode zal aangeroepen worden voor dat dit scherm zal laden en zal de recepten ophalen
     */
    componentWillMount() {
        this.getData().then(data => this.setState({ loading: false, recipes: data.recipes }));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});