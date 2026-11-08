import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import RealEstatePage from './pages/RealEstatePage';
import ToursPage from './pages/ToursPage';
import TripsPage from './pages/TripsPage';
import ExcursionsPage from './pages/ExcursionsPage';
import AboutPage from './pages/AboutPage';
import ContactsPage from './pages/ContactsPage';
import PrivacyPage from './pages/PrivacyPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="real-estate" element={<RealEstatePage />} />
            <Route path="tours" element={<ToursPage />} />
            <Route path="trips" element={<TripsPage />} />
            <Route path="excursions" element={<ExcursionsPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
