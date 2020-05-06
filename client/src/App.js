import React from 'react';
import { ThemeProvider } from 'styled-components';


import Header from './components/Header';
import Routes from './Routes';
import GlobalStyle from './GlobalStyles';
import { dark, light } from './constants/theme';

const App = () => {
	return (
		<ThemeProvider theme={light}>
			<GlobalStyle/>
			<div>
				<Header />
				<Routes />
			</div>
		</ThemeProvider>
	);
}

export default App;
