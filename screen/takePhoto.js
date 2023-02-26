import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,Button,TouchableOpacity, TextInput } from 'react-native';
import React, {useState, useEffect}  from 'react';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { Camera, CameraType } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

import arrowLeft from '../assets/arrow-left.png'
import foto from '../assets/foto.png'
import takePhoto from "../assets/takePhoto.png"

export default function App(props) {
  let [fontsLoaded] = useFonts({
    Inter_900Black,
  });
  const [lokasi, setLokasi] = useState('')
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [face, setFace]= useState(false)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  let camera = null
  const handleFacesDetected = ({ faces }) => {
    if(faces.length > 0) {
      setFace(true)
    } else {
      setFace(false)
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.mainBody}>
      <Camera 
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
          runClassifications: FaceDetector.FaceDetectorClassifications.none,
          minDetectionInterval: 100,
          tracking: true,
        }}
        style={styles.foto} type={type} ref={(r) => { camera = r}}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(type === CameraType.back ? CameraType.front : CameraType.back);
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
        <TouchableOpacity onPress={async() => {
          if(!face) return
          if (!camera) return
          const photo = await camera.takePictureAsync()
          console.log(photo,"----")
          props.route.params.setImage(photo)
          props.navigation.goBack()
        }} style={styles.lanjutkanBut}>
        <Image source={takePhoto} style={styles.buttonFoto} />
        </TouchableOpacity>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headBody: {
    marginTop: 24,
    width: "100%",
    // paddingHorizontal: 24,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignContent: 'center'
  },
  name: {
    fontSize: 16
  },
  settingImage: {
    width: 24,
    height: 24,
    marginRight: 8
  },
  mainBody: {
    // alignItems: 'center',
    flex: 10,
    // padding: 40,
    width: "100%",
    backgroundColor: '#0A0A0A'
  },
  foto: {
    // borderRadius: 20,
    marginTop: 32,
    height: '80%',
    width: '100%',
    marginBottom:'10%',
    borderRadius: 20
  },
  lanjutkanBut: {
    width: '100%',
    paddingVertical:10,
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: '5%'
  },
  buttonFoto: {
    width: 56,
    height: 56 
  }

});

