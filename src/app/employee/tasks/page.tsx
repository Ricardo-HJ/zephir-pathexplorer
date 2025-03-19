export default function TasksPage() {
  // Sample tasks data
  const tasks = [
    { id: 1, title: "Completar reporte semanal", dueDate: "2023-06-15", priority: "Alta", status: "Pendiente" },
    { id: 2, title: "Actualizar documentación", dueDate: "2023-06-18", priority: "Media", status: "En progreso" },
    { id: 3, title: "Revisar código", dueDate: "2023-06-12", priority: "Baja", status: "Completado" },
    { id: 4, title: "Preparar presentación", dueDate: "2023-06-20", priority: "Alta", status: "Pendiente" },
    { id: 5, title: "Reunión con cliente", dueDate: "2023-06-16", priority: "Media", status: "Pendiente" },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Mis Tareas</h1>

      <div className="bg-white rounded-lg border shadow-sm">
        <div className="border-b p-4">
          <h3 className="text-lg font-medium">Lista de Tareas</h3>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Tarea</th>
                  <th className="text-left py-3 px-4">Fecha Límite</th>
                  <th className="text-left py-3 px-4">Prioridad</th>
                  <th className="text-left py-3 px-4">Estado</th>
                  <th className="text-left py-3 px-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{task.title}</td>
                    <td className="py-3 px-4">{task.dueDate}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          task.priority === "Alta"
                            ? "bg-red-100 text-red-800"
                            : task.priority === "Media"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          task.status === "Completado"
                            ? "bg-green-100 text-green-800"
                            : task.status === "En progreso"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800">Editar</button>
                        <button className="text-green-600 hover:text-green-800">Completar</button>
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

