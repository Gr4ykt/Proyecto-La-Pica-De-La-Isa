interface UserDetailModalProps {
    user: any;
    isOpen: boolean;
    onClose: () => void;
  }
  
  function UserDetailModal({ user, isOpen, onClose }: UserDetailModalProps) {
    if (!isOpen || !user) return null;
  
    const getRoleInfo = (role?: string) => {
      const roleMap: Record<string, { label: string; color: string; bgColor: string }> = {
        admin: { label: 'Administrador', color: '#E5B097', bgColor: 'rgba(229, 176, 151, 0.2)' },
        Client: { label: 'Cliente', color: 'var(--secondary)', bgColor: 'rgba(122, 155, 126, 0.2)' },
        user: { label: 'Usuario', color: 'var(--secondary)', bgColor: 'rgba(122, 155, 126, 0.2)' }
      };
      return roleMap[role || 'user'] || roleMap.user;
    };
  
    const formatDate = (date?: string) => {
      if (!date) return 'N/A';
      return new Date(date).toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };
  
    const getInitials = () => {
      const firstName = user.name || user.username || '';
      const lastName = user.lastname || '';
      const firstInitial = firstName ? firstName.charAt(0) : '';
      const lastInitial = lastName ? lastName.charAt(0) : '';
      return `${firstInitial}${lastInitial}`.toUpperCase() || '?';
    };
  
    const roleInfo = getRoleInfo(user.role);
  
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        onClick={onClose}
      >
        <div 
          className="w-full max-w-2xl rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto"
          style={{ backgroundColor: 'var(--background)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div 
            className="p-6 border-b flex items-center justify-between"
            style={{ borderColor: 'var(--border)' }}
          >
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              Detalles del Usuario
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:opacity-70 transition-opacity"
              style={{ color: 'var(--text-primary)' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
  
          {/* Body */}
          <div className="p-6 space-y-6">
            {/* Avatar y Info Principal */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-xl" style={{ backgroundColor: 'var(--primary)' }}>
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
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                  <h3 className="text-2xl font-bold" style={{ color: 'var(--background)' }}>
                    {user.username}
                  </h3>
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-semibold" 
                    style={{ 
                      backgroundColor: roleInfo.bgColor, 
                      color: roleInfo.color,
                      border: `1px solid ${roleInfo.color}`
                    }}
                  >
                    {roleInfo.label}
                  </span>
                </div>
                {(user.name || user.lastname) && (
                  <p className="text-lg opacity-90 mb-2" style={{ color: 'var(--background)' }}>
                    {user.name} {user.lastname}
                  </p>
                )}
                <p className="text-sm opacity-75" style={{ color: 'var(--background)' }}>
                  {user.email}
                </p>
              </div>
            </div>
  
            {/* Información Detallada */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                Información de la Cuenta
              </h3>
  
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--card-bg)' }}>
                  <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                    ID de Usuario
                  </p>
                  <p className="text-sm font-mono" style={{ color: 'var(--text-primary)' }}>
                    {user._id || user.id}
                  </p>
                </div>
  
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--card-bg)' }}>
                  <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                    Username
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                    {user.username}
                  </p>
                </div>
  
                {user.name && (
                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--card-bg)' }}>
                    <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                      Nombre
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                      {user.name}
                    </p>
                  </div>
                )}
  
                {user.lastname && (
                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--card-bg)' }}>
                    <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                      Apellido
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                      {user.lastname}
                    </p>
                  </div>
                )}
  
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--card-bg)' }}>
                  <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                    Email
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                    {user.email}
                  </p>
                </div>
  
                <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--card-bg)' }}>
                  <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                    Rol
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                    {roleInfo.label}
                  </p>
                </div>
  
                {user.googleId && (
                  <div className="p-4 rounded-lg sm:col-span-2" style={{ backgroundColor: 'var(--card-bg)' }}>
                    <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                      Google ID
                    </p>
                    <p className="text-sm font-mono" style={{ color: 'var(--text-primary)' }}>
                      {user.googleId}
                    </p>
                  </div>
                )}
              </div>
            </div>
  
            {/* Fechas */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                Actividad
              </h3>
  
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border-l-4" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--secondary)' }}>
                  <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                    Fecha de Registro
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                    {formatDate(user.createdAt)}
                  </p>
                </div>
  
                <div className="p-4 rounded-lg border-l-4" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--primary)' }}>
                  <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                    Última Actualización
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                    {formatDate(user.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
  
          {/* Footer */}
          <div 
            className="p-6 border-t flex justify-end"
            style={{ borderColor: 'var(--border)' }}
          >
            <button 
              onClick={onClose}
              className="btn-primary"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default UserDetailModal;