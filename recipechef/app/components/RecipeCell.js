import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    Text,
    Image,
    View,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';

/**
 * Dit is de recept cell die gebruikt wordt in de recepten lijst op het scherm Get Ideas
 */
export default class RecipeCell extends Component {

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
    };

    /**
     * Deze methode dient voor het tonen van de cell met een bepaald recept
     */
    render() {
        const {recipe} = this.props;
        const {name,views,likes,image} = recipe;
        return (
            <View style={styles.itemContainer}>
                <TouchableHighlight style={styles.touchHigh} onPress={this._handleNavigation}>
                    <View style={styles.rowContainer}>
                        <Image source={{ uri: image }}
                            style={styles.thumbnail}
                            resizeMode="cover" />
                        <View style={styles.rowText}>
                            <Text style={styles.title} numberOfLines={2} ellipsizeMode={'tail'}>
                                {name}
                            </Text>
                            <Text style={styles.author} numberOfLines={1} ellipsizeMode={'tail'}>
                                {views} {likes}
                            </Text>
                        </View>
                        <View style={styles.rowImage}>
                            <View style={styles.columnImage}>
                                <TouchableOpacity style={styles.touchHigh} onPress={this.handleClick}>
                                    <Icon style={styles.like} name="thumbs-o-up" type="font-awesome" size={24} color={"#eee"} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    /**
     * Deze methode wordt uitgevoerd wanneer er op de like knop wordt geduwd en
     * zorgt ervoor dat de index van het recept wordt teruggestuurd naar het
     * hoofdscherm zodat het recept kan geupdate worden.
     */
    handleClick= () => {
        const {index, updateLikes} = this.props;
        updateLikes(index);
    }

    /**
     * Wanneer er op een recept wordt geklikt dan zal deze methode worden uitgevoerd en zal de details van het recept getoond worden.
     */
    _handleNavigation = () => {
        this.props.navigation.navigate('Recipe Detail',{id: this.props.id, recipe: this.props.recipe});
    }
}

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
        flex: 1,
        flexWrap: "wrap",
        color: 'white'
    },
    author: {
        position: 'absolute',
        right: 5,
        bottom: 5,
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
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexDirection: 'row',
        width: undefined,
        height: 50
    },
    rowImage: {
        zIndex: 2,
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flexDirection: 'row',
        flex: 1,
        height: 40,
        width: 40,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.5)',
        justifyContent: "center",
    },
    columnImage: {
        position:'relative',
        flexDirection: 'column',
        justifyContent: "center",
        flex:1,
        height: 40,
        width: undefined,
        shadowOffset: { width: 1, height: 1, },
        shadowColor: '#CCC',
        shadowOpacity: 1.0,
        shadowRadius: 1
    },
    like: {
        position: 'relative',
        flex: 1,
        width: 40,
        height:40
    }
});