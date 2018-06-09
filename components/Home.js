import React from 'react';
import { AsyncStorage,View , StyleSheet} from 'react-native';

import Swiper from 'react-native-deck-swiper'
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FormInput  as Input} from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { Container, Content, Header, Left, List, ListItem, Right, Body, Title, Text, Button, Card, CardItem } from 'native-base';

// import { Input } from 'react-native-elements';

export default class Home extends React.Component {
  state = {
      articles : []
  }
  login = ()=>{
    const navigate = this.props.navigation.navigate ; 
    navigate('Login');
  }
  componentDidMount(){
    axios("http://10.2.20.155:5000/articles/trending")
    .then((result)=>{
        let articles = result.data.map((article  ,    index)=>{
            if(index > 5){
                return false;
            }else{
                return <ListItem key={index}> <Text> {article.title} </Text> </ListItem>
            }
        })

        articles = articles.filter(article=> article ? true : false )               ;
        console.log(articles.length);
        this.setState({articles});
    })
  }
  componentWillMount(){
    // AsyncStorage.getItem('user').then((value) =>{
    //   console.log("[LOGIN] Stored Async : ", value);
    //   if(value === 'false' || value === null){
    //     this.setState({authenticated : false})
    //   }else{
    //     const navigate = this.props.navigation.navigate ; 
    //     navigate('Deck', { user : value})
    //   }
    // })
  }

  
  render() {
    let articles = this.state.articles ;
    return (
  
        <Container>
        <Header style={{backgroundColor  :  '#232428'}}>
          <Left />
          <Body >
            <Title >HUVZ NEWS</Title>
          </Body>
          <Right />
        </Header>
        <Content contentContainerStyle ={{
          justifyContent: 'center', alignItems: 'center',
          paddingTop: 40, paddingHorizontal: 10}}>
          <Title >TRENDING NEWS</Title>
        <List >
        {articles}
        </List>
        <Button danger block
          onPress= {()=>{this.login()  } } style= {{marginTop: 40}}>
            <Text> GET STARTED</Text>
        </Button>
        </Content>
      </Container>
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