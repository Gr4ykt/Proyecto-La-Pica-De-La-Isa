import { useState, useEffect } from 'react';
import { useAuth } from '../../context/authContext';

function ClientPerfilSection() {
  const { user, updateUser, getProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Cargar el perfil al montar el componente para asegurar que tenemos el user._id
  useEffect(() => {
    const userId = user?._id || user?.id;
    
    if (!userId) {
      console.log('ClientPerfilSection - No hay ID, cargando perfil...');
      getProfile();
    }
  }, []);

  if (!user) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 mx-auto mb-4" style={{ borderColor: 'var(--primary)' }} />
        <p style={{ color: 'var(--text-secondary)' }}>Cargando perfil...</p>
      </div>
    );
  }

  // Obtener iniciales
  const getInitials = () => {
    const firstName = user.name || user.username || '';
    const lastName = user.lastname || '';
    const firstInitial = firstName ? firstName.charAt(0) : '';
    const lastInitial = lastName ? lastName.charAt(0) : '';
    return `${firstInitial}${lastInitial}`.toUpperCase() || '?';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validar que tengamos el ID del usuario (soporta tanto _id como id)
    const userId = user?._id || user?.id;
    
    if (!userId) {
      setErrorMsg("Error: No se puede identificar al usuario. Intenta recargar la página.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name") as string,
      lastname: formData.get("lastname") as string,
      username: formData.get("username") as string,
      email: formData.get("email") as string,
    };

    console.log('Datos a enviar:', data);
    console.log('ID del usuario:', userId);

    try {
      const result = await updateUser(userId, data);
      
      if (result) {
        setSuccessMsg("✔️ Perfil actualizado correctamente");
        // Recargar el perfil para asegurar que tenemos los datos más recientes
        await getProfile();
      } else {
        setErrorMsg("No se pudo actualizar el perfil");
      }
    } catch (err: any) {
      console.error('Error al actualizar:', err);
      setErrorMsg(err.message || "Error al actualizar el perfil");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSuccessMsg("");
        setErrorMsg("");
      }, 4000);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Mi Perfil
        </h2>
        <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
          Actualiza tu información personal
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-xl" style={{ backgroundColor: 'var(--primary)' }}>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.username}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
            />
          ) : (
            <div
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center text-3xl sm:text-4xl font-bold"
              style={{ backgroundColor: 'var(--secondary)', color: 'var(--background)' }}
            >
              {getInitials()}
            </div>
          )}
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-2xl font-bold mb-1" style={{ color: 'var(--background)' }}>
              {user.name || user.username} {user.lastname || ''}
            </h3>
            <p className="text-sm opacity-90 mb-3" style={{ color: 'var(--background)' }}>
              @{user.username}
            </p>
            <p className="text-xs opacity-75" style={{ color: 'var(--background)' }}>
              {user.email}
            </p>
          </div>
        </div>
      </div>

      <div
        className="p-6 sm:p-8 rounded-xl border"
        style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
      >
        <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
          Información Personal
        </h3>

        {/* Mensajes */}
        {successMsg && (
          <div className="mb-4 p-4 rounded-lg text-sm font-medium" style={{ backgroundColor: 'rgba(122, 155, 126, 0.2)', color: 'var(--secondary)' }}>
            {successMsg}
          </div>
        )}

        {errorMsg && (
          <div className="mb-4 p-4 rounded-lg text-sm font-medium" style={{ backgroundColor: 'rgba(220, 38, 38, 0.2)', color: '#DC2626' }}>
            {errorMsg}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                Nombre
              </label>
              <input
                name="name"
                type="text"
                key={`name-${user._id || user.id}`}
                defaultValue={user.name || ''}
                className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2"
                style={{ 
                  backgroundColor: 'var(--background)', 
                  borderColor: 'var(--border)', 
                  color: 'var(--text-primary)',
                }}
                placeholder="Ingresa tu nombre"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                Apellido
              </label>
              <input
                name="lastname"
                type="text"
                key={`lastname-${user._id || user.id}`}
                defaultValue={user.lastname || ''}
                className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2"
                style={{ 
                  backgroundColor: 'var(--background)', 
                  borderColor: 'var(--border)', 
                  color: 'var(--text-primary)',
                }}
                placeholder="Ingresa tu apellido"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
              Username
            </label>
            <input
              name="username"
              type="text"
              key={`username-${user._id || user.id}`}
              defaultValue={user.username}
              required
              className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: 'var(--background)', 
                borderColor: 'var(--border)', 
                color: 'var(--text-primary)',
              }}
              placeholder="Ingresa tu username"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
              Email
            </label>
            <input
              name="email"
              type="email"
              key={`email-${user._id || user.id}`}
              defaultValue={user.email}
              required
              className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: 'var(--background)', 
                borderColor: 'var(--border)', 
                color: 'var(--text-primary)',
              }}
              placeholder="Ingresa tu email"
            />
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button 
              type="submit" 
              className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed" 
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>

            <button 
              type="button" 
              className="btn-outline flex-1" 
              onClick={() => {
                setSuccessMsg("");
                setErrorMsg("");
                window.location.reload();
              }}
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClientPerfilSection;