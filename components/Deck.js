import React from 'react';
import { AsyncStorage , StyleSheet, Text, View   , Button  , Image  , TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';

import Swiper from 'react-native-deck-swiper'
import axios from 'axios';
import { Input } from 'react-native-elements';
import {DrawerNavigator , StackNavigator , TabNavigator , createDrawerNavigator} from 'react-navigation';
import { DrawerActions } from 'react-navigation';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
export default class Deck extends React.Component {
  state = {
    articles : [],
    cardIndex : 0,
    authenticated : false
  }
  componentDidMount(){
    let userId = this.props.navigation.getParam('userId' , 56);
    console.log("[DECK] User Id : ", userId);
    axios(`http://10.2.20.155:5000/articles/${userId}`)
    .then((result)=>{
      let articles = result.data;
      // console.log(articles);
      console.log(articles.length);

      this.setState({articles});
    })
  }
  componentWillReceiveProps(nextProps){
      let articles = nextProps.articles;
      this.setState({articles})
  }
  openNavBar = ()=>{
    this.props.navigation.dispatch(DrawerActions.toggleDrawer());
  }
  openFullRead = (article,cardIndex)=>{
   let {url} = article
   console.log("full read",article);
   let navigate = this.props.navigation.navigate;
   navigate('WebContainer',{url , cardIndex });
  }
  swipedRight = (article)=>{
    let userId = this.props.navigation.getParam('userId' , 56);
    let article_id = article.id;
    console.log("[DECK] Article Swipe Right ID : ", article_id);
    axios.post(`http://10.2.20.155:5000/like`,{
      article_id : article_id,
      userId : userId
    })
    .then((result)=>{
      console.log("[DECK] Like Success Message : ",result);
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  swipedLeft = (article)=>{
    let userId = this.props.navigation.getParam('userId' , 56);
    let article_id = article.id;
    console.log("[DECK] Article Swipe Right ID : ", article_id);
    axios.post(`http://10.2.20.155:5000/dislike`,{
      article_id : article_id,
      userId : userId
    })
    .then((result)=>{
      console.log("[DECK] Like Success Message : ",result);
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  render() {
    let {articles} = this.state;
    console.log("CardIndex",this.props.navigation.getParam('cardIndex' , 2))
    try{
      AsyncStorage.getItem('user').then((value) =>{
        if(value === 'false'){
          console.log("logged out");
          this.props.navigation.navigate('Login');
        }else{
          AsyncStorage.getItem('screen').then((value)=>{
            console.log(value);
            if(value !== null && value !== 'false'){
              let userId = this.props.navigation.getParam('userId' , 56);
              this.props.navigation.navigate('ProfileScreen',{userId});
            }
          });
        }

      })
    }catch(error){
      console.log("error",error);
    }
    console.log("rendering");
    // console.log("Articles : ", articles);
    if(articles === undefined){
      let userId = this.props.navigation.getParam('userId' , 56);
      console.log("[DECK] User Id : ", userId);
      axios(`http://10.2.20.155:5000/articles/${userId}`)
      .then((result)=>{
        let articles = result.data;
        this.setState({articles});
      })
      return (
        <View style={styles.container}></View>
      )
    }else{
      return (
        <View style={styles.container}>
            <Swiper
                cards={articles}
                renderCard={(card) => {
                    return (
                        <View style={styles.card}>
                            <Image
                              style={styles.articleImg}
                              source={{uri: `${card.urlToImage}`}}
                            />
                            <Text style={styles.text}>{card.description.substring(0,60)}...</Text>
                            <Text style={styles.description}>{card.description.substring(0,200)}...</Text>
                            <Text style={styles.source}>{card.sourceName}</Text>
  
                        </View>
                    )
                }}
                onSwiped={(cardIndex) => {
                  console.log(cardIndex)
                }}
                onSwipedAll={() => {
                  console.log('onSwipedAll');
                }}
                onSwipedLeft = {(cardIndex)=>{
                  this.swipedLeft(articles[cardIndex]);
                  console.log("slide left",cardIndex)
                }}
                onSwipedRight = {(cardIndex)=>{
                  this.swipedRight(articles[cardIndex]);
                }}
                onSwipedBottom = {(cardIndex)=>{
                  this.openFullRead(articles[cardIndex],cardIndex);
                }}
                cardIndex={this.props.navigation.getParam('cardIndex' , 2)}
                backgroundColor={'transparent'}
                stackSize= {3}
                cardStyle={styles.stackContainer}
                animateCardOpacity={true}
                >                
            </Swiper>
            <View style={styles.navContainer}>
              <TouchableOpacity
                  style={styles.button}
                  onPress={() =>{
                    this.setState({})
                    this.props.navigation.dispatch(DrawerActions.openDrawer())
                    // this.props.navigation.navigate('Drawer', { userName: userName });
                  }} > 
              </TouchableOpacity>
            </View>
          </View>
      );
    }

  }
}



const styles = StyleSheet.create({
  container : {
    width: '100%',
    backgroundColor : 'white',
    flex : 1,

  },
  icon : {
    width: 50,
    height: 50,
    backgroundColor : 'black'
  },
  stackContainer : {
    width: '100%',
    height: '100%',
    left : 0,
    top : 0,
    backgroundColor : 'white'
  },
  card: {
    borderColor : 'black',
    height: '100%',
    backgroundColor: 'white'
  },
  articleImg  : {
    borderColor: 'black',
    height: '40%',
    width: '100%'
  },
  text: {
    textAlign: 'left',
    fontSize: responsiveFontSize(4),
    marginTop: 30,
    marginLeft : 10,
    fontWeight :'bold',
    backgroundColor: 'transparent'
  },
  url : {
    textAlign : 'left' ,
    position : 'absolute' , 
    bottom : 5,
    left : 5 , 
    fontSize  : 8 ,
    backgroundColor  : 'transparent'
  },
  source: {
    textAlign: 'right',
    position: 'absolute',
    right : 15 ,
    bottom : 15,
    fontSize: 25,
    backgroundColor: 'transparent'
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent'
  } , 
  description : {
    fontSize: responsiveFontSize(2.5),
    padding: 10,
    textAlign : 'left'
  },
  navContainer : {
    height: 50 , 
    width: 100 , 
    position: 'absolute',
    left:0,
    bottom:0,
    borderTopRightRadius: 30
  },
  button : {
    position : 'absolute',
    height: 150,
    width: 20,
    bottom : 0,
    left : 0,
    borderTopRightRadius: 50,
    backgroundColor : '#232428',
    // backgroundColor : '#e74c3c'
  }
})