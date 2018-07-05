import React, {Component} from 'react';
import {StyleSheet, View, NativeModules} from 'react-native';

import {observer} from 'mobx-react';

import List from './components/List';
import Store from './store/Store';

const {UIManager} = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const store = new Store();

@observer
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <List store={store} />
      </View>
    );
  }
}
