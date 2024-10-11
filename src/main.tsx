import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@mantine/core/styles.css';
import { ApolloProvider } from '@apollo/client';
import { MantineProvider } from '@mantine/core';
import { SignedIn, SignedOut, ClerkProvider, RedirectToSignIn } from '@clerk/clerk-react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from './layouts/RootLayout.tsx';
import Homepage from './pages/Homepage.tsx';
import CreateServerModal from './components/modals/CreateServerModal.tsx';
import client from './apolloClient.ts';

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
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Routes>
        <Route path='' element={<RootLayout />}>
          <Route index element={
            <ProtectedRoute>
              <CreateServerModal />
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
    <ApolloProvider client={client}>
      <MantineProvider defaultColorScheme="dark">
        <BrowserRouter>
          <RouterComponent />
        </BrowserRouter>
      </MantineProvider>
    </ApolloProvider>
  </StrictMode>,
)

export default RouterComponent;