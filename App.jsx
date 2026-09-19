import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PredictPage from './pages/PredictPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ModelsPage from './pages/ModelsPage';
import HistoryPage from './pages/HistoryPage';
import AboutPage from './pages/AboutPage';
import { apiService } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('predict');
  const [apiStatus, setApiStatus] = useState(false);

  useEffect(() => {
    // Check backend health
    apiService.checkHealth()
      .then((res) => {
        if (res && (res.status === 'healthy' || res.status === 'initializing')) {
          setApiStatus(true);
        }
      })
      .catch(() => {
        setApiStatus(false);
      });
  }, []);

  const renderActivePage = () => {
    switch (activeTab) {
      case 'predict':
        return <PredictPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'models':
        return <ModelsPage />;
      case 'history':
        return <HistoryPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <PredictPage />;
    }
  };

  return (
    <div className="app-container">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        apiStatus={apiStatus}
      />
      <main className="main-content">
        {renderActivePage()}
      </main>
      <Footer />
    </div>
  );
}
