import React from 'react';
import { AsyncStorage, StyleSheet, Text, View  , TextInput} from 'react-native';
import { Button } from 'react-native-elements';

import Swiper from 'react-native-deck-swiper'
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FormInput  as Input} from 'react-native-elements';
import { NavigationActions } from 'react-navigation';


// import { Input } from 'react-native-elements';

export default class ProfileScreen extends React.Component {
  state = {
      password : '',
      message : ''
  }
  authenticate = ()=>{
  }
  cancel = ()=>{
    console.log("cancled");
    let navigate = this.props.navigation.navigate;
    AsyncStorage.setItem('screen','false');
    navigate("Deck");
  }

  changePassword = ()=>{
    console.log('changing password');
      let userId = this.props.navigation.getParam('userId' , 56);
      axios.post('http://localhost:5000/update/password',{
        user_id : userId,
        password : this.state.password
      })
      .then((result)=>{
        console.log("Successfully Changed Password");
        this.setState({'message' : "UPDATED PASSWORD"})

      })
      AsyncStorage.setItem('screen','false');
      let navigate = this.props.navigation.navigate;
      navigate("Deck",{userId})

  }
  render() {
    console.log("Password : " , this.state.password);
    let username = 'noel'
    return (
        <View style={styles.container}>
  
          <Text style={styles.text} > {username} </Text>
          <Text type="password" style={styles.text} >Change Password</Text>

          <Input
            placeholder="*******"
            secureTextEntry = {true}
            leftIcon={ <Icon name='circle-o' size={24} color='black' /> }
            onChangeText= {(password)=>{this.setState({password})}}
          />

  
          <Button
              title="UPDATE"
              // loading
              loadingProps={{ size: "large", color: "rgba(111, 202, 186, 1)" }}
              titleStyle={{ fontWeight: "700" }}
              buttonStyle={{
                backgroundColor: "#1EB8F1",
                width: 300,
                height: 45,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 5,
                marginTop : 50,
                marginLeft : '10%'
              }}
              onPress = {()=>{
                this.changePassword();
              }}
            containerStyle={{ marginTop: 100 }}
          />
          <Text style={styles.attempts} >{this.state.message}</Text>

          <Text style={styles.attempts} onPress = {()=>{this.cancel()}}>Cancel</Text>

  
      </View>
      );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center',
    // alignItems: 'center'
  },
  attempts  : {
    textAlign : 'center',
    fontSize: 15,
    color :  'black',
    marginTop : 50
  },
  text : {
    textAlign : 'center',
    fontSize : 30,
    marginTop: 50,
    color : 'black'
  },
  input : {
    fontSize: 40,
    backgroundColor  : '#1EB8F1',
    height: 50,
    width: '80%',
    marginLeft : '10%',
    borderRadius: 10,
    color  : 'white'
  }
})