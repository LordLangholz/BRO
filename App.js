import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import HomeScreen from "./pages/HomeScreen";
import ProfileScreen from "./pages/ProfileScreen";
import ScanScreen from "./pages/ScanScreen";

const Tab = createBottomTabNavigator();

const App = () => {


    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen 
                    name='HOME' 
                    component={HomeScreen}
                    options={{ 
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="home" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen 
                    name='SCAN'
                    component={ScanScreen} 
                    options={{ 
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="plus" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen 
                    name='PROFILE'
                    component={ProfileScreen} 
                    options={{ 
                        tabBarIcon: ({ color, size }) => (
                            <Icon name="user" color={color} size={size} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>

        
    );

    
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    text: {
        fontSize:20,
    },
});

export default App;