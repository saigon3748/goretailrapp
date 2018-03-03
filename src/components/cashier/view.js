import _ from 'lodash';
import React from 'react';
import { ScrollView, View, TouchableOpacity, TouchableHighlight, StyleSheet, Image, ImageBackground, TextInput, FlatList } from 'react-native';
import { Container, Content, Card, CardItem, Form, Item, Header, Left, Body, Right, Button, Icon, Title, List, ListItem, Text, Thumbnail, Input, InputGroup, Label, Toast } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MenuApi } from '../../api';

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
      step: "",
      menu: [],
      categories: [],
      selectedCategories: [],
      subs: [],
      order: {
        subtotal: 0.00,
        discount: 0.00,
        tax: 0.00,
        total: 0.00,
        items: []
      }
    }
  }

  componentDidMount() {
    MenuApi.getMenuList()
      .then(result => {
        this.setState({
          menu: result
        });
      })

    MenuApi.getCategoryList()
      .then(result => {
        this.setState({
          categories: result,
          subs: this.getSubs(result)
        });
      })
  }

  componentWillUnmount() {
  }

  getSubs(categories, selectedCategory) {
    categories = categories || this.state.categories;
    return _.filter(categories, category => {
      return (!selectedCategory && !category.parent)
        || (selectedCategory && category.parent === selectedCategory._id);
    })
  }

  onSelectCategory(category) {
    let selectedCategories = [...this.state.selectedCategories];
    selectedCategories.push(category);
    
    this.setState({
      selectedCategories: selectedCategories,
      subs: this.getSubs(category)
    });
  }

  onBackCategory() {

  }

  onDiscard() {
    let order = {
      subtotal: 0.00,
      discount: 0.00,
      tax: 0.00,
      total: 0.00,
      items: []
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
      items: []
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

  onNext() {
    this.setState({
      step: "CONFIRM"
    })
  }

  onBack() {
    this.setState({
      step: ""
    })
  }

  onAddItem(id) {
    let order = {...this.state.order};
    let item = _.find(order.items, item => {
      return item._id === id;
    });

    if (item) {
      item.quantity++;
    } else {
      item = _.find(this.state.menu, item => {
        return item._id === id;
      });
      item = {...item, quantity: 1};
      order.items.push(item);
    }

    order.subtotal = 0;
    order.items.forEach(item => {
      order.subtotal += _.round(item.unitPrice * item.quantity, 2);
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
    let item = _.find(order.items, item => {
      return item._id === id;
    });

    item.quantity--;
    if (item.quantity === 0) {
      order.items = _.filter(order.items, item => {
        return item._id != id;
      });
    }

    order.subtotal = 0;
    order.items.forEach(item => {
      order.subtotal += _.round(item.unitPrice * item.quantity, 2);
    });
    order.discount = 3.00;
    order.tax = _.round(order.subtotal * 0.11, 2);
    order.total = _.round(order.subtotal + order.tax - order.discount, 2);

    this.setState({
      order: order
    });
  }

  onDiscountChanged(text){
    try {
      let discount = parseInt(text);

      let order = {...this.state.order};
      order.discount = discount;

      this.setState({
        order: order
      });

    }
    catch(err) {}
  }

  onNoteChanged(text){
    let order = {...this.state.order};
    order.note = text;

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
        <View style={{
          flex: 8, 
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
          <View style={{width: 650, marginBottom: 10}}>
            <ScrollView vertical={true}>
              <View style={{
                flex: 1,
                flexDirection: 'row', 
                flexWrap: 'wrap'
              }}>
                {this.state.menu.map(menuItem => {
                  if (menuItem.image) {
                    return (
                      <TouchableOpacity key={menuItem._id} activeOpacity={1.0} onPress={() => this.onAddItem(menuItem._id)}>
                        <View style={{width: 150, height: 150, marginTop: 10, marginLeft: 10}}>
                          <ImageBackground
                            style={{width: 150, height: 150}}
                            source={{uri: menuItem.image}}>
                            <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                              {menuItem.name}
                            </Text>
                            <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                              ${menuItem.unitPrice}
                            </Text>
                          </ImageBackground>
                        </View>
                      </TouchableOpacity>
                    )
                  } else {
                    return (
                      <TouchableOpacity key={menuItem._id} activeOpacity={1.0} onPress={() => this.onAddItem(menuItem._id)}>
                        <View style={{width: 150, height: 150, marginTop: 10, marginLeft: 10, backgroundColor: '#f2f3f4'}}>
                          <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                            {menuItem.name}
                          </Text>
                          <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                            ${menuItem.unitPrice}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )
                  }
                })}
              </View>
            </ScrollView>
          </View>
          {(() => {
            if (this.state.step === "CONFIRM") {
              return (
                <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#f2f3f4', marginTop: 10, marginBottom: 10}}>
                  <View style={{height: 30, marginTop: 20, marginLeft: 10, marginRight: 10}}>
                    <Text style={{textAlign: 'center', fontSize: 20, color: 'rgb(70, 70, 70)'}}>CHECKOUT</Text>
                  </View>

                  <View style={{marginTop: 30, marginLeft: 10, marginRight: 10}}>
                    <Text>Discount</Text>
                    <TextInput value={this.state.order.discount.toString()} onChangeText={(text) => this.onDiscountChanged(text)} style={{marginTop: 10, fontSize: 20, height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                    <Text style={{marginTop: 20}}>Note</Text>
                    <TextInput value={this.state.order.note} onChangeText={(text) => this.onNoteChanged(text)} multiline = {true} style={{marginTop: 10, fontSize: 20, height: 105, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                  </View>
                  
                  <View style={{flex: 1}}/>

                  <View style={{height: 90, marginTop: 30, marginLeft: 10, marginRight: 10}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Text style={{flex: 1}}>SUBTOTAL</Text>
                      <Text style={{width: 100, textAlign: 'right'}}>${this.state.order.subtotal}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Text style={{flex: 1}}>DISCOUNT</Text>
                      <Text style={{width: 100, textAlign: 'right'}}>${this.state.order.discount}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Text style={{flex: 1}}>TAX</Text>
                      <Text style={{width: 100, textAlign: 'right'}}>${this.state.order.tax}</Text>
                    </View>
                  </View>

                  <View style={{height: 40, marginTop: 10, marginLeft: 10, marginRight: 10}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Text style={{flex: 1, fontSize: 30, color: 'rgb(70, 70, 70)'}}>TOTAL</Text>
                      <Text style={{width: 150, textAlign: 'right', fontSize: 30, color: 'rgb(70, 70, 70)'}}>${this.state.order.total}</Text>
                    </View>
                  </View>

                  <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 10, marginLeft: 10, marginRight: 10}}>
                    <View style={{width: 170}}>
                      <Button full onPress={() => this.onBack()} style={{backgroundColor: '#6c757d'}}><Text> BACK </Text></Button>
                    </View>
                    <View style={{flex: 1}} />
                    <View style={{width: 170}}>
                      <Button full onPress={() => this.onConfirm()} style={{backgroundColor: '#2177b4'}}><Text> CONFIRM </Text></Button>
                    </View>
                  </View>
                </View>
              )
            } else {
              return (
                <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#f2f3f4', marginTop: 10, marginBottom: 10}}>
                  <View style={{height: 30, marginTop: 20, marginLeft: 10, marginRight: 10}}>
                    <Text style={{textAlign: 'center', fontSize: 20, color: 'rgb(70, 70, 70)'}}>CHECKOUT</Text>
                  </View>

                  <ScrollView style={{flex: 1, flexDirection: 'column'}}>
                    <FlatList style={{marginLeft: 10, marginRight: 10}}
                      data={this.state.order.items}
                      keyExtractor={(item) => item._id}
                      renderItem={({item, separators}) => (
                        <View style={{marginTop: 20}}>
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            <Text style={{flex: 1}}>{item.name}</Text>
                            <Text style={{width: 70, textAlign: 'right'}}>${item.unitPrice}</Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                            <Button full small style={{backgroundColor: '#2177b4'}} onPress={() => {this.onAddItem(item._id)}}><Text> + </Text></Button>
                            <Button full small style={{backgroundColor: '#6c757d'}} onPress={() => {this.onRemoveItem(item._id)}}><Text> - </Text></Button>
                            <Button full small style={{backgroundColor: '#7BBFB7'}}><Text> E </Text></Button>
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
                      <Text style={{width: 100, textAlign: 'right'}}>${this.state.order.subtotal}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Text style={{flex: 1}}>DISCOUNT</Text>
                      <Text style={{width: 100, textAlign: 'right'}}>${this.state.order.discount}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Text style={{flex: 1}}>TAX</Text>
                      <Text style={{width: 100, textAlign: 'right'}}>${this.state.order.tax}</Text>
                    </View>
                  </View>

                  <View style={{height: 40, marginTop: 10, marginLeft: 10, marginRight: 10}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <Text style={{flex: 1, fontSize: 30, color: 'rgb(70, 70, 70)'}}>TOTAL</Text>
                      <Text style={{width: 150, textAlign: 'right', fontSize: 30, color: 'rgb(70, 70, 70)'}}>${this.state.order.total}</Text>
                    </View>
                  </View>

                  <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 10, marginLeft: 10, marginRight: 10}}>
                    <View style={{width: 170}}>
                      <Button full onPress={() => this.onDiscard()} style={{backgroundColor: '#6c757d'}}><Text> DISCARD </Text></Button>
                    </View>
                    <View style={{flex: 1}} />
                    <View style={{width: 170}}>
                      <Button full onPress={() => this.onNext()} style={{backgroundColor: '#2177b4'}}><Text> NEXT </Text></Button>
                    </View>
                  </View>
                </View>
              )
            } 
          })()}
        </View>

        <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#f2f3f4'}}>
          <View style={{width: 150, height: 60, marginTop: 10, marginLeft: 10}}>
            <Button full large onPress={() => this.onBackCategory()} style={{backgroundColor: '#2177b4'}}><Text> BACK </Text></Button>
          </View>
          <View style={{flex: 1}}>
            <ScrollView horizontal={true} style={{flex: 1, flexDirection: 'row'}}>
              {this.state.subs.map(category => (
                <View key={category._id} style={{width: 150, height: 60, marginTop: 10, marginLeft: 10}}>
                  <Button full large success onPress={() => this.onSelectCategory(category)} style={{backgroundColor: '#7BBFB7'}}><Text> {category.name} </Text></Button>
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
