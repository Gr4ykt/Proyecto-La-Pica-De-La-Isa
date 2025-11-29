import { BrowserRouter, Route, Routes, useLocation } from 'react-router'
import FooterComponent from './components/Footer'
import HeaderComponent from './components/Header'

import GaleryPage from './pages/Galery.tsx'
import HomePage from './pages/Home.tsx'
import ContactPage from './pages/Contact.tsx'
import LoginRegisterPage from './pages/LoginRegister.tsx'
import DashboardPage from './pages/Dashboard.tsx'
import NotFoundPage from './pages/Page404.tsx'

import { AuthProvider } from './context/authContext.tsx'
import { EventProvider } from './context/eventContext.tsx'
import ProtectedRoute from './ProtectedRoute.tsx'

function AppContent() {
  const location = useLocation()

  // rutas donde NO quieres mostrar el Header
  const hideHeaderRoutesDashboard = ["/dashboard"]
  const hideHeaderRoutesFooter = ["/dashboard"]

  const shouldHideHeader = hideHeaderRoutesDashboard.includes(location.pathname)
  const shouldHideHeaderFooter = hideHeaderRoutesDashboard.includes(location.pathname)

  return (
    <main 
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--background)' }}
    >

      {/* Mostrar Header solo si no estamos en dashboard */}
      {!shouldHideHeader && <HeaderComponent />}

      {/* <Route path="/debug-page" element={<DebuggerPage />} /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/galery" element={<GaleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginRegisterPage />} />
        <Route path="/*" element={<NotFoundPage />} />

        {/* Rutas protegidas */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!shouldHideHeader && <FooterComponent />}
    </main>
  )
}

function App() {
  return (
    <AuthProvider>
      <EventProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </EventProvider>
    </AuthProvider>
  )
}

export default App
