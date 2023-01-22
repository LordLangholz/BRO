import React, { useState, useEffect } from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ImagePickerComponent from '../components/ImagePickerComponent'

export default class ScanScreen extends React.Component {

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
        <ImagePickerComponent/>
    );
  }
}

const styles = StyleSheet.create({});
