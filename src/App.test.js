import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SamuraiJsApp from "./App";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SamuraiJsApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
