import React from 'react';
import { StyleSheet, Text, View   , Button  , Image , Dimensions           , ScrollView , TouchableOpacity} from 'react-native';
import axios from 'axios';
import { Input } from 'react-native-elements';
import Topics from './topics.js';

export default class Deck extends React.Component {
  state = {
    topics : [],
    selection : [],
    next : false
  }
  handleSelect = (topic)=>{
    const navigate = this.props.navigation.navigate ; 
    let selection = this.state.selection ;  
    console.log('selected topic');
    console.log(this.props.navigation.state.params.username);
    if(selection.length < 5 && selection.indexOf(topic) < 0){
      console.log("[PREFERENCE SELECTION] User Selection : " , this.state.selection);
      selection.push(topic);
      this.setState({selection});
    }else if(selection.length >= 5){
      console.log("[PREFERENCE SELECTION] Selection Message : Can No Longer Select , MAX LIMIT REACHED ");
      axios.post('http://localhost:5000/signup/preference',{
        options :    `${this.state.selection}`,
        username :  `${this.props.navigation.state.params.username}`
      })
      .then((result)=>{
        let userId = result.data;
        console.log("[PREFERENCE SELECTION] Success Message : Added Preferences to Database " ) ;
        navigate('Deck',{userId})
      })
      .catch((err)=>{
        let userId = 0 ;
        console.log("[PREFERENCE SELECTION] Axios Request Error : " , err ) ;
        navigate('Deck',{userId})
      })
    }
  }
  componentDidMount(){
    this.setState({topics : Topics});
  }
  componentWillReceiveProps(nextProps){
  }
  componentWillMount(){
  }
  render() {
    let colors = ['#27ae60','#e74c3c' , '#1EB8F1' , '#9b59b6' , '#64B5F6' , '#388E3C' , '#18FFFF' , '#263238' , '#F06292'];
    let chosenTopics = this.state.selection.map((option , index)=>{
      return <Text style={{color : 'black' , fontSize : 25}} key={index} >{option}</Text>;
    });
    let topics = this.state.topics.map((topic,index)=>{
      if((index + 1) % 3 === 0 && index < 100){
        let color = colors[Math.floor(Math.random() * Math.floor(colors.length))];
        return <View style={styles.row} key={index}>
                <TouchableOpacity
                  style={{ 
                    flexWrap: 'wrap',
                    width: 100,
                    height: 100,
                    borderRadius  :   50,
                    alignItems : 'center',
                    justifyContent : 'center',
                    backgroundColor : colors[Math.floor(Math.random() * Math.floor(colors.length))]
                  }}
                  onPress = {()=>{
                       console.log("working", index);
                       this.handleSelect(this.state.topics[ index - 2]);
                  }}
                >
                <Text style={styles.text}> {this.state.topics[index - 2]} </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={{ 
                    flexWrap: 'wrap',
                    width: 100,
                    height: 100,
                    borderRadius  :   50,
                    alignItems : 'center',
                    justifyContent : 'center',
                    backgroundColor : colors[Math.floor(Math.random() * Math.floor(colors.length))]
                  }}
                  onPress = {()=>{
                       console.log("working", index);
                       this.handleSelect(this.state.topics[ index - 1]);
                  }}
                >
                  <Text style={styles.text} > {this.state.topics[index - 1]} </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={{ 
                    flexWrap: 'wrap',
                    width: 100,
                    height: 100,
                    borderRadius  :   50,
                    alignItems : 'center',
                    justifyContent : 'center',
                    backgroundColor : colors[Math.floor(Math.random() * Math.floor(colors.length))]
                  }}
                  onPress = {()=>{
                       console.log("working", index);
                       this.handleSelect(this.state.topics[ index]);
                  }}
                 >
                 <Text style={styles.text} > {this.state.topics[index]} </Text>
                </TouchableOpacity>
               </View> ; 
      }
    })
    return (
      <ScrollView style={styles.main}>
        <View style={styles.topNav}>
          <Text style={styles.title}>Choose 5 Topics!</Text>
        </View>
        {chosenTopics}
        {topics}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  main : {
   flex : 1,
   backgroundColor : 'white' ,
   flexWrap: 'nowrap'
  },
  topNav : {
    flex: 1/5 , 
    flexDirection : 'row'
  },
  title : {
    fontSize : 30,
    marginLeft: 10,
    marginTop: 50,
    textAlign : 'center'
  },
  row : {
    flexDirection : 'row',
    flex : 1/5,
    alignItems  :   'flex-start',
    alignItems : 'center',
    justifyContent  : 'space-around',
    marginTop : 50
  },
  option : {
    flexWrap: 'wrap',
    width: 100,
    height: 100,
    borderRadius  :   50,
    backgroundColor : '#1EB8F1',
    alignItems : 'center',
    justifyContent : 'center'
  },
  middleOption : {
    flexWrap: 'wrap',
    width: 100,
    height: 100,
    // marginTop:  50,
    borderRadius  :   50,
    backgroundColor : '#1EB8F1',
    alignItems : 'center',
    justifyContent : 'center'
  },
  text : {
    textAlign : 'center',
    color : 'white',
    fontSize : 20,

  }
})








