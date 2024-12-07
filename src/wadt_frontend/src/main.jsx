import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import './index.scss';

const theme = extendTheme({
    colors: {
        primary: '#800020',
        secondary: '#C0C0C0',
        light: '#F5F5F5',
        dark: '#333333',
        info: '#4682B4',
        success: '#228B22',
        warning: '#DAA520',
        danger: '#DC143C'
    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider>
    </React.StrictMode>
);