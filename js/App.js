import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  NativeModules,
  LayoutAnimation,
  FlatList,
} from 'react-native';

import {observer, Observer} from 'mobx-react';

import Card from './components/Card';
import Store from './store/Store';

// const {UIManager} = NativeModules;
// UIManager.setLayoutAnimationEnabledExperimental &&
//   UIManager.setLayoutAnimationEnabledExperimental(true);

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    height: '100%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BBB',
  },
});

const store = new Store();

@observer
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{height: 280, backgroundColor: 'blue'}}>
          <FlatList
            style={{backgroundColor: 'pink'}}
            contentContainerStyle={{alignItems: 'center'}}
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
                    item={item}
                  />
                )}
              </Observer>
            )}
          />
        </View>
      </View>
    );
  }
}
