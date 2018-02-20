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

class Pos extends React.Component {
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
          <View style={{width: 730}}>
            <ScrollView vertical={true}>
              <View style={{
                flex: 1,
                flexDirection: 'row', 
                flexWrap: 'wrap'
              }}>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/210/0/10748667/il_340x270.1353210938_iqg8.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Natural Turquoise Brooch
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 16.92
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/191/1/7502837/il_340x270.1379665700_jnp8.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Winter wedding mittens
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 11.81
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/189/1/12773570/il_340x270.1256358656_o7ls.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Watch tools diy steampunk
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 7.15
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/210/0/10748667/il_340x270.1353210938_iqg8.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Natural Turquoise Brooch
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 16.92
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10, backgroundColor: '#6c757d'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Winter wedding mittens
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 11.81
                    </Text>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/189/1/12773570/il_340x270.1256358656_o7ls.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Watch tools diy steampunk
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 7.15
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/210/0/10748667/il_340x270.1353210938_iqg8.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Natural Turquoise Brooch
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 16.92
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/191/1/7502837/il_340x270.1379665700_jnp8.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Winter wedding mittens
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 11.81
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/189/1/12773570/il_340x270.1256358656_o7ls.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Watch tools diy steampunk
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 7.15
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/210/0/10748667/il_340x270.1353210938_iqg8.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Natural Turquoise Brooch
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 16.92
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/191/1/7502837/il_340x270.1379665700_jnp8.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Winter wedding mittens
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 11.81
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/189/1/12773570/il_340x270.1256358656_o7ls.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Watch tools diy steampunk
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 7.15
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/210/0/10748667/il_340x270.1353210938_iqg8.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Natural Turquoise Brooch
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 16.92
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/191/1/7502837/il_340x270.1379665700_jnp8.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Winter wedding mittens
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 11.81
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/189/1/12773570/il_340x270.1256358656_o7ls.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Watch tools diy steampunk
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 7.15
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/210/0/10748667/il_340x270.1353210938_iqg8.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Natural Turquoise Brooch
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 16.92
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/191/1/7502837/il_340x270.1379665700_jnp8.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Winter wedding mittens
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 11.81
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/189/1/12773570/il_340x270.1256358656_o7ls.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Watch tools diy steampunk
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 7.15
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/210/0/10748667/il_340x270.1353210938_iqg8.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Natural Turquoise Brooch
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 16.92
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/191/1/7502837/il_340x270.1379665700_jnp8.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Winter wedding mittens
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 11.81
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/189/1/12773570/il_340x270.1256358656_o7ls.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Watch tools diy steampunk
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 7.15
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/210/0/10748667/il_340x270.1353210938_iqg8.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Natural Turquoise Brooch
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 16.92
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/191/1/7502837/il_340x270.1379665700_jnp8.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Winter wedding mittens
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 11.81
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/189/1/12773570/il_340x270.1256358656_o7ls.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Watch tools diy steampunk
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 7.15
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/210/0/10748667/il_340x270.1353210938_iqg8.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Natural Turquoise Brooch
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 16.92
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/191/1/7502837/il_340x270.1379665700_jnp8.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Winter wedding mittens
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 11.81
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/189/1/12773570/il_340x270.1256358656_o7ls.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Watch tools diy steampunk
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 7.15
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/210/0/10748667/il_340x270.1353210938_iqg8.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Natural Turquoise Brooch
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 16.92
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/191/1/7502837/il_340x270.1379665700_jnp8.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Winter wedding mittens
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 11.81
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/189/1/12773570/il_340x270.1256358656_o7ls.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Watch tools diy steampunk
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 7.15
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/210/0/10748667/il_340x270.1353210938_iqg8.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Natural Turquoise Brooch
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 16.92
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/191/1/7502837/il_340x270.1379665700_jnp8.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Winter wedding mittens
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 11.81
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/189/1/12773570/il_340x270.1256358656_o7ls.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Watch tools diy steampunk
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 7.15
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/210/0/10748667/il_340x270.1353210938_iqg8.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Natural Turquoise Brooch
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 16.92
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/191/1/7502837/il_340x270.1379665700_jnp8.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Winter wedding mittens
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 11.81
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/189/1/12773570/il_340x270.1256358656_o7ls.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Watch tools diy steampunk
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 7.15
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/210/0/10748667/il_340x270.1353210938_iqg8.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Natural Turquoise Brooch
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 16.92
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/191/1/7502837/il_340x270.1379665700_jnp8.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Winter wedding mittens
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 11.81
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/189/1/12773570/il_340x270.1256358656_o7ls.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Watch tools diy steampunk
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 7.15
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/210/0/10748667/il_340x270.1353210938_iqg8.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Natural Turquoise Brooch
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 16.92
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/191/1/7502837/il_340x270.1379665700_jnp8.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Winter wedding mittens
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 11.81
                    </Text>
                  </ImageBackground>
                </View>
                <View style={{width: 170, height: 170, marginTop: 10, marginLeft: 10}}>
                  <ImageBackground
                    style={{width: 170, height: 170}}
                    source={{uri: 'https://img0.etsystatic.com/189/1/12773570/il_340x270.1256358656_o7ls.jpg'}}>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      Watch tools diy steampunk
                    </Text>
                    <Text style={{backgroundColor: 'rgba(221, 226, 229, 0.8)'}}>
                      $ 7.15
                    </Text>
                  </ImageBackground>
                </View>                
              </View>
            </ScrollView>
          </View>
          <View style={{flex: 2, flexDirection: 'column', backgroundColor: 'rgb(221, 226, 229)'}}>
            <View style={{width: 270, height: 30, marginTop: 20, marginLeft: 10, marginRight: 10}}>
              <Text style={{textAlign: 'center', fontSize: 20, color: 'rgb(70, 70, 70)'}}>CHECKOUT</Text>
            </View>

            <ScrollView style={{flex: 1, flexDirection: 'column'}}>
              <FlatList style={{marginLeft: 10, marginRight: 10}}
                data={[
                  {key: 1, name: 'Watch tools diy steampunk', price: 897.25, quantity: 1},
                  {key: 2, name: 'Natural Turquoise Brooch', price: 16.29, quantity: 2},
                  {key: 3, name: 'Winter wedding mittens', price: 11.81, quantity: 5},
                  {key: 4, name: 'Watch tools diy steampunk', price: 7.15, quantity: 14},
                  {key: 5, name: 'Natural Turquoise Brooch', price: 16.29, quantity: 1},
                  {key: 6, name: 'Winter wedding mittens', price: 11.81, quantity: 1},
                  {key: 7, name: 'Watch tools diy steampunk', price: 7.15, quantity: 1},
                  {key: 8, name: 'Natural Turquoise Brooch', price: 16.29, quantity: 1},
                  {key: 9, name: 'Winter wedding mittens', price: 11.81, quantity: 1}
                ]}
                renderItem={({item, separators}) => (
                  <View>
                    <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                      <Text style={{flex: 1}}>{item.name}</Text>
                      <Text style={{width: 70, textAlign: 'right'}}>${item.price}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', marginTop: 10}}>
                      <Button full small style={{backgroundColor: '#2177b4'}}><Text> + </Text></Button>
                      <Button full small style={{backgroundColor: '#6c757d'}}><Text> - </Text></Button>
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

            <View style={{width: 270, height: 40, marginTop: 10, marginLeft: 10, marginRight: 10}}>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={{flex: 1, fontSize: 30, color: 'rgb(70, 70, 70)'}}>Total</Text>
                <Text style={{width: 150, textAlign: 'right', fontSize: 30, color: 'rgb(70, 70, 70)'}}>$8,952.00</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', width: 270, marginTop: 20, marginBottom: 20, marginLeft: 10, marginRight: 10}}>
              <View style={{width: 125}}>
                <Button full onPress={this.onPress} style={{backgroundColor: '#6c757d'}}><Text> DISCARD </Text></Button>
              </View>
              <View style={{flex: 1}} />
              <View style={{width: 125}}>
                <Button full onPress={this.onPress} style={{backgroundColor: '#2177b4'}}><Text> CONFIRM </Text></Button>
              </View>
            </View>
          </View>
        </View>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{width: 100, height: 60, marginTop: 10, marginLeft: 10}}>
            <Button full large onPress={this.onPress} style={{backgroundColor: '#2177b4'}}><Text> BACK </Text></Button>
          </View>
          <View style={{flex: 1}}>
            <ScrollView horizontal={true} style={{flex: 1, flexDirection: 'row'}}>
              <View style={{width: 170, height: 60, marginTop: 10, marginLeft: 10}}>
                <Button full large success onPress={this.onPress} style={{backgroundColor: '#93c4b9'}}><Text> Noodle </Text></Button>
              </View>
              <View style={{width: 170, height: 60, marginTop: 10, marginLeft: 10}}>
                <Button full large success onPress={this.onPress} style={{backgroundColor: '#93c4b9'}}><Text> Noodle </Text></Button>
              </View>
              <View style={{width: 170, height: 60, marginTop: 10, marginLeft: 10}}>
                <Button full large success onPress={this.onPress} style={{backgroundColor: '#93c4b9'}}><Text> Noodle </Text></Button>
              </View>
              <View style={{width: 170, height: 60, marginTop: 10, marginLeft: 10}}>
                <Button full large success onPress={this.onPress} style={{backgroundColor: '#93c4b9'}}><Text> Noodle </Text></Button>
              </View>
              <View style={{width: 170, height: 60, marginTop: 10, marginLeft: 10}}>
                <Button full large success onPress={this.onPress} style={{backgroundColor: '#93c4b9'}}><Text> Noodle </Text></Button>
              </View>
              <View style={{width: 170, height: 60, marginTop: 10, marginLeft: 10}}>
                <Button full large success onPress={this.onPress} style={{backgroundColor: '#93c4b9'}}><Text> Noodle </Text></Button>
              </View>
              <View style={{width: 170, height: 60, marginTop: 10, marginLeft: 10}}>
                <Button full large success onPress={this.onPress} style={{backgroundColor: '#93c4b9'}}><Text> Noodle </Text></Button>
              </View>
            </ScrollView>
          </View>   
        </View>
      </View>      
    );
  }
}

Pos.propTypes = {
};

export default Pos;
