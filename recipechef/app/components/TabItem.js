import React, { Component } from "react";
import { Box } from 'react-native-design-utility';
import { Icon } from 'react-native-elements';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

/**
 * Zelfgemaakte Tab item waarbij er per item een icoon en de naam van het pad wordt getoond.
 */
export class TabItem extends Component {

    /**
     * Deze methode behandelt het klikken van een tabItem
     */
    handlePress = () => {
        
        this.props.navigation.navigate(this.props.routeName);
    }
    
    render() {
        const { routeName, isActive } = this.props;
        const iconName = routeName == "Get Ideas" ? "lightbulb-o" : routeName == "My Recipes" ? "book" : "recycle";
        const iconType = routeName == "My Recipes" ? "antdesign" : "font-awesome";
        return (
            <Box f={1} center>
                <TouchableOpacity onPress={this.handlePress} style={styles.button}>
                    <Box mb={3}>
                        <Icon name={iconName} type={iconType} size={24} color={isActive ? "white" : "#5b0e0d"} />
                    </Box>
                    <Box>
                        <Text size="xs" ls={0.12} color="greyDark" lowercase>{routeName}</Text>
                    </Box>
                </TouchableOpacity>
            </Box>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
    }
})