import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,Button,TouchableOpacity, TextInput } from 'react-native';
import React, {useState, useEffect}  from 'react';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

import berhasil from "../assets/berhasil.png"


export default function App(props) {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  useEffect(() => {
    const timer = setTimeout(() => props.navigation.navigate('mainPage'), 2000)
  })

  return (
    <View style={styles.container}>
      <Image source={berhasil} />
      <Text style={styles.textBerhasil}>Absen Berhasil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBerhasil: {
    fontSize: 18,
    fontWeight: '400',
    marginTop: 20
  }
 
});
