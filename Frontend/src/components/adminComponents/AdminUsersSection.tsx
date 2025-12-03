import { useEffect, useState } from 'react';
import { useAdminEvent } from '../../context/adminContext';
import UserDetailModal from './UserDetailModal';

function AdminUsersSection() {
  const { users, getUsers, isLoading, errors } = useAdminEvent();
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const handleOpenModal = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

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
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <UserDetailModal user={selectedUser} isOpen={isModalOpen} onClose={handleCloseModal} />
      
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Gestión de Usuarios
        </h2>
        <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
          Administra todos los usuarios del sistema
        </p>
      </div>

      {isLoading && users.length === 0 ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 mx-auto mb-4" style={{ borderColor: 'var(--primary)' }} />
          <p style={{ color: 'var(--text-secondary)' }}>Cargando usuarios...</p>
        </div>
      ) : errors.length > 0 ? (
        <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(220, 38, 38, 0.2)', color: '#DC2626' }}>
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      ) : users.length === 0 ? (
        <div className="p-8 rounded-xl text-center" style={{ backgroundColor: 'var(--primary)', color: 'var(--background)' }}>
          <p className="text-lg">No hay usuarios registrados aún.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {users.map((user) => {
            const roleInfo = getRoleInfo(user.role);
            return (
              <div 
                key={user._id || user.id} 
                className="p-5 rounded-xl border-l-4 transition-all hover:shadow-lg" 
                style={{ 
                  borderColor: roleInfo.color, 
                  backgroundColor: 'var(--background)', 
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)' 
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
                        {user.username}
                      </h3>
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-semibold" 
                        style={{ 
                          backgroundColor: roleInfo.bgColor, 
                          color: roleInfo.color 
                        }}
                      >
                        {roleInfo.label}
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      {(user.name || user.lastname) && (
                        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          <strong>Nombre:</strong> {user.name && user.lastname 
                            ? `${user.name} ${user.lastname}` 
                            : user.name || user.lastname}
                        </p>
                      )}
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        <strong>Email:</strong> {user.email}
                      </p>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        <strong>Fecha de registro:</strong> {formatDate(user.createdAt)}
                      </p>
                    </div>
                  </div>
                  
                  <button 
                    className="btn-outline btn-sm"
                    onClick={() => handleOpenModal(user)}
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AdminUsersSection;