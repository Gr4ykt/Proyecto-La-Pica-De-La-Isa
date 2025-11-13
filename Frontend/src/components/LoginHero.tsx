import { useState } from 'react';

function LoginHero() {
    const [isLogin, setIsLogin] = useState(true);

    const handleGoogleAuth = () => {
        console.log('Autenticación con Google');
        // Aquí irá la lógica de autenticación con Google
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(isLogin ? 'Iniciando sesión...' : 'Registrando usuario...');
        // Aquí irá la lógica de envío del formulario
    };
    return (
        <div className="w-full max-w-5xl">
        {/* Contenedor principal con dos columnas */}
        <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl">
          
          {/* Columna Izquierda - Formulario */}
          <div 
            className="p-6 sm:p-8 md:p-10 transition-colors duration-300"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            {/* Toggle entre Login y Registro */}
            <div className="flex gap-2 mb-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  isLogin ? 'scale-105' : 'opacity-70'
                }`}
                style={{
                  backgroundColor: isLogin ? 'var(--background)' : 'transparent',
                  color: isLogin ? 'var(--primary)' : 'var(--background)',
                  border: isLogin ? 'none' : '2px solid var(--background)'
                }}
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                  !isLogin ? 'scale-105' : 'opacity-70'
                }`}
                style={{
                  backgroundColor: !isLogin ? 'var(--background)' : 'transparent',
                  color: !isLogin ? 'var(--primary)' : 'var(--background)',
                  border: !isLogin ? 'none' : '2px solid var(--background)'
                }}
              >
                Registrarse
              </button>
            </div>

            {/* Formulario de Login */}
            {isLogin && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label 
                    htmlFor="login-email"
                    className="block mb-2 font-medium text-sm sm:text-base"
                    style={{ color: 'var(--background)' }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="login-email"
                    required
                    className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm sm:text-base"
                    style={{ 
                      backgroundColor: 'var(--background)',
                      color: 'var(--text-primary)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                    placeholder="tucorreo@ejemplo.com"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="login-password"
                    className="block mb-2 font-medium text-sm sm:text-base"
                    style={{ color: 'var(--background)' }}
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="login-password"
                    required
                    className="w-full px-4 py-3 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm sm:text-base"
                    style={{ 
                      backgroundColor: 'var(--background)',
                      color: 'var(--text-primary)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                    placeholder="••••••••"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm sm:text-base"
                  style={{
                    backgroundColor: 'var(--secondary)',
                    color: 'var(--background)'
                  }}
                >
                  Iniciar sesión
                </button>

                {/* Separador */}
                <div className="relative my-6">
                  <div 
                    className="absolute inset-0 flex items-center"
                  >
                    <div 
                      className="w-full border-t"
                      style={{ borderColor: 'var(--background)' }}
                    />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span 
                      className="px-4 font-medium"
                      style={{ 
                        backgroundColor: 'var(--primary)',
                        color: 'var(--background)'
                      }}
                    >
                      O continuar con
                    </span>
                  </div>
                </div>

                {/* Botón de Google */}
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  className="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-3 text-sm sm:text-base"
                  style={{
                    backgroundColor: 'var(--background)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continuar con Google
                </button>
              </form>
            )}

            {/* Formulario de Registro */}
            {!isLogin && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label 
                      htmlFor="register-nombre"
                      className="block mb-2 font-medium text-sm"
                      style={{ color: 'var(--background)' }}
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="register-nombre"
                      required
                      className="w-full px-4 py-2.5 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm"
                      style={{ 
                        backgroundColor: 'var(--background)',
                        color: 'var(--text-primary)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                      }}
                      placeholder="Juan"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="register-apellido"
                      className="block mb-2 font-medium text-sm"
                      style={{ color: 'var(--background)' }}
                    >
                      Apellido
                    </label>
                    <input
                      type="text"
                      id="register-apellido"
                      required
                      className="w-full px-4 py-2.5 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm"
                      style={{ 
                        backgroundColor: 'var(--background)',
                        color: 'var(--text-primary)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                      }}
                      placeholder="Pérez"
                    />
                  </div>
                </div>

                <div>
                  <label 
                    htmlFor="register-username"
                    className="block mb-2 font-medium text-sm"
                    style={{ color: 'var(--background)' }}
                  >
                    Nombre de usuario
                  </label>
                  <input
                    type="text"
                    id="register-username"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm"
                    style={{ 
                      backgroundColor: 'var(--background)',
                      color: 'var(--text-primary)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                    placeholder="juanperez"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="register-email"
                    className="block mb-2 font-medium text-sm"
                    style={{ color: 'var(--background)' }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="register-email"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm"
                    style={{ 
                      backgroundColor: 'var(--background)',
                      color: 'var(--text-primary)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                    placeholder="tucorreo@ejemplo.com"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="register-password"
                    className="block mb-2 font-medium text-sm"
                    style={{ color: 'var(--background)' }}
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="register-password"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm"
                    style={{ 
                      backgroundColor: 'var(--background)',
                      color: 'var(--text-primary)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="register-password-confirm"
                    className="block mb-2 font-medium text-sm"
                    style={{ color: 'var(--background)' }}
                  >
                    Repetir contraseña
                  </label>
                  <input
                    type="password"
                    id="register-password-confirm"
                    required
                    className="w-full px-4 py-2.5 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm"
                    style={{ 
                      backgroundColor: 'var(--background)',
                      color: 'var(--text-primary)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                    }}
                    placeholder="••••••••"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm sm:text-base mt-2"
                  style={{
                    backgroundColor: 'var(--secondary)',
                    color: 'var(--background)'
                  }}
                >
                  Crear cuenta
                </button>

                {/* Separador */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div 
                      className="w-full border-t"
                      style={{ borderColor: 'var(--background)' }}
                    />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span 
                      className="px-4 font-medium text-sm"
                      style={{ 
                        backgroundColor: 'var(--primary)',
                        color: 'var(--background)'
                      }}
                    >
                      O registrarse con
                    </span>
                  </div>
                </div>

                {/* Botón de Google */}
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  className="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-3 text-sm"
                  style={{
                    backgroundColor: 'var(--background)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continuar con Google
                </button>
              </form>
            )}
          </div>

          {/* Columna Derecha - Imagen */}
          <div 
            className="hidden md:block relative overflow-hidden"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1519167758481-83f29da8c313?w=800)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div 
              className="absolute inset-0 flex items-center justify-center p-8"
              style={{ 
                backgroundColor: 'rgba(122, 155, 126, 0.85)'
              }}
            >
              <div className="text-center">
                <h2 
                  className="text-3xl lg:text-4xl font-bold mb-4"
                  style={{ color: 'var(--background)' }}
                >
                  Bienvenido a<br />La pica de la Isa
                </h2>
                <p 
                  className="text-lg opacity-90"
                  style={{ color: 'var(--background)' }}
                >
                  El lugar perfecto para tus eventos especiales
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
  
  export default LoginHero;