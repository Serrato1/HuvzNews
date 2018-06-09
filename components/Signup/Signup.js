import React from 'react';
import { StyleSheet, Text, View  , TextInput} from 'react-native';
import { Button } from 'react-native-elements';

import Swiper from 'react-native-deck-swiper'
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FormInput  as Input} from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

// import { Input } from 'react-native-elements';

export default class Signup extends React.Component {
  state = {
      username : '',
      password : '',
      message : ''
  }
  loginClicked = ()=>{
    const navigate = this.props.navigation.navigate ; 
    navigate('Login')
  }
  signup = ()=>{
    const navigate = this.props.navigation.navigate ; 
    let {username , password} = this.state;
    username = username.toLowerCase();
    let status = false;
    let msg = 'default msg';
    if(username !== '' && password !== ''){
        axios.post('http://10.2.20.155:5000/signup',{
            username ,
            password
        })
        .then((result)=>{
            console.log(result.data);
            switch(result.data){
              case "User Already Exists":
                status = false;
                msg = "User Already Exists";
                break;
              case false:
                status = false;
                msg = "Server Error";
                break;
              case true:
                status = true;
                msg = "Signup Successful";
                navigate('PreferenceSelection', {username});
                break;
              default:
                status = false;
                msg = "Application Error";
                break;
            }
            this.setState({message : msg});
        })
        .catch((err)=>{
            console.log("error", err);
        })
    }
  }
  render() {
    console.log("Username : " , this.state.username);
    console.log("Password : " , this.state.password);
    let message = this.state.message;
    return (
        <View style={styles.container}>
  
          <Text style={styles.text}>Choose a Username</Text>
          <Input
            placeholder="username@email.com"
            leftIcon={ <Icon name='circle-o' size={24} color='black' /> }
            onChangeText= {(username)=>{this.setState({username})}}
          /> 
          <Text type="password"  style={styles.text} >Choose A Password</Text>

          <Input
            placeholder="*******"
            secureTextEntry = {true}
            leftIcon={ <Icon name='circle-o' size={24} color='black' /> }
            onChangeText= {(password)=>{this.setState({password})}}
          />
          {/* <Button title="LOGIN" onPress={()=>{}}/> */ }
          {/*<Icon
            name='circle-o'
            onPress = {()=>{ console.log("clicked");}}
            size = {100}
            color='#00aced'
            style={{textAlign : 'center'}}
            /> 
          */}

  
          <Button
              title="Signup"
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
                this.signup();
              }}
            containerStyle={{ marginTop: 100 }}
          />
          <Text style={styles.attempts} onPress = {()=>{this.loginClicked()}}>Already a User ? Login</Text>
          <Text style={styles.message} onPress = {()=>{this.loginClicked()}}>{message}</Text>
  
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
  message  : {
    textAlign : 'center',
    fontSize: 15,
    color : 'red',
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