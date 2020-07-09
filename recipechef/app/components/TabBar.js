import React, { Component } from "react";
import { Box } from "react-native-design-utility";
import { TabItem } from "./TabItem";
import { Platform } from "@unimodules/core";
import { StatusBar } from "react-native";

/**
 * Zelfgemaakte Tabbar waarbij er per route in de tabbar navigatie, een tabItem gemaakt wordt waarbij de naam van de route wordt doorgegeven en of deze actief is of niet.
 */
export class TabBar extends Component {
    render() {
        const { navigation } = this.props;
        const { routes, index } = navigation.state;

        return (
            <Box h={90} bg="#c14348" dir="row" style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}>
                {routes.map((route, i) => (
                    <TabItem navigation={navigation} key={route.routeName} {...route} isActive={index == i} />
                ))}
            </Box>
        )
    }
}
