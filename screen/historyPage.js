import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,Button,TouchableOpacity, TextInput, RefreshControlBase } from 'react-native';
import React, {useState, useEffect}  from 'react';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { Camera, CameraType } from 'expo-camera';
import moment from 'moment'
import * as Location from 'expo-location';
import * as ImageManipulator from 'expo-image-manipulator';
import errorImage from "../assets/errorLokasi.png"
// import RNFS from 'react-native-fs'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as FileSystem from 'expo-file-system'
import axios from '../axios'
import scan from "../assets/scanBarcode.png"
import back from "../assets/arrow-left.png"
import frameCamera from '../assets/frameCamera.png'


export default function App(props) {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });

  const [listAbsen, setListAbsen] = useState([])
  const [access_token, setAccessToken] = useState('')
  const [username,setUsername] = useState('') 
  const [data2, setData2] = useState(['ani','budi', 'dion'])
  const [errMessage, setErrMessage] = useState('')

  
  // menjalankan code saat layar pertama ditampilkan
  useEffect(() => {
    
    async function getToken() {
      const token = await AsyncStorage.getItem('accessToken')
      console.log({ token })
      if(!token) {
        props.navigation.navigate('loginPage')
      }
    }
    getToken()
    async function getName() {
      const name = await AsyncStorage.getItem('username')
      setUsername(name)
    }
    getName()
    getAbsen()
  }, [])

  useEffect(() => {
    console.log(listAbsen, '===');
  }, [listAbsen])
  async function getAbsen() {
    axios({
      method: "GET",
      url: '/mobile/lastabsen',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        access_token: await AsyncStorage.getItem('accessToken')
        },
    })
    .then(({data}) => {
      // console.log(data, "<<<<");
      setListAbsen(data)
    })
    .catch(err => {
      console.log(err)
    })
  }
  



  return (
    <View style={styles.container}>

      <View style={styles.headBody}>
          <Text style={styles.name}>{username} </Text>
          <TouchableOpacity onPress={() => props?.navigation?.navigate('mainPage')}>
            <Image style={styles.settingImage} source={back}  />

          </TouchableOpacity>
      </View>

      <View style={styles.mainBody}>
        {
          listAbsen.map((e, index) =>  

          <View style={styles.boxItem}>
            <View style={styles.lineText}>
              <Text style={styles.name}> {e?.date || ''} </Text>
              <Text style={styles.name}>{e?.Lokasi || ''} </Text>
            </View>
            <View style={styles.lineText}>
              <Text style={styles.name}> {e.time}  </Text>
              <Text style={styles.name}>{e.typeAbsen}</Text>
            </View>
          </View>
          )
        }
      </View>
    {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',

    // backgroundColor: 'red'
  },
  name: {
    justifyContent: 'space-between'
  },
  lineText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'

  }, 
  headBody: {
    marginTop: 24,
    width: "100%",
    paddingHorizontal: 16,
    alignItems: 'center',
    // paddingVertical: 12,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  mainBody: {
    // alignItems: 'center',
    flex: 10,
    padding: 20,
    width: "100%",
    backgroundColor: '#F5F5F5'
  },
  boxItem: {
    borderColor: '#00803C',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical:5,
    marginBottom: 20,
  },
  settingImage: {
    width: 24,
    height: 24 
  },

});
