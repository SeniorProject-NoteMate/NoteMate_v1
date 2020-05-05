import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'

import configureStore from './store';
import App from './App';
import './index.css';
import 'bulma/css/bulma.css'

ReactDOM.render((
	<Provider store={configureStore()}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
), document.getElementById('root'));


