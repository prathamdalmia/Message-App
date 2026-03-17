import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from "@chakra-ui/react"
import { system } from './theme';
import { BrowserRouter } from 'react-router-dom'
import ChatProvider from './Context/chatProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ChatProvider>
      <ChakraProvider value={system}>
        <App />
      </ChakraProvider>
    </ChatProvider>
  </BrowserRouter>
);
