import React from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from 'react-native';
import { withStateMachine, State } from 'react-automata'
import { FloatingItem } from './FloatingItem';
import { floatingMenuMachine } from '../StateCharts';

const MARGIN_RIGHT = 16;
const MARGIN_BOTTOM = 16;
const DIMENSION = 64;
const DEFAULT_COLOR = 'orange';
const ICON_DIMENSION = 26;
const ANIMATION_DURATION = 100;


class FloatingMenu extends React.Component {
  constructor(props) {
    super(props);
    if (props.isDefaultOpened) this.props.transition('TOGGLE');
    this.rotateValue = new Animated.Value(0)
  }

  rotateIcon() {
    this.rotateValue.setValue(0);
    Animated.timing(
      this.rotateValue,
      {
        toValue: 1,
        duration: ANIMATION_DURATION,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start()
  }

  toggleFloatingMenu = () => {
    this.props.transition('TOGGLE')
  };

  componentDidTransition = () => {
    const state = this.props.machineState.value;
    switch (state) {
      case ('opened'): {
        if (this.props.onMenuOpened) this.props.onMenuOpened();
        break;
      }
      case ('closed'): {
        if (this.props.onMenuClosed) this.props.onMenuClosed();
        break;
      }
    }
  };

  onFloatingItemClicked = (obj) => {
    this.props.onItemClicked(obj.id)
  };

  renderFloatingItems = () => (
    <State is='opened'>
      {this.props.menus.map((menu, index) => (
        <FloatingItem
          key={`item-${index}`}
          index={index}
          id={menu.id}
          icon={menu.icon}
          onFloatingItemClicked={id => this.props.transition('FLOATING_ITEM_CLICKED', { id })}
          backgroundColor={this.props.secondaryColor}
          marginBottom={MARGIN_BOTTOM}
          marginRight={MARGIN_RIGHT}
          parentDimension={DIMENSION}
        />
      ))}
    </State>
  );

  getPrimaryButtonStyle = () => ({
    backgroundColor: this.props.primaryColor ? this.props.primaryColor : DEFAULT_COLOR
  });

  getPrimaryIconAnimationStyle = () => {
    const rotateValue = this.rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: this.props.machineState.value === 'opened'
        ? ['0deg', '45deg'] : ['45deg', '0deg']
    });
    return {
      transform: [{
        rotate: rotateValue,
      }],
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderFloatingItems()}
        <TouchableWithoutFeedback onPress={this.toggleFloatingMenu}>
          <View style={[styles.primaryButton, this.getPrimaryButtonStyle()]}>
            <Animated.Image
              style={[styles.primaryIcon, this.getPrimaryIconAnimationStyle()]}
              source={require('../Images/add.png')}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  },
  primaryButton: {
    position: 'absolute',
    right: MARGIN_RIGHT,
    bottom: MARGIN_BOTTOM,
    width: DIMENSION,
    height: DIMENSION,
    borderRadius: DIMENSION / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryIcon: {
    width: ICON_DIMENSION,
    height: ICON_DIMENSION,
  },
});

export default withStateMachine(floatingMenuMachine)(FloatingMenu)
