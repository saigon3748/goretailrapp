import _ from 'lodash';
import React from 'react';
import { Dimensions, NativeModules, AsyncStorage, Alert, ScrollView, View, TouchableOpacity, TouchableHighlight, StyleSheet, Image, ImageBackground, TextInput, FlatList, ListView } from 'react-native';
import { Container, Content, Card, CardItem, Form, Item, Header, Left, Body, Right, Button, Icon, Title, List, ListItem, Text, Thumbnail, Input, InputGroup, Label, Toast } from 'native-base';
import { TextInputMask } from 'react-native-masked-text'
import Modal from "react-native-modal";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MenuApi, OrderApi, TenantApi } from '../../api';
import { Helper } from '../../utils';

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.menu = [];
    this.categories = [];
    this.categoryStack = [];
    this.selectedCategory = null;

    this.state = {
      isSignedIn: false,
      isConfirmModalVisible: false,
      isExtraModalVisible: false,
      isEdittingNote: false,
      selectedAddonItem: { extra: [] },
      cashList: [],
      addonList: [],
      filteredMenu: [],
      filteredCategories: [],
      order: {
        subtotal: 0.00,
        discount: 0.00,
        discountAmt: 0.00,
        tax: 0.00,
        total: 0.00,
        cash: 0.00,
        change: 0.00,
        items: []
      }
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('payload', (err, payload) => {
      if (!payload) return;
      this.payload = JSON.parse(payload);

      this.setState({
        isSignedIn: true
      });

      TenantApi.getById(this.payload.tenant._id)
        .then(result => {
          this.tenant = result;
        })
    });
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

    MenuApi.getCashList()
      .then(result => {
        this.setState({
          cashList: result
        });
      })

    MenuApi.getAddonList()
      .then(result => {
        this.setState({
          addonList: result
        });
      })
  }

  filterMenu() {
    let menu = this.menu || [];

    if (this.selectedCategory) {
      return _.filter(menu, item => {
        return this.includesMenuItem(this.selectedCategory, item);
      })
    } 

    if (this.categoryStack.length === 0) {
      return menu;
    }

    let category = this.categoryStack[this.categoryStack.length - 1];

    return _.filter(menu, item => {
      return this.includesMenuItem(category, item);
    })
  }

  includesMenuItem(category, item) {
    if (item.category._id === category._id) {
      return true;
    }

    let result = false;
    if (category.subs && category.subs.length > 0) {
      category.subs.forEach(sub => {
        if (!result) {
          result = this.includesMenuItem(sub, item)
        }
      })
    }

    return result;
  }

  filterCategories() {
    let categories = this.categories || [];

    if (this.categoryStack.length === 0) {
      return _.sortBy(_.filter(categories, item => {
        return !item.parent;
      }), ['displayIndex'])
    }

    let category = this.categoryStack[this.categoryStack.length - 1];
    if (category.subs && category.subs.length > 0) {
      return _.sortBy(_.filter(categories, item => {
        return item.parent === category._id;
      }), ['displayIndex'])
    }

    return _.sortBy(this.state.filteredCategories, ['displayIndex']);
  }

  onSelectCategory(category) {
    this.categoryStack = this.categoryStack || [];
    if (category.subs && category.subs.length > 0) {
      this.categoryStack.push(category);
    } else {
      if (this.selectedCategory && this.selectedCategory._id === category._id) {
        this.selectedCategory = null;
      } else {
        this.selectedCategory = category;
      }
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
    
    this.selectedCategory = null;
    this.setState({
      filteredMenu: this.filterMenu(),
      filteredCategories: this.filterCategories()
    });
  }

  reset() {
    this.categoryStack = [];
    this.selectedCategory = null;

    this.setState({
      isEdittingNote: false,
      selectedAddonItem: { extra: [] },
      filteredMenu: this.filterMenu(),
      filteredCategories: this.filterCategories(),      
      order: {
        subtotal: 0.00,
        discount: 0.00,
        discountAmt: 0.00,
        tax: 0.00,
        total: 0.00,
        cash: 0.00,
        change: 0.00,
        items: []
      }
    })

    this.showConfirmModal(false);
  }

  onDiscard() {
    Alert.alert(
      `Alert`, 
      'Do you want to discard?',
      [ { text: 'Cancel' }, 
        { text: 'OK', onPress: () => {
          this.reset();
        }} ]
    );    
  }

  onOrder() {
    if (!this.state.order || !this.state.order.items || this.state.order.items.length === 0) {
      alert("Select items to create order");
      return;
    }

    this.showConfirmModal(true);
  }

  onSave() {
    if (!this.state.order || !this.state.order.items || this.state.order.items.length === 0) {
      alert("Select items to create order");
      return;
    }

    OrderApi.create(this.state.order)
      .then(result => {
        if (!this.tenant.settings) {
          this.reset();
          return;
        }

        if (this.tenant.settings.confirmAndPrint) {
          this.print(result);
          this.reset();
          return;
        }

        Alert.alert(
          `#${result.ref}`, 
          'Do you want to print?',
          [ { text: 'Cancel', onPress: () => this.reset() }, 
            { text: 'OK', onPress: () => {
              this.print(result);
              this.reset();
            }} ]
        );
      })
      .catch(err => {
        alert(err)
      })    
  }

  print(order) {
    if (!this.tenant || !this.tenant.settings) {
      alert('No setting found')
      return;
    }

    if (!this.tenant.settings.receiptTemplate 
      || !this.tenant.settings.receiptPrinter 
      || this.tenant.settings.receiptPrinter.trim() === "") {
      alert('No setting found for receipt printer')
      return;
    }

    let setting = {
      name: this.tenant.settings.receiptTemplate.receiptName,
      receiptPrinter: this.tenant.settings.receiptPrinter,
      header1: this.tenant.settings.receiptTemplate.header1,
      header2: this.tenant.settings.receiptTemplate.header2,
      header3: this.tenant.settings.receiptTemplate.header3,
      header4: this.tenant.settings.receiptTemplate.header4,
      header5: this.tenant.settings.receiptTemplate.header5,
      footer1: this.tenant.settings.receiptTemplate.footer1,
      footer2: this.tenant.settings.receiptTemplate.footer2,
      footer3: this.tenant.settings.receiptTemplate.footer3
    }

    let data = {
      code: order.ref,
      createdAt: order.createdAt,
      subtotal: order.subtotal,
      discount: order.discountAmt,
      tax: order.tax,
      total: order.total,
      cash: order.cash,
      change: order.change,
      items: order.items
    };

    let receipt = Helper.getReceiptPrint(setting, data);
    NativeModules.RNPrinter.print(receipt)

    if (this.tenant.settings.kitchenPrinter && this.tenant.settings.kitchenPrinter.trim() != "") {
      setTimeout(() => {
        let kitchen = Helper.getKitchenPrint(setting, data);
        NativeModules.RNPrinter.print(kitchen)
      }, 2000)
    }
  }

  onEditNote() {
    this.setState({
      isEdittingNote: !this.state.isEdittingNote
    })
  }

  onEditNoteItem(id) {
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
      item = {...item, quantity: 1, extra: []};
      order.items.push(item);
    }

    order.subtotal = 0.00;
    order.discount = 0.00;
    order.discountAmt = 0.00;

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

      if (item.extra && item.extra.length > 0) {
        item.extra.forEach(extra => {
          extra.subtotal = _.round(extra.quantity * extra.unitPrice, 2);
          extra.total = _.round(extra.subtotal - (extra.discount || 0), 2);
          subtotal += extra.subtotal;
          discount += extra.discount || 0;
        });
      }

      order.subtotal += subtotal;
      order.discount += discount;
      order.discountAmt += discount;
    });

    if (this.tenant.settings.isInclusiveGST) {
      order.total = _.round(order.subtotal - order.discountAmt, 2);
      order.tax = _.round(order.total * 0.11, 2);
    } else {
      order.tax = _.round((order.subtotal - order.discountAmt) * 0.11, 2);
      order.total = _.round(order.subtotal - order.discountAmt + order.tax, 2);
    }
    order.change = order.cash ? _.round(order.cash - order.total, 2) : 0;

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
    order.discountAmt = 0.00;

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

      if (item.extra && item.extra.length > 0) {
        item.extra.forEach(extra => {
          extra.subtotal = _.round(extra.quantity * extra.unitPrice, 2);
          extra.total = _.round(extra.subtotal - (extra.discount || 0), 2);
          subtotal += extra.subtotal;
          discount += extra.discount || 0;
        });
      }

      order.subtotal += subtotal;
      order.discount += discount;
      order.discountAmt += discount;
    });

    if (this.tenant.settings.isInclusiveGST) {
      order.total = _.round(order.subtotal - order.discountAmt, 2);
      order.tax = _.round(order.total * 0.11, 2);
    } else {
      order.tax = _.round((order.subtotal - order.discountAmt) * 0.11, 2);
      order.total = _.round(order.subtotal - order.discountAmt + order.tax, 2);
    }
    order.change = order.cash ? _.round(order.cash - order.total, 2) : 0;

    this.setState({
      order: order
    });
  }

  onTakeawayItem(id) {
    let order = {...this.state.order};
    let item = _.find(order.items, item => {
      return item._id === id;
    });

    item.isTakeaway = !item.isTakeaway;

    this.setState({
      order: order
    });
  }

  onAddonItem(id) {
    let order = {...this.state.order};
    let item = _.find(order.items, item => {
      return item._id === id;
    });

    this.setState({
      selectedAddonItem: item
    });

    this.showExtraModal(true);
  }

  onAddExtra(id) {
    let order = {...this.state.order};
    let item = _.find(order.items, item => {
      return item._id === this.state.selectedAddonItem._id;
    });
    let extra = _.find(item.extra, extra => {
      return extra._id === id;
    });

    if (extra) {
      extra.quantity++;
    } else {
      extra = _.find(this.state.addonList, extra => {
        return extra._id === id;
      });
      extra = {...extra, quantity: 1};
      item.extra.push(extra);
    }

    order.subtotal = 0.00;
    order.discount = 0.00;
    order.discountAmt = 0.00;

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

      if (item.extra && item.extra.length > 0) {
        item.extra.forEach(extra => {
          extra.subtotal = _.round(extra.quantity * extra.unitPrice, 2);
          extra.total = _.round(extra.subtotal - (extra.discount || 0), 2);
          subtotal += extra.subtotal;
          discount += extra.discount || 0;
        });
      }

      order.subtotal += subtotal;
      order.discount += discount;
      order.discountAmt += discount;
    });

    if (this.tenant.settings.isInclusiveGST) {
      order.total = _.round(order.subtotal - order.discountAmt, 2);
      order.tax = _.round(order.total * 0.11, 2);
    } else {
      order.tax = _.round((order.subtotal - order.discountAmt) * 0.11, 2);
      order.total = _.round(order.subtotal - order.discountAmt + order.tax, 2);
    }
    order.change = order.cash ? _.round(order.cash - order.total, 2) : 0;

    this.setState({
      order: order,
      selectedAddonItem: {...item}
    })
  }

  onRemoveExtra(id) {
    let order = {...this.state.order};
    let item = _.find(order.items, item => {
      return item._id === this.state.selectedAddonItem._id;
    });
    let extra = _.find(item.extra, extra => {
      return extra._id === id;
    });

    extra.quantity--;
    if (extra.quantity === 0) {
      item.extra = _.filter(item.extra, extra => {
        return extra._id != id;
      });
    }

    order.subtotal = 0.00;
    order.discount = 0.00;
    order.discountAmt = 0.00;

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

      if (item.extra && item.extra.length > 0) {
        item.extra.forEach(extra => {
          extra.subtotal = _.round(extra.quantity * extra.unitPrice, 2);
          extra.total = _.round(extra.subtotal - (extra.discount || 0), 2);
          subtotal += extra.subtotal;
          discount += extra.discount || 0;
        });
      }

      order.subtotal += subtotal;
      order.discount += discount;
      order.discountAmt += discount;
    });

    if (this.tenant.settings.isInclusiveGST) {
      order.total = _.round(order.subtotal - order.discountAmt, 2);
      order.tax = _.round(order.total * 0.11, 2);
    } else {
      order.tax = _.round((order.subtotal - order.discountAmt) * 0.11, 2);
      order.total = _.round(order.subtotal - order.discountAmt + order.tax, 2);
    }
    order.change = order.cash ? _.round(order.cash - order.total, 2) : 0;

    this.setState({
      order: order,
      selectedAddonItem: {...item}
    });
  }

  onDiscountChanged(text){
    try {
      let discount = Number(text.replace(/[^0-9\.-]+/g,""));

      let order = {...this.state.order};
      order.discountAmt = _.round(discount, 2);
      if (this.tenant.settings.isInclusiveGST) {
        order.total = _.round(order.subtotal - order.discountAmt, 2);
        order.tax = _.round(order.total * 0.11, 2);
      } else {
        order.tax = _.round((order.subtotal - order.discountAmt) * 0.11, 2);
        order.total = _.round(order.subtotal - order.discountAmt + order.tax, 2);
      }
      order.change = order.cash ? _.round(order.cash - order.total, 2) : 0;

      this.setState({
        order: order
      });

    }
    catch(err) {}
  }

  onCashSelected(cash){
    try {
      let order = {...this.state.order};
      order.cash = _.round(cash, 2);
      order.change = _.round(order.cash - order.total, 2);

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
    order.note = text;

    this.setState({
      order: order
    });
  }

  showConfirmModal(visible) {
    this.setState({isConfirmModalVisible: visible});
  }

  showExtraModal(visible) {
    this.setState({isExtraModalVisible: visible});
  }

  render() {
    if (!this.state.isSignedIn) return null;
const {height: screenHeight} = Dimensions.get('window');
    return (
  <Container style={{backgroundColor: '#fff'}}>
    <Content>
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        height: screenHeight - 50
      }}>
        <Modal isVisible={this.state.isConfirmModalVisible}
          onBackdropPress={() => this.showConfirmModal(false)}>
          <View style={{
            flexDirection: 'column', 
            padding: 20,
            height: 500,
            borderRadius: 4,
            backgroundColor: "white",
            borderColor: "rgba(0, 0, 0, 0.1)"
          }}>
            <View style={{flexDirection: 'row', backgroundColor: '#f2f3f4'}}>
              <View style={{width: 150, height: 72, marginTop: 10, marginLeft: 10, marginRight: 10}}>
                <Button full large style={{backgroundColor: '#2177b4'}}>
                  <Text>CASH</Text>
                </Button>
              </View>
              <View style={{flex: 1}}>
                <ScrollView horizontal={true} style={{flex: 1, flexDirection: 'row'}}>
                  {this.state.cashList.map(cash => (
                    <View key={cash._id} style={{width: 150, height: 72, marginTop: 10, marginRight: 10}}>
                      <Button full large onPress={() => this.onCashSelected(cash.amount)} success style={{backgroundColor: '#2FA495'}}>
                        <Text style={{fontSize: 16}}>
                          {(() => { return Helper.formatCurrency(cash.amount) })()}
                        </Text>
                      </Button>
                    </View>
                  ))}
                </ScrollView>
              </View>
              <View style={{marginLeft: 10}}>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
              <View style={{height: 40, marginTop: 30, marginLeft: 10, marginRight: 10}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text style={{flex: 1}}>CASH</Text>
                  <TextInputMask type={'money'} options={{unit: '$', separator: '.', delimiter: ','}} selectTextOnFocus value={(() => { return Helper.formatCurrency(this.state.order.cash) })()} onChangeText={(text) => this.onCashChanged(text)} style={{fontSize: 20, height: 35, backgroundColor: '#fff', borderColor: '#d2d3d4', borderWidth: 1, textAlign: 'right', flex: 1}}/>          
                </View>
              </View>

              <View style={{height: 40, marginTop: 10, marginLeft: 10, marginRight: 10}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text style={{flex: 1}}>DISCOUNT</Text>
                  <TextInputMask type={'money'} options={{unit: '$', separator: '.', delimiter: ','}} selectTextOnFocus value={(() => { return Helper.formatCurrency(this.state.order.discountAmt) })()} onChangeText={(text) => this.onDiscountChanged(text)} style={{fontSize: 20, height: 35, backgroundColor: '#fff', borderColor: '#d2d3d4', borderWidth: 1, textAlign: 'right', flex: 1}}/>          
                </View>
              </View>

              <View style={{height: 40, marginTop: 10, marginLeft: 10, marginRight: 10}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text style={{flex: 1}}>NOTE</Text>
                  <TextInput defaultValue={this.state.order.note} onChangeText={(text) => this.onNoteChanged(text)} style={{fontSize: 20, height: 35, backgroundColor: '#fff', borderColor: '#d2d3d4', borderWidth: 1, flex: 1}}/>
                </View>
              </View>

              <View style={{height: 40, marginTop: 10, marginLeft: 10, marginRight: 10}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text style={{flex: 1, fontSize: 30, color: 'rgb(70, 70, 70)'}}>TOTAL</Text>
                  <Text style={{width: 200, textAlign: 'right', fontSize: 30, color: '#EE2738'}}>
                    {(() => { return Helper.formatCurrency(this.state.order.total) })()}
                  </Text>
                </View>
              </View>

              <View style={{height: 40, marginTop: 10, marginLeft: 10, marginRight: 10}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text style={{flex: 1, fontSize: 30, color: 'rgb(70, 70, 70)'}}>CHANGE</Text>
                  <Text style={{width: 200, textAlign: 'right', fontSize: 30}}>
                    {(() => { return Helper.formatCurrency(this.state.order.change) })()}
                  </Text>
                </View>
              </View>

              <View style={{flexDirection: 'row', marginTop: 50, marginBottom: 10, marginLeft: 10, marginRight: 10}}>
                <View style={{flex: 1}} />
                <View style={{width: 170, marginRight: 10}}>
                  <Button full onPress={() => this.showConfirmModal(false)} style={{backgroundColor: '#6c757d'}}><Text> CLOSE </Text></Button>
                </View>
                <View style={{width: 170}}>
                  <Button full onPress={() => this.onSave()} style={{backgroundColor: '#2177b4'}}><Text> SAVE </Text></Button>
                </View>
              </View>
            </View>            
          </View>
        </Modal>

        <Modal isVisible={this.state.isExtraModalVisible}
          onBackdropPress={() => this.showExtraModal(false)}>
          <View style={{
            flexDirection: 'column', 
            padding: 20,
            height: 500,
            borderRadius: 4,
            backgroundColor: "white",
            borderColor: "rgba(0, 0, 0, 0.1)"
          }}>
            <View style={{flexDirection: 'row', backgroundColor: '#f2f3f4'}}>
              <View style={{width: 150, height: 72, marginTop: 10, marginLeft: 10, marginRight: 10}}>
                <Button full large style={{backgroundColor: '#2177b4'}}>
                  <Text>ADD-ONS</Text>
                </Button>
              </View>
              <View style={{flex: 1}}>
                <ScrollView horizontal={true} style={{flex: 1, flexDirection: 'row'}}>
                  {this.state.addonList.map(addon => (
                    <View key={addon._id} style={{width: 150, height: 72, marginTop: 10, marginRight: 10}}>
                      <Button full large onPress={() => this.onAddExtra(addon._id)} success style={{backgroundColor: '#2FA495'}}>
                        <Text style={{fontSize: 16}}>{addon.name}</Text>
                      </Button>
                    </View>
                  ))}
                </ScrollView>
              </View>
              <View style={{marginLeft: 10}}>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'column', backgroundColor: '#fff'}}>
              <View style={{height: 40, marginTop: 30, marginLeft: 10, marginRight: 10}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text style={{flex: 1}}>{this.state.selectedAddonItem.name}</Text>
                </View>
              </View>

              <ScrollView style={{flex: 1, flexDirection: 'column', marginLeft: 30, marginRight: 10}}>
                <List>
                  {this.state.selectedAddonItem.extra.map(extra => (
                    <ListItem key={extra._id} style={{height: 50}}>
                      <Body>
                        <View style={{flexDirection: "row"}}>
                          <Text style={{width: 200}}>{extra.name}</Text>
                          <Text style={{width: 70, textAlign: 'right'}}>
                            {(() => { return Helper.formatCurrency(extra.unitPrice) })()}
                          </Text>
                          <Text style={{width: 70, textAlign: 'right'}}>{extra.quantity}</Text>
                          <Text style={{width: 70}}></Text>
                          <View style={{width: 50}}>
                            <Button full small style={{backgroundColor: '#2177b4'}} onPress={() => {this.onAddExtra(extra._id)}}>
                              <MaterialIcons name='add' color={'#fff'} size={20} />
                            </Button>
                          </View>
                          <View style={{width: 50}}>
                            <Button full small style={{backgroundColor: '#6c757d'}} onPress={() => {this.onRemoveExtra(extra._id)}}>
                              <MaterialIcons name='remove' color={'#fff'} size={20} />
                            </Button>
                          </View>                          
                        </View>
                      </Body>
                    </ListItem>
                  ))}
                </List>
              </ScrollView>

              <View style={{flexDirection: 'row', marginTop: 50, marginBottom: 10, marginLeft: 10, marginRight: 10}}>
                <View style={{flex: 1}} />
                <View style={{width: 170, marginRight: 10}}>
                  <Button full onPress={() => this.showExtraModal(false)} style={{backgroundColor: '#6c757d'}}><Text> CLOSE </Text></Button>
                </View>
              </View>
            </View>            
          </View>
        </Modal>

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
                                <View style={{backgroundColor: 'rgba(221, 226, 229, 0.85)'}}>
                                  <Text style={{marginTop: 3, marginLeft: 3, marginRight: 3}}>
                                    {menuItem.name}
                                  </Text>
                                  <Text style={{marginTop: 3, marginLeft: 3, marginRight: 3, marginBottom: 3}}>
                                    {(() => { return Helper.formatCurrency(menuItem.unitPrice) })()}
                                  </Text>
                                </View>
                              </ImageBackground>
                            )
                          } else {
                            return (
                              <View style={{backgroundColor: 'rgba(221, 226, 229, 0.85)'}}>
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
              <Text style={{textAlign: 'center', fontSize: 25, color: 'rgb(70, 70, 70)'}}>ORDER</Text>
            </View>

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
                        {(() => {
                          if (item.isTakeaway) {
                            return (
                              <Button full small style={{backgroundColor: '#EE2738'}} onPress={() => {this.onTakeawayItem(item._id)}}>
                                <MaterialIcons name='directions-walk' color={'#fff'} size={20} />
                              </Button>
                            )
                          } else {
                            return (
                              <Button full small style={{backgroundColor: '#2FA495'}} onPress={() => {this.onTakeawayItem(item._id)}}>
                                <MaterialIcons name='directions-walk' color={'#fff'} size={20} />
                              </Button>
                            )
                          }
                        })()}
                      </View>
                      <View style={{width: 50}}>
                        <Button full small style={{backgroundColor: '#2177b4'}} onPress={() => {this.onEditNoteItem(item._id)}}>
                          <MaterialIcons name='subject' color={'#fff'} size={20} />
                        </Button>
                      </View>
                      <View style={{width: 50}}>
                        {(() => {
                          if (item.extra && item.extra.length > 0) {
                            return (
                              <Button full small style={{backgroundColor: '#EE2738'}} onPress={() => {this.onAddonItem(item._id)}}>
                                <MaterialIcons name='add-circle-outline' color={'#fff'} size={20} />
                              </Button>
                            )
                          } else {
                            return (
                              <Button full small style={{backgroundColor: '#6c757d'}} onPress={() => {this.onAddonItem(item._id)}}>
                                <MaterialIcons name='add-circle-outline' color={'#fff'} size={20} />
                              </Button>
                            )
                          }
                        })()}
                      </View>
                      <View style={{flex: 1}}/>
                      <Text style={{width: 70, textAlign: 'right', color: '#EE2738'}}>x{item.quantity}</Text>
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
                  {(() => { return Helper.formatCurrency(this.state.order.discountAmt) })()}
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
                <Text style={{width: 200, textAlign: 'right', fontSize: 30, color: '#EE2738'}}>
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
                <Button full onPress={() => this.onOrder()} style={{backgroundColor: '#2177b4'}}><Text> ORDER </Text></Button>
              </View>
            </View>
          </View>
        </View>

        <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#f2f3f4'}}>
          <View style={{width: 150, height: 60, marginTop: 10, marginLeft: 10, marginRight: 10}}>
            <Button full large onPress={() => this.onBackCategory()} style={{backgroundColor: '#2177b4'}}>
              <MaterialIcons name='subdirectory-arrow-left' color={'#fff'} size={20} />              
            </Button>
          </View>
          <View style={{flex: 1}}>
            <ScrollView horizontal={true} style={{flex: 1, flexDirection: 'row'}}>
              {this.state.filteredCategories.map(category => (
                <View key={category._id} style={{width: 150, height: 60, marginTop: 10, marginRight: 10}}>
                  {(() => {
                    if (this.selectedCategory && this.selectedCategory._id === category._id) {
                      return (
                        <Button full large success onPress={() => this.onSelectCategory(category)} style={{backgroundColor: '#EE2738'}}><Text style={{fontSize: 16}}> {category.name} </Text></Button>
                      )
                    } else {
                      return (
                        <Button full large success onPress={() => this.onSelectCategory(category)} style={{backgroundColor: '#2FA495'}}><Text style={{fontSize: 16}}> {category.name} </Text></Button>
                      )                      
                    }
                  })()}
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={{marginLeft: 10}}>
          </View>           
        </View>
      </View>
    </Content>
  </Container>            
    );
  }
}

Order.propTypes = {
};

export default Order;
