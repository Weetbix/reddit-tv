import React, {Component} from 'react';
import {StyleSheet, View, FlatList, Text} from 'react-native';

import {observer, Observer} from 'mobx-react';

import Card from './Card';

const styles = StyleSheet.create({
  container: {
    height: 270,
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
        {() => <Card key={item.id} onFocus={handleItemFocused} item={item} />}
      </Observer>
    );
  }

  render() {
    const {store} = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>{store.name}</Text>
        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={store.items.slice()}
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
