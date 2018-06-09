import React from 'react';
import axios from 'axios';
import { AsyncStorage , StyleSheet, Text, View   , Button  , Image , TouchableOpacity} from 'react-native';
// import {DrawerNavigator , StackNavigator , TabNavigator , createDrawerNavigator} from 'react-navigation';
import { DrawerActions } from 'react-navigation';
import { Icon } from 'react-native-elements';
export default class SideBar extends React.Component {
  logout  = ()=>{
    AsyncStorage.setItem('user', `false`);
    this.props.navigation.dispatch(DrawerActions.toggleDrawer());

  }
  toggleDrawer = ()=>{
    this.props.navigation.dispatch(DrawerActions.toggleDrawer());
  }
  topicSelected = (topic)=>{
    console.log("Selected", topic);
    axios.post(`http://10.2.20.155:5000/update/topic`, {
      topic : topic
    })
    .then(({data})=>{
      console.log(data);
    })
    this.props.navigation.dispatch(DrawerActions.toggleDrawer());
  }




  profile = ()=>                        {
    console.log("profile");
    AsyncStorage.setItem('screen','profile');
    this.props.navigation.dispatch(DrawerActions.toggleDrawer());
  }
  render() {
    try {
      AsyncStorage.getItem('user').then((value) =>{
        console.log("[SIDEBAR] Recieved USER DATA : ",value);
      })
    } catch (error) {
      // Error saving data
      console.log(error);
    }
    
    let categories = ['trending','movies','anime','sports','tech' , 'feed'].map((category, id)=>{
      return <TouchableOpacity key={id} onPress = {()=>{this.topicSelected(category)}}>
              <Text style={styles.link}>{category}</Text>
            </TouchableOpacity>;
    })
    let settings = [''];
    return (
      <View style={styles.container}>
        <Text style={ styles.bigText}></Text>
        <Text style={ styles.bigText}>Topics</Text>
        <Text style={ styles.bigText}></Text>
        {categories}
        <View style={styles.bottom}>
          <Icon containerStyle={styles.icon} name="heart" type="font-awesome" color="pink" size={30} onPress = {()=>{this.topicSelected('liked')}}> </Icon>
          <Icon containerStyle={styles.icon} name="thumbs-down" type="font-awesome" color="white" size={30} onPress = {()=>{this.topicSelected('disliked')}}> </Icon>
          <Icon containerStyle={styles.icon} name="user" type="font-awesome" color="white" size={30} onPress = {()=>{
            this.profile();
          }}> </Icon>
          <Icon containerStyle={styles.icon} name="sign-out" type="font-awesome" color="white" size={30} onPress={()=>{
            this.logout();
          }}> </Icon>
        </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    width: '100%',
    backgroundColor : '#232428',
    flex : 1,
    flexDirection : 'column',
    justifyContent : 'center',
    alignContent : 'center'
  },
  bottom : {
    position: 'absolute',
    width: '100%',
    height: 100,
    bottom : 0,
    flexDirection : 'row'
  },
  icon   :    {
    flex : 1
  },
  bigText :{
    fontSize: 40,
    color: 'white',
    textAlign: 'center'
  },
  link : {
    backgroundColor : 'transparent',
    height: 50,
    fontSize : 30,
    color: 'white', 
    textAlign: 'center',
  },
  button   : {
    marginTop : 500
  }
})