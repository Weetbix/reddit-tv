import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  NativeModules,
  LayoutAnimation,
  FlatList,
} from 'react-native';

import {observer, Observer} from 'mobx-react';

import Card from './Card';
import Store from './Store';

const {UIManager} = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#BBB',
  },
});

const store = new Store();
store.addItem({name: 'test'});

@observer
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={store.items.slice()}
          horizontal
          keyExtractor={item => item.id.toString()}
          ref={c => this.flatList = c}
          renderItem={({item}) => (
            <Observer>
              {() => (
                <Card
                  key={item.id}
                  onFocus={() =>
                    this.flatList.scrollToIndex({
                      index: item.id,
                      animated: true,
                      viewPosition: 0.5,
                    })}
                  onPress={() => store.addItem({name: 'blah'})}
                />
              )}
            </Observer>
          )}
        />
      </View>
    );
  }
}
