import { useAuth } from '../../context/authContext';

function AdminPerfilSection() {
  const { user } = useAuth();

  if (!user) return null;

  const getInitials = () => {
    if (!user) return '?';
    const firstName = user.name || user.username || '';
    const lastName = user.lastname || '';
    const firstInitial = firstName ? firstName.charAt(0) : '';
    const lastInitial = lastName ? lastName.charAt(0) : '';
    return `${firstInitial}${lastInitial}`.toUpperCase() || '?';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Mi Perfil</h2>
      </div>

      <div className="p-6 sm:p-8 rounded-xl" style={{ backgroundColor: 'var(--secondary)' }}>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {user.avatar ? (
            <img src={user.avatar} alt={user.username} className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover" />
          ) : (
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center text-3xl sm:text-4xl font-bold" style={{ backgroundColor: 'var(--primary)', color: 'var(--background)' }}>
              {getInitials()}
            </div>
          )}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
              <h3 className="text-2xl font-bold" style={{ color: 'var(--background)' }}>
                {user.name || user.username} {user.lastname || ''}
              </h3>
              <span className="px-2 py-1 rounded text-xs font-semibold" style={{ backgroundColor: 'var(--primary)', color: 'var(--background)' }}>
                Admin
              </span>
            </div>
            <p className="text-sm opacity-90" style={{ color: 'var(--background)' }}>@{user.username}</p>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-xl border" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}>
        <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>Información Personal</h3>
        <form className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>Nombre</label>
              <input type="text" defaultValue={user.name || ''} disabled className="w-full px-4 py-2.5 rounded-lg border text-sm opacity-60" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
            </div>
            <div>
              <label className="block mb-2 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>Apellido</label>
              <input type="text" defaultValue={user.lastname || ''} disabled className="w-full px-4 py-2.5 rounded-lg border text-sm opacity-60" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
            </div>
          </div>
          <div>
            <label className="block mb-2 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>Username</label>
            <input type="text" defaultValue={user.username} disabled className="w-full px-4 py-2.5 rounded-lg border text-sm opacity-60" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block mb-2 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>Email</label>
            <input type="email" defaultValue={user.email} disabled className="w-full px-4 py-2.5 rounded-lg border text-sm opacity-60" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div>
            <label className="block mb-2 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>Rol</label>
            <input type="text" value={user.role} disabled className="w-full px-4 py-2.5 rounded-lg border text-sm opacity-60" style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', color: 'var(--text-primary)' }} />
          </div>
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button type="submit" disabled className="btn-primary flex-1">Guardar Cambios</button>
            <button type="button" disabled className="btn-outline flex-1">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminPerfilSection;