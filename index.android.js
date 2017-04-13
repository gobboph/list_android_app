/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import ReactNative from 'react-native';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  Alert,
  TextInput
} from 'react-native';
import * as firebase from 'firebase';

const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const ListItem = require('./components/ListItem');
const styles = require('./styles.js');

// Initialize Firebase
const firebaseConfig = {
  apiKey: "Your great API",
  authDomain: "Your great domain",
  databaseURL: "Your great URL",
  storageBucket: "Your great bucket",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class third extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      newItem: ""
    };
    this.itemsRef = this.getRef().child('items');
    //this.itemsRef = firebaseApp.database().ref();
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  listenForItems(itemsRef) {
    //Get items from database
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().name,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });

    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  render() {
    return (
      <View style={styles.container}>

        <StatusBar title="List" />

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.listview}/>

        <TextInput
          value={this.state.newItem}
          style={styles.textEdit}
          onChangeText={(text) => this.setState({newItem: text})}
          placeholder="New Item"
        />
        <ActionButton onPress={this._addItem.bind(this)} title="Add" />

      </View>
    )
  }

  _addItem() {
    //Add item to list
    if (this.state.newItem === "") {
      return;
    }
    this.itemsRef.push({ name: this.state.newItem});
    this.setState({newItem: ""});
  }

  _renderItem(item) {
    //Delete item from list
    const onPress = () => {
      Alert.alert(
        'Remove',
        'Removing items will be permanent',
        [
          {text: 'Remove', onPress: (text) => this.itemsRef.child(item._key).remove()},
          {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
        ]
      );
    };

    return (
      <ListItem item={item} onPress={onPress}></ListItem>
    );
  }

}

AppRegistry.registerComponent('third', () => third);
