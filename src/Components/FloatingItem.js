import React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Easing
} from 'react-native';

const DIMENSION = 48;
const MARGIN = 8;
const ANIMATION_DURATION = 200;
const DEFAULT_COLOR = '#ddd';

export class FloatingItem extends React.Component {
  constructor (props) {
    super(props);
    this.translateYValue = new Animated.Value(0)
  }

  componentDidMount() {
    this.translateY()
  }

  translateY() {
    this.translateYValue.setValue(0);
    Animated.timing(
      this.translateYValue,
      {
        toValue: 1,
        duration: ANIMATION_DURATION,
        easing: Easing.linear,
      }
    ).start()
  }

  getFloatingItemStyle = index => {
    const props = this.props;
    const translateYValue = this.translateYValue.interpolate({
      inputRange: [0, 1],
      outputRange: [props.marginBottom + props.parentDimension / 2, props.marginBottom + props.parentDimension + MARGIN * (index + 1) + DIMENSION * index]
    });
    return {
      backgroundColor: props.backgroundColor ? props.backgroundColor : DEFAULT_COLOR,
      bottom: translateYValue,
      right: props.marginRight + (props.parentDimension - DIMENSION) / 2,
    }
  };

  render() {
    const props = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => props.onFloatingItemClicked(props.id)}>
        <Animated.View style={[styles.floatingItem, this.getFloatingItemStyle(props.index)]}>
          {props.icon}
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  floatingItem: {
    position: 'absolute',
    width: DIMENSION,
    height: DIMENSION,
    borderRadius: DIMENSION / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
