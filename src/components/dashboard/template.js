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
        backgroundColor: '#F5F8F9'
      }}>
        <View style={{
          flex: 8, 
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <View style={{width: 270, flexDirection: 'column', backgroundColor: 'rgb(221, 226, 229)'}}>
            <Text style={{marginTop: 180, textAlign: 'center', fontSize: 35, color: 'rgb(70, 70, 70)'}}>Dashboard</Text>
            <Button style={{marginTop: 30, backgroundColor: '#2177b4'}} full onPress={this.props.gotoCashier} disabled={this.props.loading}><Text> CASHIER </Text></Button>
            <Button style={{marginTop: 30, backgroundColor: '#2177b4'}} full onPress={this.props.print} disabled={this.props.loading}><Text> PRINT </Text></Button>
          </View>
          <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#F5F8F9'}}>
          </View>
        </View>
      </View>      
    );
  }
}

Dashboard.propTypes = {
};

export default Dashboard;

