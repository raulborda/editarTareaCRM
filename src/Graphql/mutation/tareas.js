import { gql } from '@apollo/client';

export const NEW_TAREA = gql`
	mutation newTareaResolver(
		$inputTarea: tareaInput
		$idNegocio: Int
		$idUsuario: Int
		$idCliente: Int
		$inputNota: notaInput
		$inputAdjunto: uploadInput
		$idContacto: Int
	) {
		newTareaResolver(
			inputTarea: $inputTarea
			idNegocio: $idNegocio
			inputNota: $inputNota
			idUsuario: $idUsuario
			idCliente: $idCliente
			inputAdjunto: $inputAdjunto
			idContacto: $idContacto
		)
	}
`;
export const TAREA_ANCLADA = gql`
	mutation tareaAnclado($idTarea: Int, $anclado: Int) {
		tareaAncladaResolver(idTarea: $idTarea, anclado: $anclado)
	}
`;
export const UPDATE_TAREA = gql`
	mutation updateTarea($idTarea: Int, $inputTarea: tareaInput, $inputAdjunto: uploadInput, $inputNota: notaInput, $idUsuario: Int) {
		updateTareaResolver(idTarea: $idTarea, inputTarea: $inputTarea, inputAdjunto: $inputAdjunto, inputNota: $inputNota, idUsuario: $idUsuario)
	}
`;
export const UPDATE_ESTADO_TAREA = gql`
	mutation estadoTarea($idTarea: Int, $idEstado: Int) {
		estadoTareaResolver(idTarea: $idTarea, idEstado: $idEstado)
	}
`;
export const TAREA_ARCHIVADA = gql`
	mutation tareasArchivada($idTarea: Int) {
		tareaArchivadaResolver(idTarea: $idTarea)
	}
`;
