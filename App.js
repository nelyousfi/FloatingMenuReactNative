import React from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import FloatingMenu from './src/Components/FloatingMenu';
import { menus } from './src/Assets/menus';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuState: 'Menu closed',
      lastClickedItem: 'No item clicked'
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <Text>Menu state: {this.state.menuState}</Text>
        <Text>Last clicked item: {this.state.lastClickedItem}</Text>
        <FloatingMenu
          menus={menus}
          primaryColor={'red'}
          secondaryColor={'#eee'}
          isDefaultOpened={true}
          closeWhenClickingOutside={true}
          onMenuOpened={() => this.setState({ menuState: 'Menu opened' })}
          onMenuClosed={() => this.setState({ menuState: 'Menu closed' })}
          onItemClicked={id => this.setState({ lastClickedItem: id })}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default App
