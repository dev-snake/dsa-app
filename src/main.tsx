// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './css/index.css';
import App from './App.tsx';
import { AppProvider } from './hooks/useAppContext.tsx';

createRoot(document.getElementById('root')!).render(
    <AppProvider>
        <App />
    </AppProvider>
);
