import _ from 'lodash';
import moment from "moment";
import React from 'react';
import { NativeModules, AsyncStorage, Alert, ScrollView, View, TouchableOpacity, TouchableHighlight, StyleSheet, Image, ImageBackground, TextInput, FlatList } from 'react-native';
import { Container, Content, Card, CardItem, Form, Item, Header, Left, Body, Right, Button, Icon, Title, List, ListItem, Text, Thumbnail, Input, InputGroup, Label, Toast } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MenuApi, OrderApi, TenantApi, KitchenApi } from '../../api';
import { Helper } from '../../utils';

class Kitchen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: false,
      orders: []
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('payload', (err, payload) => {
      if (!payload) return;
      this.setState({
        isSignedIn: true
      });     
    });
  }

  componentDidMount() {
    KitchenApi.getToday()
      .then(result => {
        this.setState({
          orders: result
        });
      })
  }

  onRefresh() {
    
  }

  onCompleteAll() {
    
  }

  onNote(item) {
    
  }

  onComplete(item) {
    KitchenApi.markCompleted(item._id)
  }

  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#fff'
      }}>
        <List style={{marginTop: 40}}>
          <ListItem icon>
            <Left>
              <MaterialIcons name='assignment' color={'#6c757d'} size={20} />            
            </Left>
            <Body>
              <Text>Today</Text>
            </Body>
            <Right>
            </Right>
          </ListItem>
        </List>

        <View style={{flex: 1, marginBottom: 10}}>
          <ScrollView style={{flex: 1, flexDirection: 'column', marginLeft: 30, marginRight: 10}}>
            <List>
              {this.state.orders.map(item => (
                <ListItem key={item._id} style={{height: 80}}>
                  <Body>
                    <View style={{flexDirection: "row"}}>
                      <Text style={{width: 50}}>#{item.orderRef}</Text>
                      <Text style={{width: 50, textAlign: 'right'}}>{item.quantity}</Text>
                      <Text style={{width: 200}}>{item.name}</Text>
                      <Text style={{flex: 1}}>{item.note}</Text>
                      <Text style={{width: 50}}>
                        {(() => { return moment(item.createdAt).format("HH:mm") })()}
                      </Text>
                      <View style={{width: 100, alignItems: 'center'}}>
                        <View style={{width: 80, alignItems: 'center'}}>
                          <Button full small style={{backgroundColor: '#6c757d'}} onPress={() => {this.onNote(item)}}><Text> NOTE </Text></Button>                      
                        </View>
                      </View>
                      <View style={{width: 100, alignItems: 'center'}}>
                        <View style={{width: 80, alignItems: 'center'}}>
                          <Button full small style={{backgroundColor: '#2177b4'}} onPress={() => {this.onComplete(item)}}><Text> DONE </Text></Button>                      
                        </View>
                      </View>
                    </View>
                  </Body>
                </ListItem>
              ))}
            </List>
          </ScrollView>
        </View>

        <View style={{height: 65, flexDirection: 'row', backgroundColor: '#f2f3f4'}}>
          <View style={{flex: 1}}></View>
          <View style={{width: 180}}>
            <Button full style={{marginTop: 10, backgroundColor: '#6c757d'}} onPress={() => this.onRefresh()}><Text> REFRESH </Text></Button>
          </View>
          <View style={{width: 50}}></View>
          <View style={{width: 180}}>
            <Button full style={{marginTop: 10, backgroundColor: '#2177b4'}} onPress={() => this.onCompleteAll()}><Text> COMPLETE ALL </Text></Button>
          </View>
          <View style={{flex: 1}}></View>
        </View>
      </View>      
    );
  }
}

Kitchen.propTypes = {
};

export default Kitchen;
