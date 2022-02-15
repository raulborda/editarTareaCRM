import React, { Fragment, useContext, useEffect, useState } from 'react';
import { BellFilled, InboxOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Form, Input, message, Radio, Row, Select, TimePicker, Upload } from 'antd';
import locale from 'antd/es/date-picker/locale/es_ES';
import moment from 'moment';

import { useMutation } from '@apollo/client';
import Note from '../Note/Note';
import useTask from '../../Hooks/useTask';

import { UPDATE_TAREA } from '../../Graphql/mutation/tareas';
import { NoteContext } from '../../context/NoteContext';
import './form.styles.scss';
import UploaTaskdItem from '../ui/uploadTaskItem';

const EditTask = ({ onClose }) => {
	const { tipoTarea, contactos, usuId, dealCliId, idTarea, task } = useTask();
	const [priority, setPriority] = useState(1);
	const [form] = Form.useForm();
	const { Option } = Select;
	const [notification, setNotification] = useState(false);
	const { note, setNote } = useContext(NoteContext);

	const [showTaskItem, setShowTaskItem] = useState(false);

	const [updateTareaResolver] = useMutation(UPDATE_TAREA);
	const { Dragger } = Upload;
	const [disabledDragger] = useState(false);
	const [file, setFile] = useState({});
	const [fList, setFlist] = useState([]);
	const [dateFrom, setDateFrom] = useState(null);
	const [timeFrom, settimeFrom] = useState(null);
	const [upload, setUpload] = useState(null);

	useEffect(() => {
		if (!task) return;
		if (task) {
			if (task.up_id !== null) {
				setShowTaskItem(true);
				const upload = {
					up_detalle: task.up_detalle,
					up_fechaupload: task.up_fechaupload,
					up_filename: task.up_filename,
					up_hashname: task.up_hashname,
					up_id: task.up_id,
					up_mimetype: task.up_mimetype,
					usu_nombre: task.usu_nombre,
					cli_nombre: task.cli_nombre,
					up_size: Number(task.up_size),
				};
				setUpload(upload);
			} else {
				setShowTaskItem(false);
			}
		}
		// if (Object.keys(task).length) {
		// 	console.log(task);
		// 	// onChangeDateFrom(moment(task.tar_vencimiento));

		// 	// preguntar si el archivado === 0
		// 	if (task.up_id !== null) {
		// 		setShowTaskItem(true);
		// 	} else {
		// 		setShowTaskItem(false);
		// 	}
		// }

		console.log(upload);
	}, [task]);

	const props = {
		name: 'archivo',
		multiple: false,
		uploaded: false,
		action: 'http://beeapp.binamics.com.ar:4001/files',
		fileList: fList,
		onChange(info) {
			setFlist(info.fileList.slice(-1));
			const { response, status } = info.file;

			setFile(response);

			if (status !== 'uploading') {
			}
			if (status === 'done') {
				message.success(`${info.file.name} El archivo se adjuntó correctamente.`);
			} else if (status === 'error') {
				message.error(`${info.file.name} Error al cargar el archivo.`);
			}
		},
		onRemove(info) {
			const { status } = info;

			if (status === 'done') {
				message.success(`${info.name} El archivo se eliminó correctamente.`);
				setFlist([]);
				console.log('Borrar');
			}
		},
	};

	// funcion para borrar campo cuando se ejecuta onRemove.
	const removeFileAndClearDescription = (i) => {
		// tomar el campo adj_detalle y limpiarlo
		return form.setFieldsValue({ adj_detalle: '' });
	};

	// onFinish form
	const onFinish = (v) => {
		let inputAdjunto;

		if (Object.keys(file).length) {
			const extension = file.originalname.split('.')[1];
			inputAdjunto = {
				up_filename: file.fileName,
				up_mimetype: extension,
				up_hashname: file.filename,
				usu_id: 1,
				up_detalle: v.adj_detalle,
				up_size: String(file.size),
			};
		} else {
			// Tiene que hacer un update.
			// inputAdjunto = {...upload};
		}

		const inputTarea = {
			tar_asunto: v.tar_asunto,
			tar_vencimiento: dateFrom ? dateFrom : moment(task.tar_vencimiento).format('YYYY-MM-DD'),
			tar_horavencimiento: timeFrom ? timeFrom : task.tar_horavencimiento,
			est_id: 1,
			usu_id: usuId,
			cli_id: dealCliId,
			ale_id: Number(v.ale_id),
			tar_alertanum: Number(v.tar_alertanum),
			tip_id: Number(v.tip_id) ? Number(v.tip_id) : task.tip_id,
			pri_id: priority ? priority : task.pri_id,
		};

		let inputNota = {
			not_desc: note ? note : '',
			not_importancia: priority,
			not_id: task.not_id ? task.not_id : null,
		};
		if (fList.length === 0) {
			inputAdjunto = null;
		}

		// mutation update.
		updateTareaResolver({ variables: { idTarea, inputTarea, inputAdjunto, inputNota, idUsuario: usuId } });

		console.log({ idTarea, inputTarea, inputAdjunto, inputNota, usuId, upload });
		setNote('');
		form.resetFields();
		setFlist([]);
		setShowTaskItem(false);
		onClose();
	};
	const handleChange = () => {};
	const handleChangeContact = () => {};
	const handleDelete = (id) => {
		setShowTaskItem(false);

		removeFileAndClearDescription();
		setUpload(null);
	};

	const onChangeDateFrom = (v) => {
		setDateFrom(moment(v).format('YYYY-MM-DD'));
	};

	const onChangeTimeFrom = (e) => {
		// console.log(e);
		settimeFrom(moment(e).format('HH:mm:ss'));
	};
	const onChangePriority = (e) => {
		// console.log(e.target.value);
		setPriority(Number(e.target.value));
	};

	// - <Form.Item label="Field" name="field">
	// -   <Input />
	// - </Form.Item>

	// + <Form.Item label="Field">
	// +   <Form.Item name="field" noStyle><Input /></Form.Item> // that will bind input
	// +   <span>description</span>
	// + </Form.Item>

	return (
		<Fragment>
			{task && (
				<div className="layout-wrapper">
					<Form form={form} requiredMark="optional" name="etapas" layout="vertical" onFinish={onFinish} autoComplete="off">
						<div className="layout-form">
							<Form.Item
								label="Asunto"
								name="tar_asunto"
								initialValue={task.tar_asunto}
								rules={[
									{
										required: true,
										message: 'Campo obligatorio',
									},
								]}
							>
								<Input.TextArea />
							</Form.Item>
							<Form.Item
								label="Tipo de tarea"
								name="tip_id"
								initialValue={task.tip_id}
								rules={[
									{
										required: true,
										message: 'Campo obligatorio',
									},
								]}
							>
								<Select
									//
									onChange={handleChange}
									value={task.tip_id}
								>
									{tipoTarea.map((item) => {
										return (
											<Option key={item.tip_id} value={item.tip_id}>
												{item.tip_desc}
											</Option>
										);
									})}
								</Select>
							</Form.Item>
							<Row gutter={[8, 8]}>
								<Col span={12} style={{ display: 'flex' }}>
									<p>Contacto: </p>
									<span style={{ marginLeft: 8 }}> {task.con_nombre}</span>
								</Col>
							</Row>

							{/* <Form.Item
								//
								label="Contacto"
								name="con_id"
								initialValue={task.con_nombre}
							>
								{contactos && (
									<Input value={contactos.con_nombre} disabled bordered={false} />
									// <Select onChange={handleChangeContact}>
									// 	{contactos.map((item) => {
									// 		const { con_id, con_nombre } = item;

									// 		return (
									// 			<Option key={con_id} value={con_id}>
									// 				{con_nombre}
									// 			</Option>
									// 		);
									// 	})}
									// </Select>
								)}
							</Form.Item> */}

							<Row>
								<Col xs={24}>
									<div className="date_wrapper">
										<Col xs={7}>
											<Form.Item
												initialValue={moment(task.tar_vencimiento)}
												label="Vencimiento"
												format="DD/MM/YYYY"
												name="tar_fecha"
												rules={[
													{
														required: true,
														message: 'Campo obligatorio',
													},
												]}
											>
												<DatePicker
													style={{ width: '97%', marginRight: 4 }}
													locale={locale}
													format="DD/MM/YYYY"
													onChange={onChangeDateFrom}
												/>
											</Form.Item>
										</Col>
										<Col xs={5}>
											<Form.Item
												label="Hora"
												name="tar_horainicio"
												initialValue={moment(task.tar_horavencimiento, 'HH:mm')}
												rules={[
													{
														required: true,
														message: 'Campo obligatorio',
													},
												]}
											>
												<TimePicker style={{ width: 150 }} locale={locale} format="HH:mm" onChange={onChangeTimeFrom} />
											</Form.Item>
										</Col>
										<Col xs={11}>
											<div className={notification ? `bell_button act` : `bell_button`} onClick={() => setNotification(!notification)}>
												<BellFilled style={{ marginLeft: 15 }} />
											</div>
										</Col>
									</div>
									<div className={notification ? `container_notification open` : `container_notification`}>
										<h3 className="notification_title">Envío de alerta por correo</h3>
										<Row
											gutter={[10, 10]}
											align="middle"
											//  style={{ marginTop: 15 }}
											justify="start"
										>
											<Col xs={4}>
												<Form.Item name="ale_id" initialValue="10">
													<Input type="number" min={0} max={24} placeholder="30" />
												</Form.Item>
											</Col>
											<Col xs={7}>
												<Form.Item name="tar_alertanum" initialValue="1">
													<Select onChange={handleChange} placeholder="Minutos">
														<Option value="1">Minutos</Option>
														<Option value="2">Horas</Option>
														<Option value="3">Días</Option>
													</Select>
												</Form.Item>
											</Col>
										</Row>
									</div>
								</Col>
							</Row>

							<Note editValue={task.not_desc || ''} />

							<Row gutter={[20, 20]} style={{ marginBottom: 10 }}>
								<Col sm={24}>
									<Radio.Group
										style={{ marginTop: 15 }}
										defaultValue={task.pri_id ? String(task.pri_id) : '3'}
										buttonStyle="solid"
										onChange={onChangePriority}
									>
										<Radio.Button value="1">Alta</Radio.Button>
										<Radio.Button value="2">Media</Radio.Button>
										<Radio.Button value="3">Baja</Radio.Button>
									</Radio.Group>
								</Col>
							</Row>

							<Form.Item
								//
								label="Detalle del archivo"
								name="adj_detalle"
								initialValue={task.up_detalle}
								rules={fList.length ? [{ required: true, message: 'Campo obligatorio' }] : [{ required: false }]}
							>
								<Input placeholder="Descripción de archivo" style={{ width: '100%' }} disabled={upload ? true : false} />
							</Form.Item>

							{upload && showTaskItem && <UploaTaskdItem upload={upload} attached={false} deleteItem={handleDelete}></UploaTaskdItem>}
							{!showTaskItem && (
								<Dragger {...props} disabled={disabledDragger} style={{ marginBottom: '1rem' }}>
									<p className="ant-upload-drag-icon">
										<InboxOutlined />
									</p>
									<p className="ant-upload-text">Click o arrastrar a esta área para subir un archivo</p>
									<p className="ant-upload-hint">Los tipos de archivos son PDF, JPEG, PNG, SVG</p>
								</Dragger>
							)}
						</div>

						<Button type="primary" block htmlType="submit" style={{ marginTop: 20 }}>
							Guardar
						</Button>
					</Form>
				</div>
			)}
		</Fragment>
	);
};

export default EditTask;
