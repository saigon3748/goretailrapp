import _ from 'lodash';
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

class Cashier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [
        {_id: 1, name: "Natural Turquoise Brooch", price: 15.05, image: "https://img0.etsystatic.com/210/0/10748667/il_340x270.1353210938_iqg8.jpg"},
        {_id: 2, name: "Winter wedding mittens", price: 6.50, image: "https://img0.etsystatic.com/191/1/7502837/il_340x270.1379665700_jnp8.jpg"},
        {_id: 3, name: "Watch tools diy steampunk", price: 15.00, image: "https://img0.etsystatic.com/189/1/12773570/il_340x270.1256358656_o7ls.jpg"},
      ],
      tags: [
        {name: "noodle", children: [
          {name: "pork", children: []},
          {name: "beef", children: []},
        ]},
        {name: "drink", children: [
          {name: "pepsi", children: []},
          {name: "coca", children: []},
          {name: "fruit", children: []},
        ]}
      ],
      order: {
        subtotal: 0.00,
        discount: 0.00,
        tax: 0.00,
        total: 0.00,
        lineItems: []
      }
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
        justifyContent: 'space-between'
      }}>
        <View style={{
          flex: 8, 
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <View style={{width: 730, backgroundColor: 'white'}}>
            <ScrollView vertical={true}>
              <View style={{
                flex: 1,
                flexDirection: 'row', 
                flexWrap: 'wrap'
              }}>
                {this.state.menu.map(menuItem => (
                  <TouchableOpacity key={menuItem._id} activeOpacity={1.0} onPress={() => this.onAddItem(menuItem._id)}>
                    <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                      <ImageBackground
                        style={{width: 170, height: 170}}
                        source={{uri: menuItem.image}}>
                        <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                          {menuItem.name}
                        </Text>
                        <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                          $ {menuItem.price}
                        </Text>
                      </ImageBackground>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
          <View style={{flex: 2, flexDirection: 'column', backgroundColor: '#F5F8F9'}}>
            <View style={{width: 270, height: 30, marginTop: 20, marginLeft: 10, marginRight: 10}}>
              <Text style={{textAlign: 'center', fontSize: 20, color: 'rgb(70, 70, 70)'}}>CHECKOUT</Text>
            </View>

            <ScrollView style={{flex: 1, flexDirection: 'column'}}>
              <FlatList style={{marginLeft: 10, marginRight: 10}}
                data={this.state.order.lineItems}
                keyExtractor={(item) => item._id}
                renderItem={({item, separators}) => (
                  <View>
                    <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                      <Text style={{flex: 1}}>{item.name}</Text>
                      <Text style={{width: 70, textAlign: 'right'}}>${item.price}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                      <Button full small style={{backgroundColor: '#2177b4'}} onPress={() => {this.onAddItem(item._id)}}><Text> + </Text></Button>
                      <Button full small style={{backgroundColor: '#6c757d'}} onPress={() => {this.onRemoveItem(item._id)}}><Text> - </Text></Button>
                      <Button full small style={{backgroundColor: '#93c4b9'}}><Text> E </Text></Button>
                      <View style={{flex: 1}}/>
                      <Text style={{width: 70, textAlign: 'right'}}>x{item.quantity}</Text>
                    </View>
                  </View>
                )}
              />
            </ScrollView>

            <View style={{width: 270, height: 90, marginTop: 30, marginLeft: 10, marginRight: 10}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={{flex: 1}}>Subtotal</Text>
                <Text style={{width: 100, textAlign: 'right'}}>${this.state.order.subtotal}</Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={{flex: 1}}>Discount</Text>
                <Text style={{width: 100, textAlign: 'right'}}>${this.state.order.discount}</Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={{flex: 1}}>Tax</Text>
                <Text style={{width: 100, textAlign: 'right'}}>${this.state.order.tax}</Text>
              </View>
            </View>

            <View style={{width: 270, height: 40, marginTop: 10, marginLeft: 10, marginRight: 10}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={{flex: 1, fontSize: 30, color: 'rgb(70, 70, 70)'}}>Total</Text>
                <Text style={{width: 150, textAlign: 'right', fontSize: 30, color: 'rgb(70, 70, 70)'}}>${this.state.order.total}</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', width: 270, marginTop: 20, marginBottom: 20, marginLeft: 10, marginRight: 10}}>
              <View style={{width: 125}}>
                <Button full onPress={() => this.onDiscard()} style={{backgroundColor: '#6c757d'}}><Text> DISCARD </Text></Button>
              </View>
              <View style={{flex: 1}} />
              <View style={{width: 125}}>
                <Button full onPress={() => this.onConfirm()} style={{backgroundColor: '#2177b4'}}><Text> CONFIRM </Text></Button>
              </View>
            </View>
          </View>
        </View>

        <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#f2f3f4'}}>
          <View style={{width: 100, height: 60, marginTop: 10, marginLeft: 10}}>
            <Button full large onPress={this.onPress} style={{backgroundColor: '#2177b4'}}><Text> BACK </Text></Button>
          </View>
          <View style={{flex: 1}}>
            <ScrollView horizontal={true} style={{flex: 1, flexDirection: 'row'}}>
              {this.state.tags.map(tag => (
                <View key={tag.name} style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <Button full large success onPress={this.onPress} style={{backgroundColor: '#93c4b9'}}><Text> {tag.name} </Text></Button>
                </View>
              ))}
            </ScrollView>
          </View>   
        </View>
      </View>      
    );
  }
}

Cashier.propTypes = {
};

export default Cashier;
