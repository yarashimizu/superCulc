// React-Native
import React from 'react'
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native'

// redux
import { connect,Provider } from 'react-redux'
//import { store } from './redux'
// Container
import TopContainer from './src/TopContainer'
import { store } from './src/redux';

const App = () => {
  return (
    <Provider store={store}>
      <TopContainer />
    </Provider>
  );
};

export default App