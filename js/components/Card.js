import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  LayoutAnimation,
  Image,
} from 'react-native';

const WIDTH = 300;
const HEIGHT = 250;
const focusMultiplier = 1.05;

const UNFOCUSED_STYLE = {
  width: WIDTH,
  height: HEIGHT,
  margin: 10,
  borderRadius: 10,
  overflow: 'hidden',
  backgroundColor: 'white',
};

const style = {
  unfocused: UNFOCUSED_STYLE,
  // focused: {
  //   width: WIDTH * focusMultiplier,
  //   height: HEIGHT * focusMultiplier,
  //   backgroundColor: 'BBB',
  // },
  focused: {
    ...UNFOCUSED_STYLE,
    // transform: [{scaleX: focusMultiplier}, {scaleY: focusMultiplier}],
    width: WIDTH * focusMultiplier,
    height: HEIGHT * focusMultiplier,
  },
  thumbnail: {
    height: HEIGHT * 0.8,
    // borderRadius: '10 10 0 0',
  },
  detailsView: {
    height: '100%',
    padding: 10,
  },
  title: {
    fontSize: 12,
  },
};

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
  }

  setFocus(focus) {
    LayoutAnimation.spring();
    this.setState({focused: focus});

    if (this.props.onFocus && focus) this.props.onFocus();
  }

  render() {
    const {title, author, thumbnail, url} = this.props.item;

    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.onPress && this.props.onPress()}
        onPressIn={() => this.setFocus(true)}
        onPressOut={() => this.setFocus(false)}
      >
        <View style={this.state.focused ? style.focused : style.unfocused}>
          <Image style={style.thumbnail} source={{uri: thumbnail}} />
          <View style={style.detailsView}>
            <Text style={style.title}>{title}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
