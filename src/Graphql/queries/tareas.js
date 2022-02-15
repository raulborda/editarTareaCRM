import { gql } from '@apollo/client';

export const GET_TAREA_ID = gql`
	query getTareaByIdResolver($idTarea: Int) {
		getTareaByIdResolver(idTarea: $idTarea)
	}
`;
