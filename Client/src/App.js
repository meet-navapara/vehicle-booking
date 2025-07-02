import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import StepperForm from './pages/StepperForm';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <StepperForm />
    </Provider>
  );
}

export default App;
