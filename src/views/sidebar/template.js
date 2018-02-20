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
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'rgb(221, 226, 229)'}}>
        <View style={{height: 90, marginTop: 30, marginLeft: 10, marginRight: 10}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={{flex: 1}}>Subtotal</Text>
            <Text style={{width: 100, textAlign: 'right'}}>$100.05</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={{flex: 1}}>Discount</Text>
            <Text style={{width: 100, textAlign: 'right'}}>$0.00</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={{flex: 1}}>Tax</Text>
            <Text style={{width: 100, textAlign: 'right'}}>$12.08</Text>
          </View>
        </View>

        <View style={{height: 40, marginTop: 10, marginLeft: 10, marginRight: 10}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={{flex: 1, fontSize: 30, color: 'rgb(70, 70, 70)'}}>Total</Text>
            <Text style={{width: 150, textAlign: 'right', fontSize: 30, color: 'rgb(70, 70, 70)'}}>$8,952.00</Text>
          </View>
        </View>

        <View style={{marginTop: 20, marginBottom: 20, marginLeft: 10, marginRight: 10}}>
          <Button full onPress={this.onPress} style={{backgroundColor: '#6c757d'}}><Text> LOGOUT </Text></Button>
        </View>
      </View>
    );
  }
}

Sidebar.propTypes = {
};

export default Sidebar;

