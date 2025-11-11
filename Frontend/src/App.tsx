import {BrowserRouter, Route, Routes} from 'react-router'
import DebuggerPage from './pages/HelpDebugger.tsx'
import HomePage from './pages/Home.tsx'
import FooterComponent from './components/Footer'
import HeaderComponent from './components/Header'


function AppContent() {

  return (
    <BrowserRouter>
      <main className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--background)' }}>
      <HeaderComponent />
        <Routes>
          <Route path="/debug-page" element={<DebuggerPage />} />
          <Route path="/" element={< HomePage/>} />

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