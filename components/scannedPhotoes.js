import React, { useState, useEffect } from "react";
import { ImageBackground, Image, View, Text, StyleSheet, TouchableOpacity, FlatList, Pressable } from "react-native";
import { async } from "@firebase/util";
import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
import { firebase } from "../config/config";
import {db} from '../config/config'
import {app} from '../config/config'



const MyScans = () => {
  const [scans, setScans] = useState([]);
  const scanRef = firebase.firestore().collection('scans');

  //We use useEffect to fetch data from firestore database
  useEffect(() => {
    const scanData = async() => {
    scanRef.onSnapshot(
      querySnapshot => {
        const scans = []
        querySnapshot.forEach((doc) => {
          const { text } = doc.data()
          scans.push({
            id: doc.id,
            text,
          })
        })
        setScans(scans)
      }
    )
  };
  scanData()
  }, [])

  return ( //We view our data from the database using "Flatlist"
  
    <View style={{ flex:10, marginTop:2, backgroundColor:"white"}}>
  

      <View>
      <Image style={styles.profilePicture} source={require('../assets/SineProfilePicture.png')} />
       </View>
      
       <Text style={styles.text}>Welcome Sine</Text>
       <Text style={styles.innerText}>See your coffees below:</Text>

      <FlatList
        style={{height:'100%'}}
        data={scans}
        numColumns={1}
        renderItem={({item}) => (
          <Pressable
            style={styles.container}
            >
              <View style={styles.innerContainer}>
                <Text style={styles.itemText}>{item.text}</Text>
          
              </View>

          </Pressable>
        )}
      />

    </View>
  )
}

export default MyScans;


const styles = StyleSheet.create({
  container:{
    backgroundColor: "pink",
    padding:30,
    borderRadius:20,
    margin:6,
    marginHorizontal:15,
    borderWidth: 1,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 2, width: 2 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS

  },
  innerContainer:{
    alignItems:'center',
    flexDirection:'colum',

  },
  itemText:{
    fontWeight:'500',
    fontSize: 20,
  },
  text:{
    fontSize: 40,
    fontWeight: 'bold',
    alignItems:'center',
    alignItems: 'center',

  },
  innerText:{
    fontSize: 20,
    fontWeight: 'bold',
    alignItems:'center',
    alignItems: 'center',

  },
  profileContainer:{
    width: 100,
    height: 100,
    borderRadius: 100/2,
    backgroundColor: "pink",
    margin:40,
    marginHorizontal:150,
    alignItems:'center',
    resizeMode:"center",

  },
  profilePicture:{
    width: 200, 
    height: 200,
    borderRadius: 400/ 2,
    borderWidth: 5,
  
  },
  backgroundPicture: {
    backgroundColor: '#fc0',
    width: 100,
    height: 100,
  }

})




/*

export default class ProfileScreen extends React.Component {

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

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Profile Screen </Text>
            <ImageBackground source={ {uri: "https://simplesolution-it.dk/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png" } } resizeMode="cover" style={styles.image}>
      <Text style={styles.text}>Here are your scans:</Text>
    </ImageBackground>
            
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    image: {
      flex: 1,
      justifyContent: "center",
      width: '100%',
      height: '100%',
    },
    text: {
        fontSize:20,
    },
});
*/
