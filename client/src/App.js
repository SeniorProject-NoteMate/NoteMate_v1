import React from 'react';
import { ThemeProvider } from 'styled-components';


import Header from './components/Header';
import Routes from './Routes';
import GlobalStyle from './GlobalStyles';
import { dark } from './constants/theme';

const App = () => {
	return (
		<ThemeProvider theme={dark}>
			<GlobalStyle/>
			<div>
				<Header />
				<Routes />
			</div>
		</ThemeProvider>
	);
}

export default App;
