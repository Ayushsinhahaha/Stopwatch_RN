import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Header = ({title}) => {
  return <View style={styles.header}><Text style={styles.headerText}>{title}</Text></View>;
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: 'dodgerblue',
    height: 80,
    alignItems:'center',
    justifyContent:'center'
  },
  headerText:{
    fontSize:40,
    fontWeight:'bold',
    textAlign:'center',
    color:'#fff'
  }
});
