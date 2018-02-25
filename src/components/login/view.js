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
  constructor(props) {
    super(props);
    this.state = {};
  }

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
        <View style={{width: 280}}>
          <Text style={{marginTop: 180, textAlign: 'center', fontSize: 35, color: 'rgb(70, 70, 70)'}}>goretailr</Text>
          <Text style={{marginTop: 30}}>Login ID</Text>
          <TextInput autoCapitalize='none' style={{marginTop: 10, height: 35, borderColor: '#d2d3d4', borderWidth: 1}} onChangeText={username => this.setState({ username })}/>          
          <Text style={{marginTop: 20}}>Password</Text>
          <TextInput secureTextEntry style={{marginTop: 10, height: 35, borderColor: '#d2d3d4', borderWidth: 1}} onChangeText={password => this.setState({ password })}/>          
          <Button full style={{marginTop: 30, backgroundColor: '#2177b4'}} onPress={() => this.props.login(this.state.username, this.state.password)}><Text> LOGIN </Text></Button>
        </View>
        <View style={{flex: 1}}></View>        
      </View>
    );
  }
}

Login.propTypes = {
};

export default Login;
