import {BrowserRouter, Route, Routes} from 'react-router'
import FooterComponent from './components/Footer'
import HeaderComponent from './components/Header'

import GaleryPage from './pages/Galery.tsx'
import DebuggerPage from './pages/HelpDebugger.tsx'
import HomePage from './pages/Home.tsx'
import ContactPage from './pages/Contact.tsx'
import LoginRegisterPage from './pages/LoginRegister.tsx'
import ServicesPage from './pages/Services.tsx'
import DashboardPage from './pages/Dashboard.tsx'
import NotFoundPage from './pages/Page404.tsx'

import { AuthProvider } from './context/authContext.tsx'
import ProtectedRoute from './ProtectedRoute.tsx'

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

          {/* Rutas protegidas - Solo accesibles con autenticación */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />


          {/* RUTA 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <FooterComponent />
      </main>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App;