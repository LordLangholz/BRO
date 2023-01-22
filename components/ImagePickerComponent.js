import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect } from "react";
import { Button, Image, View, Text, ActionSheetIOS, StyleSheet, TouchableOpacity } from "react-native";
import Constants from 'expo-constants';
import * as Camera from 'expo-camera';
import callGoogleVisionAsync from "../helperFunctions";

import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
import { db } from '../config/config'
import { firebase } from "../config/config";

export default class ImagePickerComponent extends React.Component {

constructor(props) {
    super(props);
    this.state = {
      image: null,
      text: null
    };
    this.onSelectPhoto = this.onSelectPhoto.bind(this);
}

componentDidMount(){

  this.getPermissionAsync();

  this.setState({
    image: null,
    //text: "Please add an image"
  })
}

getPermissionAsync = async () => {
  if (Constants.platform.ios) {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
    }

    const { statusIMG } = await Camera.requestCameraPermissionsAsync();
    if (statusIMG !== 'granted') {
    }
  }
}

takePhotoHandler = async () => {

  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    base64: true
  });

  if (!result.canceled) {
    let responseData = await callGoogleVisionAsync(result.assets);
    console.log(responseData + ": det her er res. data")
   responseData = responseData.text.toUpperCase()
    this.setState({ text: responseData });

    const firstWord = responseData.split(" ")[0];


    const q = query(collection(db, "scans"), where("text", ">=", firstWord), where("text", '<=', firstWord + '\uf8ff'));

    console.log("EndData:" + firstWord)

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      console.log(data + "det her er data" )
      var text = data.text;
      console.log(text + ": ER data som text");
    });

    const date = new Date();
    const dateString = date.toISOString();

    await setDoc(doc(db, "scans", dateString), {
     text: this.state.text
   });

  }
}

choosePhotoHandler = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    base64: true,
    allowsEditing: true
  });

  if (!result.canceled) {
    this.setState({ image: result.assets[0].uri });
    this.setState({ text: "Loading..." });

    let responseData = await callGoogleVisionAsync(result.assets.base64);
    responseData = responseData.text.toUpperCase()
    this.setState({ text: responseData });

    const firstWord = responseData.split(" ")[0];
    console.log("den når så langt")

    console.log('split 2')
    console.log(firstWord + ": Er første ord")

    const q = query(collection(db, "scans"), where("text", ">=", firstWord), where("text", '<=', firstWord + '\uf8ff'));

    console.log('Det her er :' + q)
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot + 'den når hertil')
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      console.log(data + 'det her er data')
      var text = data.text;
      console.log(text);
    });

    const date = new Date();
    const dateString = date.toISOString();

    await setDoc(doc(db, "scans", dateString), {
    text: this.state.text
    });
  }
}

onSelectPhoto() {
  ActionSheetIOS.showActionSheetWithOptions(
    {
      title: 'Profilbillede',
      options: ['Annuller', 'Tag billede', 'Vælg fra bibliotek'],
      cancelButtonIndex: 0,
    },
    (buttonIndex) => {
      if (buttonIndex === 1) {
        this.takePhotoHandler();
      }
      if (buttonIndex === 2) {
        this.choosePhotoHandler()
      }
    },
  );
}

  render() {

    return (
        <View style={styles.background}>
         
        {this.state.image && (
          <Image
            source={{ uri: this.state.image }}
            style={{ width: 400, height: 300, resizeMode: "contain" }}
          />
        )}
        <Text>{this.state.text}</Text>
        <Image source={require('../assets/coffeebag.jpeg')}  style={styles.backgroundImage}/>
        <TouchableOpacity
            onPress={this.onSelectPhoto}
            style={styles.button}
          >
            <Text>SCAN</Text>
      </TouchableOpacity>
       
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  button:{
    alignItems: 'center',
    padding: 15,
    marginTop: 20,
    marginBottom: 60,
    borderRadius: 30,
    fontSize: 18,
    borderWidth: 2,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 2, width: 2 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
  },
  background:{
    backgroundColor: "white"}
});
