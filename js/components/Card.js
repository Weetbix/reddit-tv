import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  LayoutAnimation,
} from 'react-native';

const style = {
  unfocused: {
    width: 100,
    height: 100,
    margin: 10,
    backgroundColor: 'white',
  },
  focused: {
    width: 105,
    height: 105,
    backgroundColor: 'BBB',
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
    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.onPress && this.props.onPress()}
        onPressIn={() => this.setFocus(true)}
        onPressOut={() => this.setFocus(false)}
      >
        <View style={this.state.focused ? style.focused : style.unfocused}>
          <Text>Blah</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
