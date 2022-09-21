import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import GlobalStyle from './GlobalStyle';
import store from './store';
import Container from './components/UI/Container';
import H4 from './components/UI/H4';
import Tournaments from './components/Tournaments/Tournaments';

const App = () => {
  return (
    <Container>
      <H4>FACEIT Tournaments</H4>
      <Tournaments />
    </Container>
  );
};

const container = document.getElementById('root');
if (!container) {
  throw new Error('No container found');
}
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>
);
