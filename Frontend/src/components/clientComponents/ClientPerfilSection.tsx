import { useState } from 'react';
import { useAuth } from '../../context/authContext';

function ClientPerfilSection() {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (!user) return null;

  // Obtener iniciales
  const getInitials = () => {
    const firstName = user.name || user.username || '';
    const lastName = user.lastname || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || '?';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

    try {
      // ← PASAMOS EL user._id al llamar updateUser
      await updateUser(user._id, data);
      setSuccessMsg("Datos actualizados correctamente ✔️");
    } catch (err: any) {
      setErrorMsg(err.message || "Error al actualizar");
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
          <div className="p-3 rounded-lg text-green-700 bg-green-100 border border-green-300 text-sm">
            {successMsg}
          </div>
        )}

        {errorMsg && (
          <div className="p-3 rounded-lg text-red-700 bg-red-100 border border-red-300 text-sm">
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
                defaultValue={user.name || ''}
                className="w-full px-4 py-2.5 rounded-lg border text-sm"
                style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
                Apellido
              </label>
              <input
                name="lastname"
                type="text"
                defaultValue={user.lastname || ''}
                className="w-full px-4 py-2.5 rounded-lg border text-sm"
                style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
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
              defaultValue={user.username}
              className="w-full px-4 py-2.5 rounded-lg border text-sm"
              style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>
              Email
            </label>
            <input
              name="email"
              type="email"
              defaultValue={user.email}
              className="w-full px-4 py-2.5 rounded-lg border text-sm"
              style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--text-primary)' }}
            />
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button type="submit" className="btn-primary flex-1" disabled={loading}>
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>

            <button type="button" className="btn-outline flex-1" onClick={() => window.location.reload()}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClientPerfilSection;
