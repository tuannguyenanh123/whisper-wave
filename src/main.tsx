import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { SignedIn, SignedOut, ClerkProvider, RedirectToSignIn } from '@clerk/clerk-react'
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import RootLayout from './layouts/RootLayout.tsx';
import Homepage from './pages/Homepage.tsx';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      <SignedIn>
        {children}
      </SignedIn>
    </>
  )
};

const RouterComponent = () => {
  const navigate = useNavigate();
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Routes>
        <Route path='' element={<RootLayout />}>
          <Route index element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }>
          </Route>
        </Route>
      </Routes>
    </ClerkProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <BrowserRouter>
        <RouterComponent />
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>,
)

export default RouterComponent;