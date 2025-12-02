function AdminUsersSection() {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Gestión de Usuarios
          </h2>
          <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
            Administra todos los usuarios del sistema
          </p>
        </div>
  
        <div className="p-8 rounded-xl text-center" style={{ backgroundColor: 'var(--primary)', color: 'var(--background)' }}>
          <p className="text-lg">Funcionalidad de gestión de usuarios próximamente...</p>
        </div>
      </div>
    );
  }
  
  export default AdminUsersSection;