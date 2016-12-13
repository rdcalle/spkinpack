import React, { Component } from 'react';
import codePush from "react-native-code-push";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
let noble = require('react-native-ble');

export default class SpkinPack extends Component {
  constructor() {
    super();
    this.state = { bluState: 'sin iniciar aún', periph: []};
  }

  componentWillMount() {
    noble.on('stateChange', state => {
      this.setState({bluState: state});
      state==='poweredOn'
      ? noble.startScanning()
      : noble.stopScanning()
    });
    noble.on('discover', peripheral => {
      this.setState({ periph: [
        ...this.state.periph,
        peripheral.id
      ] })
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          A ver los dispositivos Bluetooth que encontramos por ahí...
        </Text>
        <Text style={styles.state}>
          {this.state.bluState}
        </Text>
        {
          this.state.periph.map((dev, i) =>
            <Text style={styles.state} key={i}>
              { `${i+1}. ${dev}` }
            </Text>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  state: {
    fontSize: 16,
    textAlign: 'center',
    margin: 3,
  },
});

AppRegistry.registerComponent('SpkinPack', () => codePush(SpkinPack));
