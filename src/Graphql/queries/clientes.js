import { gql } from '@apollo/client';

export const GET_CLIENTES = gql`
	query getClientes {
		getClientesResolver {
			cli_id
			cli_nombre
			cli_idsistema
		}
	}
`;

export const GET_CLIENTES_LIMITADO = gql`
	query getClientesLimit($input: String) {
		getClientesLimitResolver(input: $input) {
			cli_nombre
			cli_id
			cli_idsistema
		}
	}
`;

export const GET_CONTACTOS = gql`
	query getContactos($id: Int) {
		getContactosResolver(id: $id) {
			con_id
			con_nombre
		}
	}
`;

export const GET_MONEDAS = gql`
	query getMonedas {
		getMonedasResolver {
			mon_id
			mon_divisa
			mon_pais
			mon_iso
			mon_codigo
		}
	}
`;
