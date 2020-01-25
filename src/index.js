import React, { Component } from 'react';
import AppScreen from './router';
import { Provider } from 'react-redux';
import Sugar from 'sugar';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import FilesystemStorage from 'redux-persist-filesystem-storage'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from "redux-persist/integration/react";

const persistConfig = {
  key: 'root',
  storage: FilesystemStorage,
  whitelist: ['albums', 'gallery']
};
const persistedReducer = persistReducer(persistConfig, reducer);
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(persistedReducer);
let persistor = persistStore(store);
console.log('persistor', persistor);

Sugar.extend();
export default class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}  >
        <PersistGate loading={null} persistor={persistor}>
          <AppScreen />
        </PersistGate>
      </Provider >

    )
  }
}
