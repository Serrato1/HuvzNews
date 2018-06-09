import React, {Component} from 'react';
import {WebView, View , TouchableOpacity} from 'react-native';

export default class MyWeb extends Component{
    exit = ()=>{
        let userId = this.props.navigation.getParam('userId' , 56);
        let cardIndex = this.props.navigation.getParam('cardIndex' , 0);
        let navigate = this.props.navigation.navigate;
        navigate('Deck',{userId,cardIndex})
    }
    render(){
        let url = this.props.navigation.getParam('url' , 'https://github.com/facebook/react-native');
        return (
            <View style={{flex: 1}}>
                <View style={{height: 50, backgroundColor : '#232428'}}></View>
                <WebView
                    source = {{uri: url}}
                />
                <TouchableOpacity style={{height: 50, backgroundColor : '#232428'}} onPress={()=>{this.exit()}}></TouchableOpacity>
            </View>
        )
    }
}


