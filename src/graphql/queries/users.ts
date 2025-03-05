// export const listMaestroUsuarios = /* GraphQL */ `
//   query ListMaestroUsuarios($filter: TableMaestroUsuariosFilterInput) {
//     listMaestroUsuarios(filter: $filter) {
//       items {
//         dni
//         email
//         nombre_completo
//         contrasena
//         cargo
//         estado
//       }
//     }
//   }
// `;

// src/graphql/queries/users.ts
import { gql } from "@aws-amplify/api";

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: AWSEmail!) {
    getMaestroUsuariosByEmail(email: $email) {
      verificacion_correo
      sitio
      numero_contacto
      nombre_completo
      id_zona_ventas
      gerencia
      genero
      foto_perfil
      fecha_nacimiento
      fecha_creacion
      fecha_actualizacion
      estado
      email
      dni
      contrasena
      codigo_cedi
      cargo
      canal
    }
  }
`;
