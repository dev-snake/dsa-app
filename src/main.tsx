// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProvider } from './context/useAppContext.tsx';
import { AppRouter } from './routes/index.tsx';
import './css/index.css';
import './css/App.css'
createRoot(document.getElementById('root')!).render(
    <AppProvider>
        <AppRouter />
    </AppProvider>
);
