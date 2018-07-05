import React, {Component} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import {observer, Observer} from 'mobx-react';

import Card from './Card';

const styles = StyleSheet.create({
  container: {
    height: 260,
    marginLeft: 10,
  },
  contentContainer: {
    alignItems: 'center',
  },
});

@observer
export default class List extends Component {
  // Render a single card
  renderItem({item}) {
    return (
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
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={this.props.store.items.slice()}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          ref={c => this.flatList = c}
          renderItem={this.renderItem.bind(this)}
        />
      </View>
    );
  }
}
