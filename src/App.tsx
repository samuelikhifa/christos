import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import { usePerformance } from './hooks/usePerformance';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';

import Events from './pages/Events';
import Connect from './pages/Connect';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiePolicy from './pages/CookiePolicy';

function App() {
  // Initialize performance optimizations
  usePerformance();

  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            {/* Skip to main content link for accessibility */}
            <a 
              href="#main-content" 
              className="skip-to-main"
              tabIndex={1}
            >
              Skip to main content
            </a>
            
            <Navbar />
            
            <main id="main-content" className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/programs" element={<Programs />} />
                
                <Route path="/events" element={<Events />} />
                <Route path="/connect" element={<Connect />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
              </Routes>
            </main>
            
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
