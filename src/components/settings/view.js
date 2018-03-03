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
  constructor(props) {
    super(props);
    this.state = {
      edit: null
    }
  }

  onEdit(setting) {
    this.setState({
      edit: setting
    })    
  }

  onCancel() {
    this.setState({
      edit: null
    })    
  }

  onSave() {
    this.setState({
      edit: null
    })    
  }

  onPress() {
    alert('press')
  }

  render() {
    if (!this.state.edit) {
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
                <MaterialIcons name='print' color={'#6c757d'} size={20} />            
              </Left>
              <Body>
                <Text>Print</Text>
              </Body>
              <Right>
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
              </Left>
              <Body style={{marginLeft: 20}}>
                <Text>Receipt Printer</Text>
              </Body>
              <Right>
                <Text>TCP:F8:D0:27:2B:0F:93</Text>
                <TouchableOpacity activeOpacity={1.0} onPress={() => this.onEdit("RECEIPT_PRINTER")}>
                  <Icon name="arrow-forward" />
                </TouchableOpacity>
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
              </Left>
              <Body style={{marginLeft: 20}}>
                <Text>Kitchen Printer</Text>
              </Body>
              <Right>
                <Text>TCP:F8:D0:27:2B:0F:93</Text>
                <TouchableOpacity activeOpacity={1.0} onPress={() => this.onEdit("KITCHEN_PRINTER")}>
                  <Icon name="arrow-forward" />
                </TouchableOpacity>
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
              </Left>
              <Body style={{marginLeft: 20}}>
                <Text>Receipt Template</Text>
              </Body>
              <Right>
                <Text></Text>
                <TouchableOpacity activeOpacity={1.0} onPress={() => this.onEdit("RECEIPT_TEMPLATE")}>
                  <Icon name="arrow-forward" />
                </TouchableOpacity>
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

          <View style={{flex: 1}} />
        </View>      
      );
    } else {
      return (
        <View style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#FFF'
        }}>
          <List style={{marginTop: 40}}>
          {(() => {
            switch(this.state.edit) {
              case "RECEIPT_PRINTER":
                return (
                  <ListItem icon>
                    <Left>
                      <MaterialIcons name='print' color={'#2177b4'} size={20} />            
                    </Left>
                    <Body>
                      <Text>Receipt Printer</Text>
                    </Body>
                    <Right>
                    </Right>
                  </ListItem>
                )

              case "KITCHEN_PRINTER":
                return (
                  <ListItem icon>
                    <Left>
                      <MaterialIcons name='print' color={'#2177b4'} size={20} />            
                    </Left>
                    <Body>
                      <Text>Kitchen Printer</Text>
                    </Body>
                    <Right>
                    </Right>
                  </ListItem>
                )

              case "RECEIPT_TEMPLATE":
                return (
                  <ListItem icon>
                    <Left>
                      <MaterialIcons name='print' color={'#2177b4'} size={20} />            
                    </Left>
                    <Body>
                      <Text>Receipt Template</Text>
                    </Body>
                    <Right>
                    </Right>
                  </ListItem>
                )
            }
          })()}
          </List>

          {(() => {
            switch(this.state.edit) {
              case "RECEIPT_PRINTER":
                return (
                  <View style={{ marginLeft: 50, marginTop: 50 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{width: 200}}>
                        <Text>Receipt Printer</Text>
                      </View>
                      <View style={{width: 500}}>
                        <TextInput value="TCP:F8:D0:27:2B:0F:93" style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                      </View>
                      <View style={{flex: 1}}></View>
                    </View>
                    <View style={{width: 530, marginLeft: 170}}>
                      <List style={{marginTop: 40}}>
                        <ListItem icon>
                          <Left>
                          </Left>
                          <Body>
                            <Text>Select Printer</Text>
                          </Body>
                          <Right>
                          </Right>
                        </ListItem>
                        <ListItem icon>
                          <Left>
                          </Left>
                          <Body>
                            <Text>TCP:F8:D0:27:2B:0F:93</Text>
                          </Body>
                          <Right>
                            <Switch value={true} />
                          </Right>
                        </ListItem>
                      </List>
                    </View>
                    <View style={{flex: 1}}></View>
                  </View>
                )

              case "KITCHEN_PRINTER":
                return (
                  <View style={{ marginLeft: 50, marginTop: 50 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{width: 200}}>
                        <Text>Kitchen Printer</Text>
                      </View>
                      <View style={{width: 500}}>
                        <TextInput value="TCP:F8:D0:27:2B:0F:93" style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                      </View>
                      <View style={{flex: 1}}></View>
                    </View>
                    <View style={{width: 530, marginLeft: 170}}>
                      <List style={{marginTop: 40}}>
                        <ListItem icon>
                          <Left>
                          </Left>
                          <Body>
                            <Text>Select Printer</Text>
                          </Body>
                          <Right>
                          </Right>
                        </ListItem>
                        <ListItem icon>
                          <Left>
                          </Left>
                          <Body>
                            <Text>TCP:F8:D0:27:2B:0F:93</Text>
                          </Body>
                          <Right>
                            <Switch value={true} />
                          </Right>
                        </ListItem>
                      </List>
                    </View>
                    <View style={{flex: 1}}></View>
                  </View>
                )

              case "RECEIPT_TEMPLATE":
                return (
                  <View style={{ marginLeft: 50, marginTop: 50 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{width: 200}}>
                        <Text>Receipt Name</Text>
                      </View>
                      <View style={{width: 500}}>
                        <TextInput style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                      </View>
                      <View style={{flex: 1}}></View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                      <View style={{width: 200}}>
                        <Text>Header 1</Text>
                      </View>
                      <View style={{width: 500}}>
                        <TextInput style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                      </View>
                      <View style={{flex: 1}}></View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                      <View style={{width: 200}}>
                        <Text>Header 2</Text>
                      </View>
                      <View style={{width: 500}}>
                        <TextInput style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                      </View>
                      <View style={{flex: 1}}></View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                      <View style={{width: 200}}>
                        <Text>Header 3</Text>
                      </View>
                      <View style={{width: 500}}>
                        <TextInput style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                      </View>
                      <View style={{flex: 1}}></View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                      <View style={{width: 200}}>
                        <Text>Header 4</Text>
                      </View>
                      <View style={{width: 500}}>
                        <TextInput style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                      </View>
                      <View style={{flex: 1}}></View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                      <View style={{width: 200}}>
                        <Text>Header 5</Text>
                      </View>
                      <View style={{width: 500}}>
                        <TextInput style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                      </View>
                      <View style={{flex: 1}}></View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                      <View style={{width: 200}}>
                        <Text>Footer 1</Text>
                      </View>
                      <View style={{width: 500}}>
                        <TextInput style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                      </View>
                      <View style={{flex: 1}}></View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                      <View style={{width: 200}}>
                        <Text>Footer 2</Text>
                      </View>
                      <View style={{width: 500}}>
                        <TextInput style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                      </View>
                      <View style={{flex: 1}}></View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                      <View style={{width: 200}}>
                        <Text>Footer 3</Text>
                      </View>
                      <View style={{width: 500}}>
                        <TextInput style={{height: 35, borderColor: '#d2d3d4', borderWidth: 1}}/>          
                      </View>
                      <View style={{flex: 1}}></View>
                    </View>
                  </View>
                )
            }
          })()}

          <View style={{flex: 1}} />

          <View style={{height: 65, flexDirection: 'row', backgroundColor: '#f2f3f4'}}>
            <View style={{flex: 1}}></View>
            <View style={{width: 180}}>
              <Button full style={{marginTop: 10, backgroundColor: '#6c757d'}} onPress={() => this.onCancel()}><Text> CANCEL </Text></Button>
            </View>
            <View style={{width: 50}}></View>
            <View style={{width: 180}}>
              <Button full style={{marginTop: 10, backgroundColor: '#2177b4'}} onPress={() => this.onSave()}><Text> SAVE </Text></Button>
            </View>
            <View style={{flex: 1}}></View>
          </View>
        </View>      
      );
    }
  }
}

Dashboard.propTypes = {
};

export default Dashboard;

