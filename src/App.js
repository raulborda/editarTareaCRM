// Antd design
import React from 'react';
import './less/antd.less';
import './scss/styles.scss';
import Layout from './components/layout/Layout';
import { ApolloProvider } from '@apollo/client';
import Client from './config/apolloClientConfig';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import esES from 'antd/lib/locale/es_ES';
import 'moment/locale/es';

const App = () => {
	return (
		<ApolloProvider client={Client}>
			<ConfigProvider locale={esES}>
				<Router>
					<Switch>
						<Route path="/">
							<Layout></Layout>;
						</Route>
					</Switch>
				</Router>
			</ConfigProvider>
		</ApolloProvider>
	);
};

export default App;
