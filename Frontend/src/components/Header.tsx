"use client";
import { useState } from 'react';
import { useAuth } from '../context/authContext';
import ThemeToggle from '../components/ThemeToggle';
import Logo from '/Images/Icon.png'

export default function HeaderComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header 
        className="sticky top-0 z-50 transition-colors duration-300"
        style={{ 
          borderColor: 'var(--border)',
          backgroundColor: 'var(--background)'
        }}
      >
        {/* Top Bar - Logo o titulo */}
        <div className="border-b-2 p-4 sm:p-6" style={{ borderColor: 'var(--border)' }}>
          <div className="max-w-6xl mx-auto flex gap-4">
          <img src={Logo} alt="Logo" className="h-8 sm:h-10 md:h-12" />
            <h1 
              className="pt-1 text-xl sm:text-2xl md:text-3xl font-bold"
              style={{ color: 'var(--text-primary)' }}
            >
              La pica de la Isa
            </h1>
            

            <div className="flex items-center gap-3 sm:gap-4">
              {/* Botón Hamburguesa - Solo móvil */}
              <button
                onClick={toggleMenu}
                className="md:hidden relative w-10 h-10 rounded-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{
                  backgroundColor: 'var(--btn-primary-bg)',
                  color: 'var(--btn-primary-text)',
                }}
                aria-label="Abrir menú"
              >
                <div className="flex flex-col items-center justify-center w-full h-full gap-1.5">
                  <span 
                    className={`block w-5 h-0.5 transition-all duration-300 ${
                      isMenuOpen ? 'rotate-45 translate-y-2' : ''
                    }`}
                    style={{ backgroundColor: 'currentColor' }}
                  />
                  <span 
                    className={`block w-5 h-0.5 transition-all duration-300 ${
                      isMenuOpen ? 'opacity-0' : ''
                    }`}
                    style={{ backgroundColor: 'currentColor' }}
                  />
                  <span 
                    className={`block w-5 h-0.5 transition-all duration-300 ${
                      isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                    }`}
                    style={{ backgroundColor: 'currentColor' }}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Navbar Desktop - Siempre visible en desktop */}
        <nav className="hidden md:block">
          <div className="max-w-6xl mx-auto px-6">
            <ul className="flex items-center gap-8 py-4">
              <li>
                <a 
                  href="/"
                  className="font-medium transition-all duration-300 hover:translate-y-[-2px]"
                  style={{ color: 'var(--link-default)' }}
                >
                  Inicio
                </a>
              </li>
              <li>
                <a 
                  href="/galery"
                  className="font-medium transition-all duration-300 hover:translate-y-[-2px]"
                  style={{ color: 'var(--link-default)' }}
                >
                  Galería
                </a>
              </li>
              <li>
                <a 
                  href="/contact"
                  className="font-medium transition-all duration-300 hover:translate-y-[-2px]"
                  style={{ color: 'var(--link-default)' }}
                >
                  Contacto
                </a>
              </li>
              <li className="ml-auto flex items-center gap-3">
                {isAuthenticated ? (
                  <a href="/dashboard">
                    <button className="btn-primary btn-sm flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Mi Perfil
                    </button>
                  </a>
                ) : (
                  <a href="/login">
                    <button className="btn-primary btn-sm">
                      Iniciar Sesión
                    </button>
                  </a>
                )}
              </li>
              <ThemeToggle />
            </ul>
          </div>
        </nav>

        {/* Navbar Mobile - Desplegable */}
        <nav 
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 pb-4">
            <ul className="space-y-1">
              <li>
                <a 
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 px-4 rounded-lg font-medium transition-all duration-300"
                  style={{ 
                    color: 'var(--text-primary)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--btn-secondary-bg)';
                    e.currentTarget.style.color = 'var(--btn-secondary-text)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                >
                  Inicio
                </a>
              </li>
              <li>
                <a 
                  href="/galery"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 px-4 rounded-lg font-medium transition-all duration-300"
                  style={{ 
                    color: 'var(--text-primary)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--btn-secondary-bg)';
                    e.currentTarget.style.color = 'var(--btn-secondary-text)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                >
                  Galería
                </a>
              </li>
              <li>
                <a 
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-3 px-4 rounded-lg font-medium transition-all duration-300"
                  style={{ 
                    color: 'var(--text-primary)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--btn-secondary-bg)';
                    e.currentTarget.style.color = 'var(--btn-secondary-text)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                >
                  Contacto
                </a>
              </li>
              <li className="pt-2 flex items-center gap-3">
                {isAuthenticated ? (
                  <a href="/dashboard" className="flex-1">
                    <button 
                      className="btn-primary w-full flex items-center justify-center gap-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Mi Perfil
                    </button>
                  </a>
                ) : (
                  <a href="/login" className="flex-1">
                    <button 
                      className="btn-primary w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Iniciar Sesión
                    </button>
                  </a>
                )}
                <ThemeToggle />
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}