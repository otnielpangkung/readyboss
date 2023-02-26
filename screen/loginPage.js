import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,Button,TouchableOpacity, TextInput } from 'react-native';
import React, {useState, useEffect}  from 'react';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../axios';


import errorImage from "../assets/Alert.png"
export default function App(props) {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [userId, setUserId] = useState('')
  const [errMessage, setErrMessage] = useState('')


  return (
    <View style={styles.container}>

      <View style={styles.stack1}>
        { errMessage !== '' && 
          <Image source={errorImage} style={styles.alert} />
        }
        <Text style={styles.welcome}>Welcome</Text>
        <Text style={styles.masukkan}>Masukkan username dan password untuk menggunakan aplikasi.</Text>
      </View>
      
      <View style={styles.stack2}>
      <Text style={styles.inputTitle}> Username</Text>
        <TextInput value={username} onChangeText={async (e)=> {
          // await AsyncStorage.setItem('username', e); // set item
          setUsername(e)
          setErrMessage('')
          }} style={styles.TextInput} />
      <Text style={styles.inputTitle}> Password</Text>
        <TextInput value={password} onChangeText={(e)=> {
          setPassword(e)
          setErrMessage('')
          }} style={styles.TextInput} secureTextEntry={true} />
      <TouchableOpacity style={styles.loginButton} onPress={async () => {
        if (username.length === 0) {
          setErrMessage('username tidak boleh kosong')
          return
        }
        if (password.length === 0) {
          setErrMessage('password tidak boleh kosong')
          return
        }
        let params = {
            username: username,
            password: password,
        }

        try {
          console.log(params,"===")
          const response  = await axios.post("/mobile/login",params)
          // const response  = await axios.post("https://192.168.8.135:3001/mobile/login",params)
          // const response  = await axios.post("https://103.181.183.98:3001/mobile/login",params)
          console.log("yeeess")
          const data = response.data
          await AsyncStorage.setItem('accessToken', data.access_token)
          AsyncStorage.setItem('username', data.username)
          AsyncStorage.setItem('id', data.id.toString())
          props.navigation.navigate('mainPage', {
          acees_token: data.access_token,
          username: username,
          password: password,
          userId: userId
        })
          console.log("berhasil login")
        } catch(error) {
          setErrMessage('username/password salah')
          // console.log(JSON.stringify(error))
          console.log(error)
        }
        
      }
      }>
        <Text style={styles.loginText} > Masuk</Text>
      </TouchableOpacity>
      </View>
      
      <View style={styles.stack3}>
        <Text style={styles.dengan}>Dengan masuk saya setuju dengan ketentuan Layanan & kebijakan privasi</Text>
      </View>
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
  alert :{
    width: 312,
    height: 40,
  },
  stack1: {
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  welcome: {
    fontWeight: '500',
    fontSize: 28,
    marginBottom: 8  
  },
  masukkan: {
    fontWeight: '400',
    fontSize: 16,
    textAlign:'center',
    color:"#757575"
  },
  stack2: {
    width: '100%',
    padding:24,
    justifyContent: 'center',
    flex: 1
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
  TextInput:{
    width: '100%',
    borderColor: '#00803C',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical:5,
    borderRadius: 20
  },
  loginButton:{
    width: '100%',
    height: 40,
    marginTop: 32,
    backgroundColor: '#00803C',
    borderWidth: 1,
    borderRadius: 20,
  },
  loginText: {
    alignSelf: 'center',
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '500', 
    color:"#FFFFFF",
    marginBottom: 4,
    marginTop: 10
  },  
 
  stack3: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1
  },
  dengan: {
    fontWeight: '300',
    fontSize: 12,
    textAlign:'center',
    color:"#757575"
  },


});
