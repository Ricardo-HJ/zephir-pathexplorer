import { Calendar, Clock, FileText, Award } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Mi Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border shadow-sm p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Días Vacaciones</p>
            <p className="text-3xl font-bold">15</p>
          </div>
          <Calendar className="h-8 w-8 text-accenture-purple" />
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Horas Trabajadas</p>
            <p className="text-3xl font-bold">32</p>
          </div>
          <Clock className="h-8 w-8 text-accenture-purple" />
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Solicitudes</p>
            <p className="text-3xl font-bold">2</p>
          </div>
          <FileText className="h-8 w-8 text-accenture-purple" />
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Reconocimientos</p>
            <p className="text-3xl font-bold">3</p>
          </div>
          <Award className="h-8 w-8 text-accenture-purple" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="border-b p-4">
            <h3 className="text-lg font-medium">Próximos Eventos</h3>
          </div>
          <div className="p-4">
            <ul className="space-y-4">
              {[
                { title: "Reunión de Equipo", time: "Hoy, 15:00" },
                { title: "Capacitación", time: "Mañana, 10:00" },
                { title: "Entrega de Proyecto", time: "Viernes, 12:00" },
                { title: "Evaluación Trimestral", time: "Próxima semana" },
              ].map((event, i) => (
                <li key={i} className="flex items-center gap-4 border-b pb-4 last:border-0">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-gray-500">{event.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm">
          <div className="border-b p-4">
            <h3 className="text-lg font-medium">Mis Tareas</h3>
          </div>
          <div className="p-4">
            <ul className="space-y-4">
              {[
                { title: "Completar reporte semanal", status: "Pendiente" },
                { title: "Actualizar documentación", status: "En progreso" },
                { title: "Revisar código", status: "Completado" },
                { title: "Preparar presentación", status: "Pendiente" },
              ].map((task, i) => (
                <li key={i} className="flex items-center gap-4 border-b pb-4 last:border-0">
                  <input
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300"
                    checked={task.status === "Completado"}
                    readOnly
                  />
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-gray-500">{task.status}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

