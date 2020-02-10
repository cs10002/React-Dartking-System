import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// create-react-app step2
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
