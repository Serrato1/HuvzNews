import React from 'react';
import { StyleSheet, Text, View   , Button } from 'react-native';
import axios from 'axios';
import { Input } from 'react-native-elements';
import ProfileScreen from './components/ProfileScreen.js';
import Deck from './components/Deck.js';
import SideBar from './components/SideBar.js' ;
import WebContainer from './components/WebContainer.js' ;
import SocialIcons from './components/SocialIcons';
import Login from './components/Login/Login.js';
import Home from './components/Home.js';
import Signup from './components/Signup/Signup.js';
import PreferenceSelection from './components/Signup/PreferenceSelection';

import { createStackNavigator , navigate  , createDrawerNavigator} from 'react-navigation';
const RootStack = createDrawerNavigator(
  {
    Home : Home,
    ProfileScreen : ProfileScreen,
    Deck : Deck,
    Login : Login,
    Signup : Signup,
    PreferenceSelection : PreferenceSelection,
    WebContainer : WebContainer,
    SocialIcons : SocialIcons

  },
  {
    initialRouteName : 'ProfileScreen',
    navigationOptions: {
      header : null,
      headerStyle: {
        backgroundColor: 'transparent',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
    contentComponent :  SideBar,
    drawerWidth : 200

  }
);


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container} >
        <RootStack />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container : {
    flex : 1
  }
})