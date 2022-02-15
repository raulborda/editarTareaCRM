import { gql } from '@apollo/client';

export const GET_TIPO_TAREA = gql`
	query getTiposTareaResolver($idCategoria: Int) {
		getTiposTareaResolver(idCategoria: $idCategoria) {
			tip_id
			tip_desc
		}
	}
`;

export const GET_PORCENTAJES_TIPO_TAREA = gql`
	query tiposTareasCantidad($idNegocio: Int) {
		tiposTareasCantidadResolver(idNegocio: $idNegocio) {
			tip_id
			tip_desc
			cantidadTipoTarea
			porcentajeTipoTarea
		}
	}
`;
