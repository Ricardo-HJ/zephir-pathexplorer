export interface User {
  idUsuario: string
  idTipoUsuario?: number
  correo: string
  profesion?: string
  nombre?: string
  apellidoP?: string
  apellidoM?: string
  fechaIngreso?: string
  telefono?: string
  intereses?: string
  descripcion?: string
  created_at?: string
  updated_at?: string
}

export interface UserInput {
  idTipoUsuario?: number
  correo: string
  contraseña: string
  profesion?: string
  nombre?: string
  apellidoP?: string
  apellidoM?: string
  fechaIngreso?: string
  telefono?: string
  intereses?: string
  descripcion?: string
}

export interface Skill {
  idSkill: number
  nombre: string
  tipo: string
}

export interface Certificado {
  idCertificado: number
  idUsuario: string
  nombre: string
  link?: string
  expedicion?: string
  caducidad?: string
}

export interface Proyecto {
  idProyecto: number
  idPeopleLead: string
  nombre: string
  descripcion?: string
  fechaInicio?: string
  fechaFin?: string
  cupoLimite?: number
  horas?: number
}

export interface UsuarioProyecto {
  idUsuarioProyecto: number
  idUsuario: string
  idProyecto: number
  rolEnProyecto?: string
  feedback?: string
  calificacion?: number
}

export interface Curso {
  idCurso: number
  idUsuario: string
  nombre: string
  descripcion?: string
  organizacion?: string
  fechaInicio?: string
  fechaFin?: string
}

