import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/tailwind.css"
import "./styles/custom.css"
import {BrowserRouter as Router} from 'react-router-dom';
import ViewportProvider from "@/components/providers/ViewportProvider.tsx";
import SessionProvider from "@/components/providers/SessionProvider.tsx";
import NavBar from "@/components/layout/NavBar.tsx";
import RouterView from "@/components/layout/RouterView.tsx";
import Footer from '@/components/layout/Footer.tsx';
import NavTabs from "@/components/layout/NavTabs.tsx";

const rootEl: HTMLElement|null = document.getElementById('root');
if (!rootEl) throw new Error('Root element not found: make sure an element with id="root" exists in index.html');

createRoot(rootEl).render(
    <StrictMode>
        <ViewportProvider>
            <SessionProvider>
                <Router>
                    <NavBar/>
                    <RouterView/>
                    <Footer/>
                    <NavTabs/>
                </Router>
            </SessionProvider>
        </ViewportProvider>
    </StrictMode>
);
