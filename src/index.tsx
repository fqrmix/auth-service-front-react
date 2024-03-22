import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ContextStore from './store';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const contextStore = new ContextStore();

export const Context = createContext({
  contextStore
})


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Context.Provider value={{ contextStore }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>
);

