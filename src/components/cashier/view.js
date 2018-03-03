import _ from 'lodash';
import React from 'react';
import { ScrollView, View, TouchableOpacity, TouchableHighlight, StyleSheet, Image, ImageBackground, TextInput, FlatList } from 'react-native';
import { Container, Content, Card, CardItem, Form, Item, Header, Left, Body, Right, Button, Icon, Title, List, ListItem, Text, Thumbnail, Input, InputGroup, Label, Toast } from 'native-base';
import { TextInputMask } from 'react-native-masked-text'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MenuApi } from '../../api';
import { Helper } from '../../utils';

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
    this.menu = [];
    this.categories = [];
    this.categoryStack = [];

    this.state = {
      isEdittingNote: false,
      filteredMenu: [],
      filteredCategories: [],
      order: {
        subtotal: 0.00,
        discount: 0.00,
        tax: 0.00,
        total: 0.00,
        cash: 0.00,
        change: 0.00,
        items: []
      }
    }
  }

  componentDidMount() {
    MenuApi.getMenuList()
      .then(result => {
        this.menu = result;
        this.setState({
          filteredMenu: this.filterMenu()
        });
      })

    MenuApi.getCategoryList()
      .then(result => {
        this.categories = result;
        this.setState({
          filteredCategories: this.filterCategories()
        });
      })
  }

  componentWillUnmount() {
  }

  filterMenu() {
    let menu = this.menu || [];

    if (this.categoryStack.length === 0) {
      return menu;
    }

    let category = this.categoryStack[this.categoryStack.length - 1];

    return _.filter(menu, item => {
      return item.category._id === category._id
        || category.path.includes(item.category._id)
    })    
  }

  filterCategories() {
    let categories = this.categories || [];

    if (this.categoryStack.length === 0) {
      return _.filter(categories, item => {
        return !item.parent;
      })
    }

    let category = this.categoryStack[this.categoryStack.length - 1];
    
    return _.filter(categories, item => {
      return item.parent === category._id;
    })
  }

  onSelectCategory(category) {
    this.categoryStack = this.categoryStack || [];
    if (category.subs.length > 0) {
      this.categoryStack.push(category);
    }
    
    this.setState({
      filteredMenu: this.filterMenu(),
      filteredCategories: this.filterCategories()
    });
  }

  onBackCategory() {
    this.categoryStack = this.categoryStack || [];
    if (this.categoryStack.length > 0) {
      this.categoryStack = this.categoryStack.slice(0, this.categoryStack.length - 1)
    }
    
    this.setState({
      filteredMenu: this.filterMenu(),
      filteredCategories: this.filterCategories()
    });
  }

  onDiscard() {
    this.setState({
      isEdittingNote: false,
      order: {
        subtotal: 0.00,
        discount: 0.00,
        tax: 0.00,
        total: 0.00,
        cash: 0.00,
        change: 0.00,
        items: []        
      }
    })
  }

  onConfirm() {
    this.onDiscard()
  }

  onPrint() {
    alert('print')
  }

  onPress() {
    alert('press')
  }

  onEditNote() {
    this.setState({
      isEdittingNote: !this.state.isEdittingNote
    })
  }

  onEditItemNote(id) {
    let order = {...this.state.order};

    order.items.forEach(item => {
      if (item._id === id) {
        item.isEdittingNote = !item.isEdittingNote;
      } else {
        item.isEdittingNote = false;
      }
    });

    this.setState({
      order: order
    })
  }

  onItemNoteChanged(id, text) {
    let order = {...this.state.order};
    let item = _.find(order.items, item => {
      return item._id === id;
    });

    if (item) {
      item.note = text;
    }

    this.setState({
      order: order
    });    
  }

  onAddItem(id) {
    let order = {...this.state.order};
    let item = _.find(order.items, item => {
      return item._id === id;
    });

    if (item) {
      item.quantity++;
    } else {
      item = _.find(this.menu, item => {
        return item._id === id;
      });
      item = {...item, quantity: 1};
      order.items.push(item);
    }

    order.subtotal = 0.00;
    order.discount = 0.00;
    order.items.forEach(item => {
      let subtotal = _.round(item.unitPrice * item.quantity, 2);
      let discount = 0.00;

      if (item.discount) {
        if (item.isPercentDiscount) {
          discount = _.round(subtotal * item.discount / 100, 2);
        } else {
          discount = _.round(subtotal - item.discount, 2);
        }
      }

      order.subtotal += subtotal;
      order.discount += discount;
    });
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

    order.subtotal = 0.00;
    order.discount = 0.00;
    order.items.forEach(item => {
      let subtotal = _.round(item.unitPrice * item.quantity, 2);
      let discount = 0.00;

      if (item.discount) {
        if (item.isPercentDiscount) {
          discount = _.round(subtotal * item.discount / 100, 2);
        } else {
          discount = _.round(subtotal - item.discount, 2);
        }
      }

      order.subtotal += subtotal;
      order.discount += discount;
    });
    order.tax = _.round(order.subtotal - order.discount * 0.11, 2);
    order.total = _.round(order.subtotal - order.discount + order.tax, 2);

    this.setState({
      order: order
    });
  }

  onDiscountChanged(text){
    try {
      let discount = Number(text.replace(/[^0-9\.-]+/g,""));

      let order = {...this.state.order};
      order.discount = _.round(discount, 2);
      order.tax = _.round(order.subtotal - order.discount * 0.11, 2);
      order.total = _.round(order.subtotal - order.discount + order.tax, 2);

      this.setState({
        order: order
      });

    }
    catch(err) {}
  }

  onCashChanged(text){
    try {
      let cash = Number(text.replace(/[^0-9\.-]+/g,""));

      let order = {...this.state.order};
      order.cash = _.round(cash, 2);
      order.change = _.round(order.cash - order.total, 2);

      this.setState({
        order: order
      });

    }
    catch(err) {}
  }

  onNoteChanged(text){
    let order = {...this.state.order};
    order.isEdittingNote = text;

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
                {this.state.filteredMenu.map(menuItem => {
                  return (
                    <TouchableOpacity key={menuItem._id} activeOpacity={1.0} onPress={() => this.onAddItem(menuItem._id)}>
                      <View style={{width: 150, height: 150, marginTop: 10, marginLeft: 10, backgroundColor: '#2FA495'}}>
                        {(() => { 
                          if (menuItem.image) {
                            return (
                              <ImageBackground
                                style={{width: 150, height: 150}}
                                source={{uri: menuItem.image}}>
                                <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                                  {menuItem.name}
                                </Text>
                                <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                                  {(() => { return Helper.formatCurrency(menuItem.unitPrice) })()}
                                </Text>
                              </ImageBackground>
                            )
                          } else {
                            return (
                              <View style={{backgroundColor: 'rgba(221, 226, 229, 0.7)'}}>
                                <Text style={{marginTop: 3, marginLeft: 3, marginRight: 3}}>
                                  {menuItem.name}
                                </Text>
                                <Text style={{marginTop: 3, marginLeft: 3, marginRight: 3, marginBottom: 3}}>
                                  {(() => { return Helper.formatCurrency(menuItem.unitPrice) })()}
                                </Text>
                              </View>
                            )                            
                          }
                        })()}
                      </View>
                    </TouchableOpacity>
                  )
                })}
              </View>
            </ScrollView>
          </View>
          <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#f2f3f4', marginTop: 10, marginBottom: 10}}>
            <View style={{flexDirection: 'row', marginTop: 10, marginLeft: 10, marginRight: 10}}>
              <Text style={{textAlign: 'center', fontSize: 25, color: 'rgb(70, 70, 70)'}}>CHECKOUT</Text>
              <View style={{flex: 1}}/>
              <View style={{width: 50}}>
                <Button full small onPress={() => this.onEditNote()} style={{backgroundColor: '#2FA495' }}>
                  {(() => {
                    if (this.state.isEdittingNote) {
                      return (
                        <MaterialIcons name='chevron-left' color={'#fff'} size={20} />
                      )
                    } else {
                      return (
                        <MaterialIcons name='chevron-right' color={'#fff'} size={20} />
                      )
                    } 
                  })()}
                </Button>
              </View>
            </View>
            {(() => {
              if (this.state.isEdittingNote) {
                return (
                  <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#f2f3f4', marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10}}>
                    <Text style={{marginTop: 20}}>NOTE</Text>
                    <TextInput value={this.state.order.isEdittingNote} onChangeText={(text) => this.onNoteChanged(text)} multiline = {true} style={{marginTop: 10, fontSize: 20, height: 85, backgroundColor: '#fff', borderColor: '#d2d3d4', borderWidth: 1}}/>          
                    <Text style={{marginTop: 10}}>DISCOUNT</Text>
                    <TextInputMask type={'money'} options={{unit: '$', separator: '.', delimiter: ','}} selectTextOnFocus value={(() => { return Helper.formatCurrency(this.state.order.discount) })()} onChangeText={(text) => this.onDiscountChanged(text)} style={{marginTop: 10, fontSize: 20, height: 35, backgroundColor: '#fff', borderColor: '#d2d3d4', borderWidth: 1, textAlign: 'right'}}/>          
                    <Text style={{marginTop: 10}}>CASH</Text>
                    <TextInputMask type={'money'} options={{unit: '$', separator: '.', delimiter: ','}} selectTextOnFocus value={(() => { return Helper.formatCurrency(this.state.order.cash) })()} onChangeText={(text) => this.onCashChanged(text)} style={{marginTop: 10, fontSize: 20, height: 35, backgroundColor: '#fff', borderColor: '#d2d3d4', borderWidth: 1, textAlign: 'right'}}/>          
                    <View style={{flexDirection: 'row', marginTop: 20}}>
                      <Text style={{flex: 1}}>CHANGE</Text>
                      <Text style={{width: 200, textAlign: 'right', color: 'red'}}>
                        {(() => { return Helper.formatCurrency(this.state.order.change) })()}
                      </Text>
                    </View>
                    <View style={{flex: 1}}/>
                  </View>
                )
              } else {
                return (
                  <ScrollView style={{flex: 1, flexDirection: 'column'}}>
                    <FlatList style={{marginLeft: 10, marginRight: 10}}
                      data={this.state.order.items}
                      keyExtractor={(item) => item._id}
                      renderItem={({item, separators}) => (
                        <View style={{marginTop: 20}}>
                          <View style={{flex: 1, flexDirection: 'row'}}>
                            <Text style={{flex: 1}}>{item.name}</Text>
                            <Text style={{width: 70, textAlign: 'right'}}>
                              {(() => { return Helper.formatCurrency(item.unitPrice) })()}
                            </Text>
                          </View>
                          <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                            <View style={{width: 50}}>
                              <Button full small style={{backgroundColor: '#2177b4'}} onPress={() => {this.onAddItem(item._id)}}>
                                <MaterialIcons name='add' color={'#fff'} size={20} />
                              </Button>
                            </View>
                            <View style={{width: 50}}>
                              <Button full small style={{backgroundColor: '#6c757d'}} onPress={() => {this.onRemoveItem(item._id)}}>
                                <MaterialIcons name='remove' color={'#fff'} size={20} />
                              </Button>
                            </View>
                            <View style={{width: 50}}>
                              <Button full small style={{backgroundColor: '#2FA495'}} onPress={() => {this.onEditItemNote(item._id)}}>
                                <Text>E</Text>
                              </Button>
                            </View>
                            <View style={{flex: 1}}/>
                            <Text style={{width: 70, textAlign: 'right', color: 'red'}}>x{item.quantity}</Text>
                          </View>
                          {(() => {
                            if (item.isEdittingNote) {
                              return (
                                <TextInput defaultValue={item.note} onChangeText={(text) => this.onItemNoteChanged(item._id, text)} multiline = {true} style={{marginTop: 10, fontSize: 20, height: 85, backgroundColor: '#fff', borderColor: '#d2d3d4', borderWidth: 1}}/>          
                              )
                            } else {
                              return (
                                <View />
                              )
                            } 
                          })()}
                        </View>
                      )}
                    />
                  </ScrollView>
                )
              } 
            })()}

            <View style={{height: 90, marginTop: 30, marginLeft: 10, marginRight: 10}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={{flex: 1}}>SUBTOTAL</Text>
                <Text style={{width: 200, textAlign: 'right'}}>
                  {(() => { return Helper.formatCurrency(this.state.order.subtotal) })()}
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={{flex: 1}}>DISCOUNT</Text>
                <Text style={{width: 200, textAlign: 'right'}}>
                  {(() => { return Helper.formatCurrency(this.state.order.discount) })()}
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={{flex: 1}}>TAX</Text>
                <Text style={{width: 200, textAlign: 'right'}}>
                  {(() => { return Helper.formatCurrency(this.state.order.tax) })()}
                </Text>
              </View>
            </View>

            <View style={{height: 40, marginTop: 10, marginLeft: 10, marginRight: 10}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={{flex: 1, fontSize: 30, color: 'rgb(70, 70, 70)'}}>TOTAL</Text>
                <Text style={{width: 200, textAlign: 'right', fontSize: 30, color: 'rgb(70, 70, 70)'}}>
                  {(() => { return Helper.formatCurrency(this.state.order.total) })()}
                </Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', marginTop: 20, marginBottom: 10, marginLeft: 10, marginRight: 10}}>
              <View style={{width: 170}}>
                <Button full onPress={() => this.onDiscard()} style={{backgroundColor: '#6c757d'}}><Text> DISCARD </Text></Button>
              </View>
              <View style={{flex: 1}} />
              <View style={{width: 170}}>
                <Button full onPress={() => this.onConfirm()} style={{backgroundColor: '#2177b4'}}><Text> CONFIRM </Text></Button>
              </View>
            </View>
          </View>
        </View>

        <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#f2f3f4'}}>
          <View style={{width: 150, height: 60, marginTop: 10, marginLeft: 10}}>
            <Button full large onPress={() => this.onBackCategory()} style={{backgroundColor: '#2177b4'}}>
              <MaterialIcons name='subdirectory-arrow-left' color={'#fff'} size={20} />              
            </Button>
          </View>
          <View style={{flex: 1}}>
            <ScrollView horizontal={true} style={{flex: 1, flexDirection: 'row'}}>
              {this.state.filteredCategories.map(category => (
                <View key={category._id} style={{width: 150, height: 60, marginTop: 10, marginLeft: 10}}>
                  <Button full large success onPress={() => this.onSelectCategory(category)} style={{backgroundColor: '#2FA495'}}><Text> {category.name} </Text></Button>
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
