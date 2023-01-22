import React, { useState, useEffect } from "react";
import {  ImageBackground, Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import UploadScreen from "../components/savePictureComponent";

export default class HomeScreen extends React.Component {

constructor(props) {
    super(props);
    this.state = {
    };
}

componentDidMount(){

  this.setState({
  })
}
render() {

  // const image = { uri: "https://reactjs.org/logo-og.png" };

   return (
    <View style={styles.container}>
    <Text style={styles.text}>Welcome to</Text>
   

   <View>
        <Image source={require('../assets/pinkBackground.jpg')}  style={styles.backgroundImage}/>
        <View styles={styles.innerText}>

   </View>
   <Text style={styles.innerText}>BRØG </Text>
    </View>
    </View>


   );
 }
}
const styles = StyleSheet.create({  
  text:{
    fontSize: 35,
    fontWeight: 'bold',
    alignItems:'center',
    alignItems: 'center',
    marginBottom: 30,
  

  },
  innerText:{
    position: 'absolute', 
    top: 20, 
    left: 20, right: 20, bottom: 20, justifyContent: 'center', alignItems: 'center',
    color:"white",
    fontSize: 35,
    fontWeight: 'bold',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 5,
    flex: 40,
    padding: 80,
    flexDirection:'row',
    alignItems:'center',
    


  },
  backgroundPicture: {
  backgroundColor: 'pink',
  width: 100,
  height: 100,},

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'column',
},
    backgroundImage:{
    width:320,
    height:480,
    borderWidth: 5,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 2, width: 2 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
  }
});
/*
render() {

  // const image = { uri: "https://reactjs.org/logo-og.png" };

   return (
    <UploadScreen/>
   );
 } 
}

const styles = StyleSheet.create({
});


/*   render() {

   // const image = { uri: "https://reactjs.org/logo-og.png" };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>HomeScreen</Text>
            <ImageBackground source={ {uri: "https://images.photowall.com/products/53211/more-coffee-beans.jpg?h=699&q=85" } } resizeMode="cover" style={styles.image}>
      <Text style={styles.text}>Heyyy there</Text>
    </ImageBackground>
        </View>



    );
  } */