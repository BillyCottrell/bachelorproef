import React from 'react';
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";

import GetIdeas from './screens/GetIdeas';
import MyRecipes from './screens/MyRecipes';
import UseUpLeftovers from './screens/UseUpLeftovers';
import RecipeDetail from './screens/RecipeDetail';

import { TabBar } from './components/TabBar';

/**
 * Deze navigatie is een lijst waarbij, wanneer een recept geselecteerd wordt in Get Ideas, deze Recipe Detail opengemaakt kan worden over de lijst van recepten
 */
const GetIdeasStack = createStackNavigator({
    'Get Ideas': GetIdeas,
    'Recipe Detail': RecipeDetail,
}, {
    headerMode: "none"
})

/**
 * Tabblad navigatie staat bovenaan met 3 tabbladen waarbij de tabbar een zelfgemaakt object is en gevonden kan worden in de map /components/TabBar.
 * Het eerste Tabblad is een lijst de andere 2 zijn de schermen zelf
 */
const Tabs = createMaterialTopTabNavigator({
    'Get Ideas': GetIdeasStack,
    'My Recipes': MyRecipes,
    'Use Up LeftOvers': UseUpLeftovers,
}, {
    tabBarComponent: props => < TabBar {...props }
    />,
    activeTintColor: 'white',
    inactiveTintColor: '#5b0e0d',
})

/**
 * Hoofd navigatie is een lijst waarbij enkel de tabbladen inzitten, waarbij de hoofdmenu zichtbaar is enkel de tabs.
 */
export const createRootNavigator = () => {
    return createStackNavigator({
        Tab: Tabs,
    }, {
        headerMode: "none",
        headerBackTitleVisible: "true",
        mode: "card"
    });
}