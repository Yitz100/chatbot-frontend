import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import TrainBot from './pages/TrainBot';
import Customize from './pages/Customize';
import Deploy from './pages/Deploy';
import SignInPage from './pages/SignInPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public sign-in route */}
        <Route path="/sign-in/*" element={<SignInPage />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="train" element={<TrainBot />} />
          <Route path="customize" element={<Customize />} />
          <Route path="deploy" element={<Deploy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
