export default function TeamPage() {
  // Sample team data
  const teamMembers = [
    { id: 1, name: "Ana García", position: "Senior Developer", email: "ana.garcia@accenture.com", status: "Active" },
    { id: 2, name: "Carlos López", position: "UX Designer", email: "carlos.lopez@accenture.com", status: "Active" },
    {
      id: 3,
      name: "María Rodríguez",
      position: "QA Engineer",
      email: "maria.rodriguez@accenture.com",
      status: "On Leave",
    },
    { id: 4, name: "Juan Pérez", position: "Backend Developer", email: "juan.perez@accenture.com", status: "Active" },
    {
      id: 5,
      name: "Laura Sánchez",
      position: "Frontend Developer",
      email: "laura.sanchez@accenture.com",
      status: "Active",
    },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Mi Equipo</h1>

      <div className="bg-white rounded-lg border shadow-sm">
        <div className="border-b p-4">
          <h3 className="text-lg font-medium">Miembros del Equipo</h3>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Nombre</th>
                  <th className="text-left py-3 px-4">Posición</th>
                  <th className="text-left py-3 px-4">Correo</th>
                  <th className="text-left py-3 px-4">Estado</th>
                  <th className="text-left py-3 px-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member) => (
                  <tr key={member.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{member.name}</td>
                    <td className="py-3 px-4">{member.position}</td>
                    <td className="py-3 px-4">{member.email}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          member.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : member.status === "On Leave"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800">Ver Perfil</button>
                        <button className="text-purple-600 hover:text-purple-800">Evaluar</button>
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

