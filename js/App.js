import React, { Component } from "react";
import { StyleSheet, View, NativeModules, FlatList } from "react-native";

import { observer, Observer } from "mobx-react";

import List, { HEIGHT as LIST_HEIGHT } from "./components/List";
import Store from "./store/Store";

const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#222",
    alignItems: "stretch",
    paddingTop: 40
  }
});

const store = new Store();

@observer
export default class App extends Component {
  renderSubredditRow({ item: subreddit, index }) {
    return (
      <Observer>
        {() => (
          <List
            key={subreddit.uniqueId}
            store={subreddit}
            onItemFocused={() =>
              this.flatList.scrollToIndex({
                index,
                animated: true,
                viewPosition: 0.5
              })
            }
          />
        )}
      </Observer>
    );
  }

  getItemLayout(data, index) {
    return { length: LIST_HEIGHT, offset: LIST_HEIGHT * index, index };
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={store.subreddits.slice()}
          keyExtractor={subreddit => subreddit.uniqueId}
          ref={c => (this.flatList = c)}
          renderItem={this.renderSubredditRow.bind(this)}
        />
      </View>
    );
  }
}
