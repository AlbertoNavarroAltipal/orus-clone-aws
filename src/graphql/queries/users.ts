export const listMaestroUsuarios = /* GraphQL */ `
  query ListMaestroUsuarios($filter: TableMaestroUsuariosFilterInput) {
    listMaestroUsuarios(filter: $filter) {
      items {
        dni
        email
        nombre_completo
        contrasena
        cargo
        estado
      }
    }
  }
`;
