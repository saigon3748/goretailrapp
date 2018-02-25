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
              <MaterialIcons name='settings' color={'#2177b4'} size={20} />            
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
              <MaterialIcons name='print' color={'#2177b4'} size={20} />            
            </Left>
            <Body>
              <Text>Printing</Text>
            </Body>
            <Right>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
            </Left>
            <Body style={{marginLeft: 20}}>
              <Text>Invoice Printer</Text>
            </Body>
            <Right>
              <TextInput value="TCP:F8:D0:27:2B:0F:93" style={{width: 400, height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
            </Left>
            <Body style={{marginLeft: 20}}>
              <Text>Kitchen Printer</Text>
            </Body>
            <Right>
              <TextInput value="TCP:F8:D0:27:2B:0F:93" style={{width: 400, height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
            </Left>
            <Body style={{marginLeft: 20}}>
              <Text>Line 1</Text>
            </Body>
            <Right>
              <TextInput value="NOODLE HOUSE" style={{width: 400, height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
            </Left>
            <Body style={{marginLeft: 20}}>
              <Text>Line 2</Text>
            </Body>
            <Right>
              <TextInput value="The Original Noodle" style={{width: 400, height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
            </Left>
            <Body style={{marginLeft: 20}}>
              <Text>Line 3</Text>
            </Body>
            <Right>
              <TextInput value="350 Elizabeth" style={{width: 400, height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
            </Left>
            <Body style={{marginLeft: 20}}>
              <Text>Line 4</Text>
            </Body>
            <Right>
              <TextInput value="Phone 123" style={{width: 400, height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>
            </Right>
          </ListItem>
          <ListItem icon>
            <Left>
            </Left>
            <Body style={{marginLeft: 20}}>
              <Text>Line 5</Text>
            </Body>
            <Right>
              <TextInput value="ABN 456" style={{width: 400, height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>
            </Right>
          </ListItem>
        </List>

        <View style={{flex: 1}} />

        <View style={{height: 70, flexDirection: 'row', backgroundColor: '#f2f3f4'}}>
          <View style={{flex: 1}}></View>
          <View style={{width: 170}}>
            <Button style={{marginTop: 10, backgroundColor: '#6c757d'}} full><Text> CANCEL </Text></Button>
          </View>
          <View style={{width: 50}}></View>
          <View style={{width: 170}}>
            <Button style={{marginTop: 10, backgroundColor: '#2177b4'}} full><Text> SAVE </Text></Button>
          </View>
          <View style={{flex: 1}}></View>
        </View>
      </View>      
    );
  }
}

Dashboard.propTypes = {
};

export default Dashboard;

