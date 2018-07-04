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
        <View style={{height: 330}}>
          <FlatList
            contentContainerStyle={{
              alignItems: 'center',
            }}
            data={store.items.slice()}
            horizontal
            showsHorizontalScrollIndicator={false}
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
