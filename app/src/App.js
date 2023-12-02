/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Routs from './routes';

import { Provider } from 'react-redux';
import Store from './store';
import { Provider as PaperProvider } from 'react-native-paper';
import GlobalThemeProvider from './contextProviders/globalThemeProvider';
import ErrorBoundary from 'react-native-error-boundary';
import ErrorHandeler from './views/errorHandeler';
import SplashScreen from 'react-native-splash-screen';

if (__DEV__) {
  import('./reactotronConfig').then(() => console.log('Reactotron Configured'));
}

const App = () => {

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={Store}>
      <GlobalThemeProvider>
        <PaperProvider >
          <ErrorBoundary FallbackComponent={ErrorHandeler}>
            <Routs />
          </ErrorBoundary>
        </PaperProvider>
      </GlobalThemeProvider>
    </Provider>
  )
};

export default App;
