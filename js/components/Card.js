import moment from 'moment';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  LayoutAnimation,
  Image,
} from 'react-native';

const WIDTH = 250;
const HEIGHT = 250;
const MARGIN = 10;
export const EFFECTIVE_WIDTH = WIDTH + MARGIN * 2;

const focusMultiplier = 1.1;
const UNFOCUSED_STYLE = {
  width: WIDTH,
  height: HEIGHT,
  margin: MARGIN,
  alignItems: 'center',
  paddingTop: 1,
  borderRadius: 0,
};

const style = {
  unfocused: UNFOCUSED_STYLE,
  focused: {
    ...UNFOCUSED_STYLE,
    transform: [{scaleX: focusMultiplier}, {scaleY: focusMultiplier}],

    // Correctly align the images when in hover mode
    marginTop: 20,
    // width: WIDTH * focusMultiplier,
    // height: HEIGHT * focusMultiplier,
  },
  thumbnail: {
    height: HEIGHT * (9 / 16) - 3,
    width: WIDTH - 2,
    backgroundColor: 'black',
  },
  detailsView: {
    height: '100%',
    padding: 4,
    width: '100%',
  },
  detailsViewTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 14,
  },
  title: {
    fontSize: 11,
    color: '#DDD',
    fontFamily: 'sans-serif-thin',
  },
  titleFocused: {
    fontSize: 11,
    color: '#DDD',
    fontFamily: 'sans-serif',
  },
  subtitle: {
    fontSize: 9,
    color: '#888',
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
    const {title, author, thumbnail, url, created_unix} = this.props.item;

    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.onPress && this.props.onPress()}
        onPressIn={() => this.setFocus(true)}
        onPressOut={() => this.setFocus(false)}
      >
        <View style={this.state.focused ? style.focused : style.unfocused}>
          <Image style={style.thumbnail} source={{uri: thumbnail}} />
          <View style={style.detailsView}>
            <Text style={this.state.focused ? style.titleFocused : style.title}>
              {title}
            </Text>

            {this.state.focused &&
              <View style={style.detailsViewTop}>
                <Text style={style.subtitle}>{author}</Text>
                <Text style={style.subtitle}>
                  {moment.unix(created_unix).fromNow()}
                </Text>
              </View>}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
