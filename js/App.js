import React, {Component} from 'react';
import {StyleSheet, View, NativeModules, ScrollView} from 'react-native';

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
    alignItems: 'stretch',
    paddingTop: 40,
  },
});

const store = new Store();

@observer
export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView ref={c => this.scrollView = c}>
          {store.subreddits.map((subreddit, i) => (
            <List
              key={subreddit.uniqueId}
              store={subreddit}
              onItemFocused={() => i === 0 && this.scrollView.scrollTo({y: 0})}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
