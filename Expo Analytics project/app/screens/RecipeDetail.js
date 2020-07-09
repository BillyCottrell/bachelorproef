import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    Text,
    Image,
    View
} from 'react-native';
import ExpoAnalyticsManager from '../config/ExpoAnalyticsManager';

/**
 * Dit scherm zal de details tonen van het aangeklikte recept,
 * waarbij het recept "aangekocht" kan worden of teruggekeerd
 * kan worden naar de lijst van recepten.
 */
export default class RecipeDetail extends Component {

    /**
     * Navigatie opties voor dit scherm
     */
    static navigationOptions = ({
        headerStyle: {
            backgroundColor: '#c14348',
        },
        topBar: {
            backButton: {
                id: 'BACK',
            }
        }
    });

    /**
     * Constructor maakt de lokale staat aan.
     * 
     * @param {*} props 
     */
    constructor(props) {
        super(props);
        this.state = { pressStatus: false };
    }
    
    _onViewRecipe = () => {
        let id = this.props.id;
        let recipe = this.props.recipe;
    };

    /**
     * Deze methode dient voor het tonen van de details van het recept
     */
    render() {
        console.log("Recipe detail");
        const {navigation} = this.props;
        const itemId = navigation.getParam("id", "NO-ID");
        const recipe = navigation.getParam("recipe");
        
        return (
            <View style={styles.itemContainer}>
                <TouchableHighlight style={styles.touchHigh} onPress={ this._buyRecipe}>
                    <View style={styles.rowContainer}>
                        <Image source={{ uri: recipe.image }}
                            style={styles.thumbnail}
                            resizeMode="cover" />
                        <View style={styles.rowText}>
                            <Text style={styles.title} numberOfLines={2} ellipsizeMode={'tail'}>
                                {recipe.name}
                            </Text>
                            <Text style={styles.author} numberOfLines={1} ellipsizeMode={'tail'}>
                                {recipe.views}
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    /**
     * Deze methode wordt aangeroepen voordat het scherm zal laden
     */
    componentWillMount(){
        const {navigation} = this.props;
        const recipe = navigation.getParam("recipe");
        ExpoAnalyticsManager.getAnalytics().addCustomDimension(1,recipe.category);
        if(recipe.category=="Main Dish"){
            ExpoAnalyticsManager.getAnalytics().addCustomMetric(1,1);
        }
        ExpoAnalyticsManager.getAnalytics().pageHit("Recipe " + recipe.name);
        ExpoAnalyticsManager.getAnalytics().removeCustomDimension(1);
        ExpoAnalyticsManager.getAnalytics().removeCustomMetric(1);
    }

    /**
     * Deze methode wordt aangeroepen als men het recept wilt "aankopen"
     * en updates de transactie ID zodat deze klaar is voor de volgende "aankoop"
     */
    _buyRecipe = () => {
        const {navigation} = this.props;
        const recipe = navigation.getParam("recipe");
        ExpoAnalyticsManager.getAnalytics().sendTransaction('Recipe Chef', 35.42, 0, 2);
        ExpoAnalyticsManager.getAnalytics().addItem(recipe.name, 35.42, 1, 'SKU21', recipe.category);
        this.state.transid++;
        this.props.navigation.navigate('My Recipes', { id: this.props.id });
    }

    /**
     * Deze methode wordt aangeroepen voor het scherm alvorens er naar een ander scherm wordt genavigeerd
     */
    componentWillUnmount(){
        ExpoAnalyticsManager.getAnalytics().pageHit("Get Ideas");
    }

}

/**
 * 
 */

const styles = StyleSheet.create({
    itemContainer: {
        padding: 5,
        marginRight: 5,
        marginLeft: 5,
        marginTop: 5,
        borderRadius: 4,
        flex: 1,
        height: undefined,
        width: undefined,
    },
    rowContainer: {
        flexDirection: 'column',
        position: 'relative',
        justifyContent: "flex-end",
        width: undefined,
        height: 250,
        shadowOffset: { width: 1, height: 1, },
        shadowColor: '#CCC',
        shadowOpacity: 1.0,
        shadowRadius: 1
    },
    title: {
        paddingLeft: 10,
        paddingTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
        flex:1,
        flexWrap: "wrap",
        color: 'white'
    },
    author: {
        position: 'absolute',
        right:5,
        bottom:5,
        fontSize: 14,
        color: 'white',
    },
    thumbnail: {
        zIndex: 1,
        flex: 1,
        height: undefined,
        width: undefined,
        position: "relative",
    },
    rowText: {
        zIndex: 2,
        position: 'absolute',
        left:0,
        right:0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexDirection: 'row',
        width: undefined,
        height: 50
    }
});