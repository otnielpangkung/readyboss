import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,Button,TouchableOpacity, TextInput, RefreshControlBase } from 'react-native';
import React, {useState, useEffect}  from 'react';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

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
  const [barcode, setBarcode] = useState('')
  const [image, setImage] = useState(null)
  const [lokasi, setLokasi] = useState("")
  const [access_token, setAccessToken] = useState('')
  const [username,setUsername] = useState('') 
  const [errMessage, setErrMessage] = useState('')
  // variable yang dinamis untuk dirender ulang, beda dengan let, 
  // kalo let itu valuenya berubah tidak akan dirender ulang
  // let usernames =await AsyncStorage.getItem('username')
  
  // menjalankan code saat layar pertama ditampilkan
  useEffect(() => {
    
    async function getToken() {
      const token = await AsyncStorage.getItem('accessToken')
      // const hasil = AsyncStorage.getItem('hasil')
      // console.log({ hasil}) // yg ke console adalah Promise
      // const hasil = await AsyncStorage.getItem('hasil)
      // console.log({ hasil }) // yg ke console adalah hasil: undefined / hasil: 10
      const result =  await Location.requestForegroundPermissionsAsync()
      console.log({ token })
      setAccessToken(token)
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
  }, [])

  useEffect(() => {
    console.log({ lokasi })
  }, [lokasi])

  
  const tanggal = moment(new Date()).format('dddd, DD MMM YYYY')

  // Camera

  return (
    // Tombl. {lokasi 2 = }
    <View style={styles.container}>
      <View style={styles.headBody}>
        <TouchableOpacity onPress={() => props.navigation.navigate('historyPage')}>
          <Text>History</Text>

        </TouchableOpacity>
          <Text style={styles.name}>{username} </Text>
          <TouchableOpacity onPress={async () => 
        { await AsyncStorage.clear()
        setErrMessage('')
            setBarcode('')
            setImage('')
            setLokasi('')
          props.navigation.navigate('loginPage')}}>
          <Text>LogOut</Text>
          {/* <Image style={styles.settingImage} source={back} /> */}
          </TouchableOpacity>
      </View>
      <View style={styles.stack1}>
        { errMessage !== '' && 
          <Image source={errorImage} style={styles.alert} />
        }
      </View>
      <View style={styles.mainBody}>
        <Text  style={styles.tanggal}>{tanggal}</Text>
        <Text style={styles.inputTitle}>Lokasi</Text>

        <View style={styles.rowInline}>
        {
          barcode.Lokasi &&  <Text style={styles.lokasiScan}>{barcode.Lokasi} </Text>
        }
        {
          !barcode.Lokasi && <Text style={styles.lokasiScan}> Silahkan Scan Barcode</Text>
        }
        {
          !barcode.Lokasi && 
        <TouchableOpacity style={styles.barcodeButton} onPress={() => props.navigation.navigate('takeBarcode', {setBarcode: setBarcode})}>
          <Image source={scan} style={styles.scanBarcode}/>
        </TouchableOpacity>
        }
        {/* <Text value={barcode.Lokasi ? {Lokasi : barcode.Lokasi}  : "-"} onChangeText={(e)=> setLokasi(e)} style={styles.lokasiScan} /> */}
      </View>
        <Text style={styles.inputTitle}>Bukti Foto</Text>
        
        <TouchableOpacity style={styles.cameraFrame} onPress={() => props.navigation.navigate('takePhoto', {setImage: setImage})}>
          <Image source={image?.uri ? {uri: image.uri} : frameCamera} style={styles.camera}/>
        </TouchableOpacity>
        {( barcode.Lokasi && image !==null && image.uri !== null  ) && <TouchableOpacity style={styles.konfirmButton} onPress={async () => {
            const base64 = await FileSystem.readAsStringAsync(image.uri, { encoding: 'base64' })
            const data = new FormData();
            const manipResult = await ImageManipulator.manipulateAsync(
              image.uri,
              [
                {
                  resize: {
                    width: image.width * 0.3,
                    height: image.height * 0.3,
                  }
                }
              ],
              { compress: 0.5, format: "jpeg" }
            );
            // console.log({ manipResult })
            data.append('photo', {
              user: "saya",
              name: "photo1.jpg",
              type: "image/jpeg",
              uri : manipResult.uri,
            })
            data.append('barcode', JSON.stringify(barcode))
            const location = await Location.getCurrentPositionAsync()
            console.log(location.coords,"=======");
            data.append('lokasi', JSON.stringify(location.coords))
            // console.log(location.coords, "+++++")
            let id = await AsyncStorage.getItem('id')
            data.append('id', id)
            axios({
              method: "POST",
              // url: 'https://192.168.8.135:3001/mobile/absen',
              url: '/mobile/absen',
              data: data,
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'multipart/form-data',
                access_token: await AsyncStorage.getItem('accessToken')
                },
            })
            // console.log("Yeeess")
            .then(data => {
              console.log("Yeeess")
              setImage("")
              setBarcode('')
              setErrMessage('')
              props.navigation.navigate('afterPhoto')
            })
            .catch(err => {
              console.log("Nooo")
              console.log(JSON.stringify(err))
              setErrMessage('username/password salah')
            })        

        }}>
          <Text style={styles. konfirmText}>Konfirmasi Absen</Text></TouchableOpacity> }
      </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headBody: {
    marginTop: 24,
    width: "100%",
    paddingHorizontal: 24,
    alignItems: 'center',
    // paddingVertical: 12,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  alert :{
    width: 312,
    height: 40,
  },
  name: {
    fontSize: 16
  },
  settingImage: {
    width: 24,
    height: 24 
  },
  mainBody: {
    // alignItems: 'center',
    flex: 10,
    padding: 40,
    width: "100%",
    backgroundColor: '#F5F5F5'
  },
  tanggal: {
    alignSelf: 'flex-start',
    fontSize: 14,
    marginBottom: 20
  },
  inputTitle: {
    alignItems: 'flex-start',
    justifyContent:'flex-start',
    textAlign: 'left',
    fontSize: 12,
    color:"#757575",
    marginBottom: 4,
    marginTop: 10
  },  
  lokasiScan:{
    width: '90%',
    fontSize: 16,
    fontWeight: "500",
    paddingVertical:5,
  },
  lokasiScanRed:{
    width: '90%',
    color: '#E41B17',
    fontSize: 16,
    fontWeight: "500",
    paddingVertical:5,
  },
  rowInline: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 16
  },
  barcodeButton: {
    width: 40,
    height:40,
    borderRadius: 20
  },
  scanBarcode: {
    width: 40,
    height:40,
  },
  cameraFrame: {
    width: '100%',
    // borderStyle:,
    height: 312,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:20,
    marginBottom: 40,
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  konfirmButton: {
    alignItems:'center',
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#00803C',
    paddingVertical: 10
  },
  konfirmText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF'
  },
  greenButton:{

  }
});
