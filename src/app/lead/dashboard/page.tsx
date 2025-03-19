import { Users, Calendar, FileText, Clock } from "lucide-react"

export default function LeadDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Panel de Líder</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border shadow-sm p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Mi Equipo</p>
            <p className="text-3xl font-bold">12</p>
          </div>
          <Users className="h-8 w-8 text-accenture-purple" />
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Solicitudes</p>
            <p className="text-3xl font-bold">5</p>
          </div>
          <FileText className="h-8 w-8 text-accenture-purple" />
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Ausencias</p>
            <p className="text-3xl font-bold">2</p>
          </div>
          <Calendar className="h-8 w-8 text-accenture-purple" />
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Horas Extra</p>
            <p className="text-3xl font-bold">24</p>
          </div>
          <Clock className="h-8 w-8 text-accenture-purple" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="border-b p-4">
            <h3 className="text-lg font-medium">Próximas Reuniones</h3>
          </div>
          <div className="p-4">
            <ul className="space-y-4">
              {[
                { title: "Revisión de Proyecto", time: "Hoy, 14:00" },
                { title: "Entrevista Candidato", time: "Mañana, 10:30" },
                { title: "Planificación Sprint", time: "Miércoles, 09:00" },
                { title: "Revisión de Desempeño", time: "Viernes, 15:00" },
              ].map((meeting, i) => (
                <li key={i} className="flex items-center gap-4 border-b pb-4 last:border-0">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{meeting.title}</p>
                    <p className="text-sm text-gray-500">{meeting.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm">
          <div className="border-b p-4">
            <h3 className="text-lg font-medium">Estado del Equipo</h3>
          </div>
          <div className="p-4">
            <ul className="space-y-4">
              {[
                { name: "Ana García", status: "Disponible", statusColor: "bg-green-500" },
                { name: "Carlos López", status: "Reunión", statusColor: "bg-yellow-500" },
                { name: "María Rodríguez", status: "Ausente", statusColor: "bg-red-500" },
                { name: "Juan Pérez", status: "Disponible", statusColor: "bg-green-500" },
                { name: "Laura Sánchez", status: "Remoto", statusColor: "bg-blue-500" },
              ].map((member, i) => (
                <li key={i} className="flex items-center gap-4 border-b pb-4 last:border-0">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-sm font-medium">{member.name.charAt(0)}</span>
                    </div>
                    <span
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${member.statusColor} ring-2 ring-white`}
                    ></span>
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.status}</p>
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

