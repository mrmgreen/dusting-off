import React from 'react';
import { connect } from 'react-redux';
import App from '../components/App';

const mapStateToProps = (state) => {
  return {
    quotes: state.quotes,
  }
}

const AppContainer = connect(mapStateToProps)(App)

export default AppContainer
