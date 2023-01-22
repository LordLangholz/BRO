/*
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image  } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../config/config';
import { requestMicrophonePermissionsAsync } from "expo-camera";
import { async } from "@firebase/util";
import { Camera } from "expo-camera";

const UploadScreen = () => {

  
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // We can specify whether we need only Images or Videos
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,   // 0 means compress for small size, 1 means compress for maximum quality
    });

    
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    
    //const source = {uri: result.uri};
    //console.log(source);
    //setImage(source);

};


const uploadImage = async () => {
  setUploading(true);
  const response = await fetch(image.uri)
  console.log(response + 'Det er er response')
  const blob = await response.blob();
  const filename = image.uri.substring(image.uri.lastIndexOf('/')+1);
  var ref = firebase.storage().ref().child(filename).put(blob);

  try {
    await ref;
  } catch (e) {
    console.log('The error is: ' + e)
  }
  setUploading(false);
  Alert.alert(
      'Photo uploaded..!! WupWup'
  );
  setImage(null);
};
return(
  <SafeAreaView style={styles.container}>
    <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
      <Text style={styles.buttonText}>We reccomend</Text>
    </TouchableOpacity>
    <View style={styles.imageContainer}>
    {image && <image source={{uri: image.assets[0].uri}} style={{ width:300, height:300}} />}
    <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
      <Text style={styles.buttonText}>
        See what friends are brewing!
      </Text>
    </TouchableOpacity>
    </View>
  </SafeAreaView>
)
}

export default UploadScreen;


const styles = StyleSheet.create({
  container: {
      flex:1,
      alignItems:'center',
      backgroundColor:'pink',
      justifyContent:'center',
   
  },
  selectButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor:'blue',
    alignItems:'center',
    },
  uploadButton: {
      borderRadius:5,
      width:150,
      height:50,
      backgroundColor:'red',
      alignItems: 'center',
      justifyContent:'center'
  },
  buttonText: {
    color:'white',
    fontSize:18,
    fontWeight:'bold'
  },
  imageContainer: {
    marginTop: 30,
    marginBottom:50,
    alignItems:'center',
  }
});




/*
import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { Button, Image, View, Text, ActionSheetIOS, StyleSheet, TouchableOpacity } from "react-native";
import Constants from 'expo-constants';
import * as Camera from 'expo-camera';
import callGoogleVisionAsync from "../helperFunctions";

import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
import {db} from '../config/config'
import { firebase } from "../config/config";

const [image, setImage] = useState(null)
const [uploading, setUploading] = useState(false)
const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // We can specify whether we need only Images or Videos
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,   // 0 means compress for small size, 1 means compress for maximum quality
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response);
      };
      xhr.onerror = function() {
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', image, true);
      xhr.send(null);
    })
    const ref = firebase.storage().ref().child(`scans/Image1`)
    const snapshot = ref.put(blob)
    snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED,
      ()=>{
        setUploading(true)
      },
      (error) => {
        setUploading(false)
        console.log(error)
        blob.close()
        return 
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false)
          console.log("Download URL: ", url)
          setImage(url)
          blob.close()
          return url
        })
      }
      )
  }

  export default uploadImage;
  */