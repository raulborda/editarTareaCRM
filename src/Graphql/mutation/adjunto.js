import { gql } from '@apollo/client';

export const NEW_ADJUNTO = gql`
	mutation newUploadResolver($input: uploadInput, $idNegocio: Int) {
		newUploadResolver(input: $input, idNegocio: $idNegocio)
	}
`;
export const ADJUNTO_ANCLADO = gql`
	mutation uploadAnclado($idUpload: Int, $anclado: Int) {
		uploadAncladoResolver(idUpload: $idUpload, anclado: $anclado)
	}
`;
export const ADJUNTO_ARCHIVADO = gql`
	mutation uploadArchivado($idUpload: Int, $origin: String) {
		uploadArchivadoResolver(idUpload: $idUpload, origin: $origin)
	}
`;
