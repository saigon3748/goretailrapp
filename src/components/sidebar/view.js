import React from 'react';
import { ScrollView, View, TouchableOpacity, TouchableHighlight, StyleSheet, Image, ImageBackground, TextInput, FlatList } from 'react-native';
import { Container, Content, Card, CardItem, Form, Item, Header, Left, Body, Right, Button, Icon, Title, List, ListItem, Text, Thumbnail, Input, InputGroup, Label } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#f2f3f4'}}>
        <List style={{marginTop: 40}}>
          <ListItem icon>
            <Left>
              <MaterialIcons name='dashboard' color={'#6c757d'} size={20} />            
            </Left>
            <Body>
              <TouchableOpacity onPress={this.props.gotoDashboard}>
                <Text>Dashboard</Text>
              </TouchableOpacity>
            </Body>
            <Right>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <MaterialIcons name='assignment' color={'#6c757d'} size={20} />
            </Left>
            <Body>
              <TouchableOpacity onPress={this.props.gotoCashier}>
                <Text>Cashier</Text>
              </TouchableOpacity>
            </Body>
            <Right>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
              <MaterialIcons name='restaurant-menu' color={'#6c757d'} size={20} />
            </Left>
            <Body>
              <TouchableOpacity onPress={this.props.gotoKitchen}>
                <Text>Kitchen</Text>
              </TouchableOpacity>
            </Body>
            <Right>
            </Right>
          </ListItem>
        </List>

        <List style={{marginTop: 40}}>
          <ListItem icon>
            <Left>
              <MaterialIcons name='settings' color={'#6c757d'} size={20} />
            </Left>
            <Body>
              <TouchableOpacity onPress={this.props.gotoSettings}>
                <Text>Settings</Text>
              </TouchableOpacity>
            </Body>
            <Right>
            </Right>
          </ListItem>
        </List>

        <View style={{flex: 1}}/>

        <View style={{marginTop: 20, marginBottom: 20, marginLeft: 10, marginRight: 10}}>
          <MaterialIcons name='account-circle' color={'#6c757d'} size={60} style={{textAlign: 'center', marginBottom: 20}} />
          <Text style={{textAlign: 'center', marginBottom: 40}}>admin</Text>
          <Button full onPress={this.onPress} style={{backgroundColor: '#2177b4'}}><Text> LOGOUT </Text></Button>
        </View>
      </View>
    );
  }
}

Sidebar.propTypes = {
};

export default Sidebar;

