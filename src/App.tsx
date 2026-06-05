import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import SymptomCheck from './pages/SymptomCheck';
import FindDoctors from './pages/FindDoctors';
import HealthTips from './pages/HealthTips';
import Profile from './pages/Profile';
import { AppProvider } from './contexts/AppContext';
import SplashScreen from './components/SplashScreen';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <ErrorBoundary>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="symptoms" element={<SymptomCheck />} />
              <Route path="doctors" element={<FindDoctors />} />
              <Route path="tips" element={<HealthTips />} />
              <Route path="profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
