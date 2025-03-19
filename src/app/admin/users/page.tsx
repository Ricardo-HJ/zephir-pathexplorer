export default function UsersPage() {
  // Sample user data
  const users = [
    { id: 1, name: "Ana García", email: "ana.garcia@accenture.com", role: "Lead", department: "IT" },
    { id: 2, name: "Carlos López", email: "carlos.lopez@accenture.com", role: "Employee", department: "HR" },
    { id: 3, name: "María Rodríguez", email: "maria.rodriguez@accenture.com", role: "Employee", department: "Finance" },
    { id: 4, name: "Juan Pérez", email: "juan.perez@accenture.com", role: "Lead", department: "Marketing" },
    { id: 5, name: "Laura Sánchez", email: "laura.sanchez@accenture.com", role: "Employee", department: "IT" },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Gestión de Usuarios</h1>

      <div className="bg-white rounded-lg border shadow-sm">
        <div className="border-b p-4">
          <h3 className="text-lg font-medium">Usuarios del Sistema</h3>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Nombre</th>
                  <th className="text-left py-3 px-4">Correo</th>
                  <th className="text-left py-3 px-4">Rol</th>
                  <th className="text-left py-3 px-4">Departamento</th>
                  <th className="text-left py-3 px-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.role}</td>
                    <td className="py-3 px-4">{user.department}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800">Editar</button>
                        <button className="text-red-600 hover:text-red-800">Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

