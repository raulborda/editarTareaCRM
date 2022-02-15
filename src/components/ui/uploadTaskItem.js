import { PaperClipOutlined, UserOutlined, DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { Popconfirm, Button } from 'antd';
import moment from 'moment';

import React, { Fragment } from 'react';
import { ADJUNTO_ARCHIVADO } from '../../Graphql/mutation/adjunto';
import { IconFile } from '../../utils/iconFiles';
import { formatSize } from '../../utils/calculeSizeFile';
import './uploadTaskItem.scss';

const UploadTaskItem = ({ upload, attached, deleteItem }) => {
	//
	const { up_detalle, up_fechaupload, up_filename, up_id, up_mimetype, up_size, usu_nombre } = upload;

	const [uploadArchivadoResolver] = useMutation(ADJUNTO_ARCHIVADO);

	const onArchive = (id) => {
		deleteItem(id);
		// mutation para archivar archivo.
		uploadArchivadoResolver({ variables: { idUpload: id, origin: 'task' } });
	};
	return (
		<Fragment>
			{upload && (
				<div className={!attached ? `file_wrapper ` : `file_wrapper  attached`}>
					<div className="file_icon">{IconFile(up_mimetype)}</div>
					<div className="file_content">
						<div className="upload_header">
							<Button type="link" className="filename" href="#">
								{up_filename}
							</Button>

							{!attached && (
								<Fragment>
									<div className="upload_buttons_wrapper">
										<Popconfirm
											style={{ width: 200 }}
											title="¿Deseas eliminar este archivo?"
											okText="Borrar"
											cancelText="Cerrar"
											onConfirm={() => onArchive(up_id)}
											placement="left"
										>
											<div
												style={{
													display: 'flex',
													width: '100%',
													alignItems: 'center',
													justifyContent: 'center',
												}}
											>
												<Button type="link">
													<DeleteOutlined style={{ color: 'red' }} />
												</Button>
											</div>
										</Popconfirm>
									</div>
								</Fragment>
							)}
						</div>
						<div className="file_info">
							<div className="file_date">
								{
									//

									moment(up_fechaupload).startOf('seconds').fromNow()
								}
							</div>
							<div className="file_author">{usu_nombre}</div>
							<div className="file_author">{formatSize(up_size)}</div>
							{up_detalle && (
								<div className="file_contact">
									<PaperClipOutlined style={{ marginRight: 4 }} />
									{up_detalle}
								</div>
							)}
							<div className="file_size">
								<UserOutlined style={{ marginRight: 4 }} />
								{usu_nombre}
							</div>
						</div>
					</div>
				</div>
			)}
		</Fragment>
	);
};
export default UploadTaskItem;
