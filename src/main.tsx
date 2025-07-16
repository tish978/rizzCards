import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';
import type { ThemeConfig } from '@chakra-ui/react';
import App from './App';
import './index.css';

// Force dark mode with a romantic burgundy theme
document.documentElement.style.backgroundColor = '#1E0A1C';
document.body.style.backgroundColor = '#1E0A1C';

// Extend the theme to set dark mode as default
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

// Custom theme with romantic burgundy colors
const customTheme = extendTheme({
  config,
  colors: {
    darkBg: {
      900: '#1E0A1C', // Deep burgundy (main background)
      800: '#2D0F2A', // Rich purple (card background)
      700: '#4A1942', // Lighter burgundy (hover states)
    },
    accent: {
      500: '#FF3E89', // Pink accent
      400: '#FF69B4', // Lighter pink
    }
  },
  styles: {
    global: {
      'html, body': {
        backgroundColor: '#1E0A1C',
        color: 'white',
      },
      '#root': {
        backgroundColor: '#1E0A1C',
      }
    },
  },
});

// Set dark mode in localStorage to persist it
if (typeof window !== 'undefined') {
  localStorage.setItem('chakra-ui-color-mode', 'dark');
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode="dark" />
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
); 