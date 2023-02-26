import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,Button,TouchableOpacity, TextInput } from 'react-native';

import React, {useState, useEffect}  from 'react';
// import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import AsyncStorage from '@react-native-async-storage/async-storage';


import arrow from "../assets/arrowRight.png"
export default function App(props) {
//   let [fontsLoaded] = useFonts({
//     Inter_900Black,
//   });
const [accessToken,setAccessToken] = useState('')

useEffect(() => {
  async function getToken() {
    let token = await AsyncStorage.getItem('accessToken')
    setAccessToken(token)
  }
  getToken()
},[])
  return (
    <View style={styles.container}>
      <Text style={styles.headTitle}>Ready Boss</Text>
      <Text style={styles.bigTitle}>Kelola kehadiran dengan mudah & cepat</Text>
      <TouchableOpacity style={styles.startButton} onPress={() =>  {
        if(accessToken) {
          props.navigation.navigate('mainPage')
        } else {
          props.navigation.navigate('loginPage')
        }
      }}>
      
        <Text style={styles.buttonText}>Memulai</Text>
        <Image style={styles.arrowText} source={arrow}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headTitle:{
    fontSize:20,
    color: '#00803C',
    fontWeight: '500',
    marginBottom: 20
  },
  bigTitle: {
    textAlign: 'left',
    fontSize:36,
    fontWeight: '500',
    marginBottom: 24,
  },
  startButton: {
    justifyContent:'center',
    flexDirection: 'row',
    paddingTop:10,
    paddingBottom:10,
    borderRadius:20,
    width: '70%',
    borderRadius: 70,
    backgroundColor: '#00803C',
    width: 145,
  },
  buttonText:{
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 20,
    color:'#fff',
  },
  arrowText: {
    width: 24,
    height: 24,
    marginLeft: 4
  }
});
