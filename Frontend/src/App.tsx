import {BrowserRouter, Route, Routes} from 'react-router'
import FooterComponent from './components/Footer'
import HeaderComponent from './components/Header'

import GaleryPage from './pages/Galery.tsx'
import DebuggerPage from './pages/HelpDebugger.tsx'
import HomePage from './pages/Home.tsx'
import ContactPage from './pages/Contact.tsx'
import LoginRegisterPage from './pages/LoginRegister.tsx'
import ServicesPage from './pages/Services.tsx'

function AppContent() {

  return (
    <BrowserRouter>
      <main className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--background)' }}>
      <HeaderComponent />
        <Routes>

          <Route path="/debug-page" element={<DebuggerPage />} />
          <Route path="/" element={< HomePage/>} />
          <Route path="/galery" element={< GaleryPage/>} />
          <Route path="/contact" element={< ContactPage/>} />
          <Route path="/login" element={< LoginRegisterPage/>} />
          <Route path="/services" element={< ServicesPage/>} />

          {/* Para usuarios Registrados (SOLO ACCESIBLES CON AUTENTICACION) */}
          
        </Routes>
        <FooterComponent />
      </main>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AppContent />
  )
}

export default App;