import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import React, {useState, useEffect}  from 'react';

import logo from "../assets/icon3.png"


export default function App(props) {
  // const []
  
  useEffect(() => {
    // "timer" will be undefined again after the next re-render
    let timer = null
    if (props && props.navigation) {
      timer = setTimeout(() => props.navigation.navigate('openApp'), 4000);
    }
    
    return () => clearTimeout(timer);
  }, [props.navigation]);
  return (
    <View style={styles.container}>
        <Image source={logo} />
    </View>
    // <Navigation />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainLogo: {
    flex: 11,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    color:'#00803C',
    marginBottom: 16
  },
  footbar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
,  logoImage: {
    width: 60, height:20
  }
});
