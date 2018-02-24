import React from 'react';
import { ScrollView, View, TouchableOpacity, TouchableHighlight, StyleSheet, Image, ImageBackground, TextInput, FlatList } from 'react-native';
import { Container, Content, Card, CardItem, Form, Item, Header, Left, Body, Right, Button, Icon, Title, List, ListItem, Text, Thumbnail, Input, InputGroup, Label } from 'native-base';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 30, 
    margin: 10
  },

  logo: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 50
  },

  background: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    backgroundColor: "#fff",
    justifyContent: 'space-between'
  }  
});

class Login extends React.Component {
  onPress() {
    alert('press')
  }

  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff'
      }}>
        <View style={{flex: 1}}></View>
        <View style={{width: 270}}>
          <Text style={{marginTop: 180, textAlign: 'center', fontSize: 35, color: 'rgb(70, 70, 70)'}}>goretailr</Text>
          <Text style={{marginTop: 30, color: 'rgb(70, 70, 70)'}}>Login ID</Text>
          <TextInput autoCapitalize='none' style={{marginTop: 10, height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
          <Text style={{marginTop: 20, color: 'rgb(70, 70, 70)'}}>Password</Text>
          <TextInput secureTextEntry style={{marginTop: 10, height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
          <Button style={{marginTop: 30, backgroundColor: '#2177b4'}} full onPress={this.props.login} disabled={this.props.loading}><Text> LOGIN </Text></Button>
        </View>
        <View style={{flex: 1}}></View>        
      </View>      
    );
  }
}

Login.propTypes = {
};

export default Login;
