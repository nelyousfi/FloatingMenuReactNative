import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import FloatingMenu from './src/Components/FloatingMenu';
import { menus } from './src/Assets/menus';

class App extends React.Component {
  render() {
    return(
      <View style={styles.container}>
        <FloatingMenu
          menus={menus}
          primaryColor={'red'}
          secondaryColor={'#eee'}
          isDefaultOpened={false}
          onMenuOpened={() => console.log('Menu opened')}
          onMenuClosed={() => console.log('Menu closed')}
          onItemClicked={id => console.log(`item ${id} clicked`)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
  }
});

export default App
