import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; /* 폰트 설정1*/

/* 폰트설정 2*/
const theme = createMuiTheme({
    typography: {
    fontFamily: '"Noto Sans KR", serif',
    },
});
    

// create-react-app step2
//폰트설정
ReactDOM.render(<MuiThemeProvider theme={theme}><App /></MuiThemeProvider>, document.getElementById('root'));
serviceWorker.unregister();
