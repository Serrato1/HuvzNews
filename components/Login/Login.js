import React from 'react';
import { AsyncStorage, StyleSheet, Text, View  , TextInput} from 'react-native';
import { Button } from 'react-native-elements';

import Swiper from 'react-native-deck-swiper'
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FormInput  as Input} from 'react-native-elements';
import { NavigationActions } from 'react-navigation';


// import { Input } from 'react-native-elements';

export default class Login extends React.Component {
  state = {
      username : '',
      password : '',
      authenticated : false,
      attempts : 5,
      timer : 300,
      formattedTime : '5:00'
  }
  componentWillMount(){
    AsyncStorage.getItem('user').then((value) =>{
      console.log("[LOGIN] Stored Async : ", value);
      if(value === 'false' || value === null){
        this.setState({authenticated : false})
      }else{
        const navigate = this.props.navigation.navigate ; 
        navigate('Deck', { user : value})
      }
    })
  }
  signupClicked = ()=>{
    const navigate = this.props.navigation.navigate ; 
    navigate('Signup');
  }
  authenticate = ()=>{
    const navigate = this.props.navigation.navigate ; 
    console.log("'authenticate' method called");
    axios.post('http://localhost:5000/login',{
      username : this.state.username,
      password : this.state.password
    })
    .then((response)=>{
      console.log(response.data);
      if(response.data !== false){
        try {
          AsyncStorage.setItem('user', `${response.data}`);
        } catch (error) {
          // Error saving data
          console.log(error);
        }
        navigate('Deck', { userId : response.data})
      }else{
        let attempts = this.state.attempts - 1;
        this.setState({authenticate : false , attempts });
      }
    })
    .catch((error)=>{
      console.log('Err' , error);
    }) 
  }
  render() {
    console.log("Username : " , this.state.username);
    console.log("Password : " , this.state.password);
    if(this.state.attempts <= 0 ){
      setTimeout(()=>{
        let timer = this.state.timer - 1;
        let formattedTime = `${Math.floor(timer/60)}:${timer%60}`;
        this.setState({timer, formattedTime})
      },1000)
      return (
        <View style = {styles.container} >
          <Text style={styles.text}> Log In Again in 5 Minutes</Text>
          <Text style={{ textAlign: 'center'  , fontSize : 50   }}>{this.state.formattedTime}</Text>
        </View>
      )
    }
    return (
        <View style={styles.container}>
  
          <Text style={styles.text}>Username</Text>
          <Input
            placeholder="username@email.com"
            leftIcon={ <Icon name='circle-o' size={24} color='black' /> }
            onChangeText= {(username)=>{this.setState({username})}}
          /> 
          <Text type="password" style={styles.text} >Password</Text>

          <Input
            placeholder="*******"
            secureTextEntry = {true}
            leftIcon={ <Icon name='circle-o' size={24} color='black' /> }
            onChangeText= {(password)=>{this.setState({password})}}
          />

          <Text style={styles.attempts}>Attempts Left : {this.state.attempts}</Text>
  
          <Button
              title="LOG IN"
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
                this.authenticate();
              }}
            containerStyle={{ marginTop: 100 }}
          />
          <Text style={styles.attempts} onPress = {()=>{this.signupClicked()}}>Not a Member Yet? Signup</Text>

  
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