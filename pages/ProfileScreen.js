import React, { useState, useEffect } from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ImagePickerComponent from '../components/ImagePickerComponent'
import MyScans from "../components/scannedPhotoes";

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
      
        <MyScans/>
    );
  }
}

const styles = StyleSheet.create({});
