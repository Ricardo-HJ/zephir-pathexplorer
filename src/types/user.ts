export interface User {
    idUsuario: string
    tipoUsuario: string
    correo: string
    profesion?: string
    nombre?: string
    apellidoP?: string
    apellidoM?: string
    fechaIngreso?: Date
    telefono?: string
    intereses?: string
    descripcion?: string
    created_at?: string
  }
  
  export interface UserInput {
    tipoUsuario: string
    correo: string
    contraseña: string
    profesion?: string
    nombre?: string
    apellidoP?: string
    apellidoM?: string
    fechaIngreso?: Date
    telefono?: string
    intereses?: string
    descripcion?: string
  }
  
  