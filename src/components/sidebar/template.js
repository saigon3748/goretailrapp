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

class Sidebar extends React.Component {
  onPress() {
    alert('press')
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#F5F8F9'}}>
        <List style={{marginTop: 40}}>
          <ListItem icon>
            <Left>
            </Left>
            <Body>
              <Text>Dashboard</Text>
            </Body>
            <Right>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
            </Left>
            <Body>
              <Text>Cashier</Text>
            </Body>
            <Right>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
            </Left>
            <Body>
              <Text>Kitchen</Text>
            </Body>
            <Right>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
            </Left>
            <Body>
              <Text>Printer</Text>
            </Body>
            <Right>
            </Right>
          </ListItem>
        </List>

        <View style={{flex: 1}}/>

        <View style={{marginTop: 20, marginBottom: 20, marginLeft: 10, marginRight: 10}}>
          <Button full onPress={this.onPress} style={{backgroundColor: '#2177b4'}}><Text> LOGOUT </Text></Button>
        </View>
      </View>
    );
  }
}

Sidebar.propTypes = {
};

export default Sidebar;

