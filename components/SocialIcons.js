import React, {Component} from 'react';
import {WebView, View , TouchableOpacity , StyleSheet} from 'react-native';
import { SocialIcon } from 'react-native-elements'
export default class SocialIcons extends Component{
    render(){
        if(this.props.display === undefined ? true : false){
            return (
                <View style={styles.container}>
                    <SocialIcon
                        style = {styles.icon}
                        onPress = {()=>{
                            console.log("Sharing on Gitlab");
                        }}
                        raised={false}
                        type='gitlab'
                    />
                    
                    <SocialIcon
                        style = {styles.icon}
                        onPress = {()=>{
                            console.log("Sharing on Instagram");
                        }}
                        light
                        type='instagram'
                    />
                        
                    <SocialIcon
                        style = {styles.icon}
                        onPress = {()=>{
                            console.log("Sharing on Facebook");
                        }}
                        light
                        type='facebook'
                    />
                </View>
            )
        }else{
            return (
                <View style={styles.noDisplay}>
                </View>
            )
        }

    }
}

const styles = StyleSheet.create({
    noDisplay : {
        display : 'none'
    },
    container : {
        flex : 1,
        width: '100%',
        opacity: .50,
        backgroundColor : 'black',
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center'
    },
    icon : {
        flex : 1/3
    },
    iconContainer : {
    }
})
