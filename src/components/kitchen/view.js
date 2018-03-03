import _ from 'lodash';
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

class Kitchen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {_id: 1, code: "0015", time: "08:45", name: "Natural Turquoise Brooch", price: 15.05, quantity: 1, note: "https://img0.etsystatic.com/210/0/10748667/il_340x270.1353210938_iqg8.jpg"},
        {_id: 2, code: "0015", time: "08:45", name: "Winter wedding mittens", price: 6.50, quantity: 2, note: "https://img0.etsystatic.com/191/1/7502837/il_340x270.1379665700_jnp8.jpg"},
        {_id: 3, code: "0015", time: "08:45", name: "Watch tools diy steampunk", price: 15.00, quantity: 3, note: ""},
        {_id: 11, code: "0031", time: "11:32", name: "Natural Turquoise Brooch", price: 15.05, quantity: 1, note: "https://img0.etsystatic.com/210/0/10748667/il_340x270.1353210938_iqg8.jpg"},
        {_id: 12, code: "0031", time: "11:32", name: "Winter wedding mittens", price: 6.50, quantity: 2, note: "https://img0.etsystatic.com/191/1/7502837/il_340x270.1379665700_jnp8.jpg"},
        {_id: 13, code: "0052", time: "15:48", name: "Watch tools diy steampunk", price: 15.00, quantity: 3, note: "https://img0.etsystatic.com/189/1/12773570/il_340x270.1256358656_o7ls.jpg"},
      ]
    }
  }

  onDiscard() {
    let order = {
      subtotal: 0.00,
      discount: 0.00,
      tax: 0.00,
      total: 0.00,
      lineItems: []
    }

    this.setState({
      order: order
    })
  }

  onConfirm() {
    let order = {
      subtotal: 0.00,
      discount: 0.00,
      tax: 0.00,
      total: 0.00,
      lineItems: []
    }

    this.setState({
      order: order
    })
  }

  onPrint() {
    alert('print')
  }

  onPress() {
    alert('press')
  }

  onSelectOrder(order) {
    this.setState({
      selectedOrder: order
    })    
  }

  onAddItem(id) {
    let order = {...this.state.order};
    let item = _.find(order.lineItems, item => {
      return item._id === id;
    });

    if (item) {
      item.quantity++;
    } else {
      item = _.find(this.state.menu, item => {
        return item._id === id;
      });
      item = {...item, quantity: 1};
      order.lineItems.push(item);
    }

    order.subtotal = 0;
    order.lineItems.forEach(item => {
      order.subtotal += _.round(item.price * item.quantity, 2);
    });
    order.discount = 3.00;
    order.tax = _.round(order.subtotal * 0.11, 2);
    order.total = _.round(order.subtotal + order.tax - order.discount, 2);

    this.setState({
      order: order
    })
  }

  onRemoveItem(id) {
    let order = {...this.state.order};
    let item = _.find(order.lineItems, item => {
      return item._id === id;
    });

    item.quantity--;
    if (item.quantity === 0) {
      order.lineItems = _.filter(order.lineItems, item => {
        return item._id != id;
      });
    }

    order.subtotal = 0;
    order.lineItems.forEach(item => {
      order.subtotal += _.round(item.price * item.quantity, 2);
    });
    order.discount = 3.00;
    order.tax = _.round(order.subtotal * 0.11, 2);
    order.total = _.round(order.subtotal + order.tax - order.discount, 2);

    this.setState({
      order: order
    });
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
              {this.state.items.map(item => (
                <ListItem key={item._id} style={{height: 80}}>
                  <Body>
                    <View style={{flexDirection: "row"}}>
                      <Text style={{width: 50}}>#{item.code}</Text>
                      <Text style={{width: 50, textAlign: 'right'}}>{item.quantity}</Text>
                      <Text style={{width: 200}}>{item.name}</Text>
                      <Text style={{flex: 1}}>{item.note}</Text>
                      <Text style={{width: 50}}>{item.time}</Text>
                      <View style={{width: 100, alignItems: 'center'}}>
                        <View style={{width: 80, alignItems: 'center'}}>
                          <Button full small style={{backgroundColor: '#6c757d'}} onPress={() => {this.onComplete(item)}}><Text> NOTE </Text></Button>                      
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
            <Button full style={{marginTop: 10, backgroundColor: '#6c757d'}} onPress={() => this.onCancel()}><Text> REFRESH </Text></Button>
          </View>
          <View style={{width: 50}}></View>
          <View style={{width: 180}}>
            <Button style={{marginTop: 10, backgroundColor: '#2177b4'}} full><Text> COMPLETE ALL </Text></Button>
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
