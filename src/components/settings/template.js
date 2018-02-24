import React from 'react';
import { ScrollView, View, TouchableOpacity, TouchableHighlight, StyleSheet, Image, ImageBackground, TextInput, FlatList } from 'react-native';
import { Container, Content, Card, CardItem, Form, Item, Header, Left, Body, Right, Button, Icon, Title, List, ListItem, Text, Thumbnail, Input, InputGroup, Label, Switch } from 'native-base';
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

class Dashboard extends React.Component {
  onPress() {
    alert('press')
  }

  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#FFF'
      }}>
        <List style={{marginTop: 40}}>
          <ListItem icon>
            <Left>
              <MaterialIcons name='settings' color={'#6c757d'} size={20} />            
            </Left>
            <Body>
              <Text>General</Text>
            </Body>
            <Right>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
            </Left>
            <Body style={{marginLeft: 20}}>
              <Text>Confirm & Print</Text>
            </Body>
            <Right>
              <Switch value={true} />
            </Right>
          </ListItem>
        </List>
         <List style={{marginTop: 40}}>
          <ListItem icon>
            <Left>
              <MaterialIcons name='print' color={'#6c757d'} size={20} />            
            </Left>
            <Body>
              <Text>Invoice Printer</Text>
            </Body>
            <Right>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
            </Left>
            <Body style={{marginLeft: 20}}>
              <Text>12::23::45::89</Text>
            </Body>
            <Right>
              <Switch value={true} />
            </Right>
          </ListItem>
        </List>

        <List style={{marginTop: 40}}>
          <ListItem icon>
            <Left>
              <MaterialIcons name='print' color={'#6c757d'} size={20} />            
            </Left>
            <Body>
              <Text>Kitchen Printer</Text>
            </Body>
            <Right>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
            </Left>
            <Body style={{marginLeft: 20}}>
              <Text>12::23::45::89</Text>
            </Body>
            <Right>
              <Switch value={false} />
            </Right>
          </ListItem>          
        </List>

        <View style={{flex: 1}}/>
      </View>      
    );
  }
}

Dashboard.propTypes = {
};

export default Dashboard;

