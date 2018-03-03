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

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOrder: null,
      orders: [
        {
          _id: 1,
          code: "0015",
          time: "08:45",
          subtotal: 12.00,
          discount: 2.50,
          tax: 1.50,
          total: 16.00,
          items: [
            {_id: 1, name: "Natural Turquoise Brooch", price: 15.05, quantity: 1, image: "https://img0.etsystatic.com/210/0/10748667/il_340x270.1353210938_iqg8.jpg"},
            {_id: 2, name: "Winter wedding mittens", price: 6.50, quantity: 2, image: "https://img0.etsystatic.com/191/1/7502837/il_340x270.1379665700_jnp8.jpg"},
            {_id: 3, name: "Watch tools diy steampunk", price: 15.00, quantity: 3, image: "https://img0.etsystatic.com/189/1/12773570/il_340x270.1256358656_o7ls.jpg"},
          ]
        },
        {
          _id: 2,
          code: "0031",
          time: "11:32",
          subtotal: 12.00,
          discount: 2.50,
          tax: 1.50,
          total: 16.00,
          items: [
            {_id: 1, name: "Natural Turquoise Brooch", price: 15.05, quantity: 1, image: "https://img0.etsystatic.com/210/0/10748667/il_340x270.1353210938_iqg8.jpg"},
          ]
        },
        {
          _id: 3,
          code: "0052",
          time: "15:48",          
          subtotal: 12.00,
          discount: 2.50,
          tax: 1.50,
          total: 16.00,
          items: [
            {_id: 1, name: "Natural Turquoise Brooch", price: 15.05, quantity: 1, image: "https://img0.etsystatic.com/210/0/10748667/il_340x270.1353210938_iqg8.jpg"},
            {_id: 3, name: "Watch tools diy steampunk", price: 15.00, quantity: 3, image: "https://img0.etsystatic.com/189/1/12773570/il_340x270.1256358656_o7ls.jpg"},
          ]
        },
      ],
      menu: [
        {_id: 1, name: "Natural Turquoise Brooch", price: 15.05, image: "https://img0.etsystatic.com/210/0/10748667/il_340x270.1353210938_iqg8.jpg"},
        {_id: 2, name: "Winter wedding mittens", price: 6.50, image: "https://img0.etsystatic.com/191/1/7502837/il_340x270.1379665700_jnp8.jpg"},
        {_id: 3, name: "Watch tools diy steampunk", price: 15.00, image: "https://img0.etsystatic.com/189/1/12773570/il_340x270.1256358656_o7ls.jpg"},
        {_id: 11, name: "Natural Turquoise Brooch", price: 15.05, image: "https://img0.etsystatic.com/210/0/10748667/il_340x270.1353210938_iqg8.jpg"},
        {_id: 12, name: "Winter wedding mittens", price: 6.50, image: "https://img0.etsystatic.com/191/1/7502837/il_340x270.1379665700_jnp8.jpg"},
        {_id: 13, name: "Watch tools diy steampunk", price: 15.00, image: "https://img0.etsystatic.com/189/1/12773570/il_340x270.1256358656_o7ls.jpg"},
        {_id: 21, name: "Natural Turquoise Brooch", price: 15.05, image: "https://img0.etsystatic.com/210/0/10748667/il_340x270.1353210938_iqg8.jpg"},
        {_id: 22, name: "Winter wedding mittens", price: 6.50, image: "https://img0.etsystatic.com/191/1/7502837/il_340x270.1379665700_jnp8.jpg"},
        {_id: 23, name: "Watch tools diy steampunk", price: 15.00, image: "https://img0.etsystatic.com/189/1/12773570/il_340x270.1256358656_o7ls.jpg"},
        {_id: 31, name: "Natural Turquoise Brooch", price: 15.05, image: "https://img0.etsystatic.com/210/0/10748667/il_340x270.1353210938_iqg8.jpg"},
        {_id: 32, name: "Winter wedding mittens", price: 6.50, image: "https://img0.etsystatic.com/191/1/7502837/il_340x270.1379665700_jnp8.jpg"},
        {_id: 33, name: "Watch tools diy steampunk", price: 15.00, image: "https://img0.etsystatic.com/189/1/12773570/il_340x270.1256358656_o7ls.jpg"},
        {_id: 41, name: "Natural Turquoise Brooch", price: 15.05, image: "https://img0.etsystatic.com/210/0/10748667/il_340x270.1353210938_iqg8.jpg"},
        {_id: 42, name: "Winter wedding mittens", price: 6.50, image: "https://img0.etsystatic.com/191/1/7502837/il_340x270.1379665700_jnp8.jpg"},
        {_id: 43, name: "Watch tools diy steampunk", price: 15.00, image: "https://img0.etsystatic.com/189/1/12773570/il_340x270.1256358656_o7ls.jpg"},
        {_id: 51, name: "Natural Turquoise Brooch", price: 15.05, image: "https://img0.etsystatic.com/210/0/10748667/il_340x270.1353210938_iqg8.jpg"},
        {_id: 52, name: "Winter wedding mittens", price: 6.50, image: "https://img0.etsystatic.com/191/1/7502837/il_340x270.1379665700_jnp8.jpg"},
        {_id: 53, name: "Watch tools diy steampunk", price: 15.00, image: "https://img0.etsystatic.com/189/1/12773570/il_340x270.1256358656_o7ls.jpg"},
        {_id: 61, name: "Natural Turquoise Brooch", price: 15.05, image: "https://img0.etsystatic.com/210/0/10748667/il_340x270.1353210938_iqg8.jpg"},
        {_id: 62, name: "Winter wedding mittens", price: 6.50, image: "https://img0.etsystatic.com/191/1/7502837/il_340x270.1379665700_jnp8.jpg"},
        {_id: 63, name: "Watch tools diy steampunk", price: 15.00, image: "https://img0.etsystatic.com/189/1/12773570/il_340x270.1256358656_o7ls.jpg"},
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
    this.props.print();
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

        <View style={{
          flex: 8, 
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <View style={{width: 650, marginBottom: 10}}>
            <ScrollView style={{flex: 1, flexDirection: 'column', marginLeft: 35, marginRight: 10}}>
              <List>
                {this.state.orders.map(item => (
                  <ListItem key={item._id} onPress={() => this.onSelectOrder(item)}>
                    <Left>
                      <Text>#{item.code}</Text>
                    </Left>
                    <Body>
                      <Text>${item.total}</Text>
                    </Body>
                    <Right>
                      <Text>{item.time}</Text>
                    </Right>
                  </ListItem>
                ))}
              </List>
            </ScrollView>
          </View>
          {(() => {
            if (!this.state.selectedOrder) {
              return (
                <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#f2f3f4', marginTop: 10, marginBottom: 10}}>
                  <View style={{height: 30, marginTop: 20, marginLeft: 10, marginRight: 10}}>
                    <Text style={{textAlign: 'center', color: 'rgb(70, 70, 70)'}}>Select order to view detail</Text>
                  </View>
                </View>
              )
            } else {
              return (
                <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#f2f3f4', marginTop: 10, marginBottom: 10}}>
                  <View style={{height: 30, marginTop: 20, marginLeft: 10, marginRight: 10}}>
                    <Text style={{textAlign: 'center', fontSize: 20, color: 'rgb(70, 70, 70)'}}>ORDER  #{this.state.selectedOrder.code}</Text>
                  </View>

                  <ScrollView style={{flex: 1, flexDirection: 'column'}}>
                    <FlatList style={{marginLeft: 10, marginRight: 10}}
                      data={this.state.selectedOrder.items}
                      keyExtractor={(item) => item._id}
                      renderItem={({item, separators}) => (
                        <View style={{marginTop: 20}}>
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            <Text style={{flex: 1}}>{item.name}</Text>
                            <Text style={{width: 70, textAlign: 'right'}}>${item.price}</Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                            <View style={{flex: 1}}/>
                            <Text style={{width: 70, textAlign: 'right'}}>x{item.quantity}</Text>
                          </View>
                        </View>
                      )}
                    />
                  </ScrollView>

                  <View style={{height: 90, marginTop: 30, marginLeft: 10, marginRight: 10}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Text style={{flex: 1}}>SUBTOTAL</Text>
                      <Text style={{width: 100, textAlign: 'right'}}>${this.state.selectedOrder.subtotal}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Text style={{flex: 1}}>DISCOUNT</Text>
                      <Text style={{width: 100, textAlign: 'right'}}>${this.state.selectedOrder.discount}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Text style={{flex: 1}}>TAX</Text>
                      <Text style={{width: 100, textAlign: 'right'}}>${this.state.selectedOrder.tax}</Text>
                    </View>
                  </View>

                  <View style={{height: 40, marginTop: 10, marginLeft: 10, marginRight: 10}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Text style={{flex: 1, fontSize: 30, color: 'rgb(70, 70, 70)'}}>TOTAL</Text>
                      <Text style={{width: 150, textAlign: 'right', fontSize: 30, color: 'rgb(70, 70, 70)'}}>${this.state.selectedOrder.total}</Text>
                    </View>
                  </View>

                  <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 10, marginLeft: 10, marginRight: 10}}>
                    <View style={{width: 170}}>
                      <Button full onPress={() => this.onDiscard()} style={{backgroundColor: '#6c757d'}}><Text> DELETE </Text></Button>
                    </View>
                    <View style={{flex: 1}} />
                    <View style={{width: 170}}>
                      <Button full onPress={() => this.onPrint()} style={{backgroundColor: '#2177b4'}}><Text> PRINT </Text></Button>
                    </View>
                  </View>
                </View>
              )
            }
          })()}
        </View>

        <View style={{flex: 1}}>
        </View>
      </View>      
    );
  }
}

Dashboard.propTypes = {
};

export default Dashboard;
