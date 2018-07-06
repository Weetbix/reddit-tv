import React, {Component} from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';

import {observer, Observer} from 'mobx-react';

import Card, {EFFECTIVE_WIDTH} from './Card';

export const HEIGHT = 270;
const styles = StyleSheet.create({
  container: {
    height: HEIGHT,
    marginLeft: 10,
    flex: 1,
  },
  headerText: {
    color: '#eee',
    fontWeight: 'bold',
    zIndex: 0,
    marginLeft: 10,
    flex: 0,
  },
  contentContainer: {
    paddingTop: 10,
    alignItems: 'center',
  },
});

@observer
export default class List extends Component {
  // Render a single card
  renderItem({item, index}) {
    const {onItemFocused} = this.props;

    const handleItemFocused = () => {
      this.flatList.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
      onItemFocused && onItemFocused();
    };

    return (
      <Observer>
        {() =>
          item.isLoading
            ? <Card key={index} isLoading={true} />
            : <Card key={item.id} onFocus={handleItemFocused} item={item} />}
      </Observer>
    );
  }

  getItemLayout(data, index) {
    return {length: EFFECTIVE_WIDTH, offset: EFFECTIVE_WIDTH * index, index};
  }

  render() {
    const {store} = this.props;

    const data = store.items.slice();

    // When the store is loading some items, we should
    // add some loading items to the data to show loading cards.
    // Note that later we should adjust the loaded amount and take
    // it from the store (using 25 atm).
    if (store.isLoading) {
      const loadingItems = Array(25)
        .fill({isLoading: true})
        .map((item, index) => ({...item, id: index + data.length}));
      data.push(...loadingItems);
    }

    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>{store.name}</Text>
        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => String(item.id)}
          getItemLayout={this.getItemLayout}
          ref={c => this.flatList = c}
          renderItem={this.renderItem.bind(this)}
        />
      </View>
    );
  }
}
