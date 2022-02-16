import React, { Fragment, useContext, useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Radio,
  Row,
  Select,
  TimePicker,
  Upload,
} from "antd";
import locale from "antd/es/date-picker/locale/es_ES";
import moment from "moment";

import Note from "../Note/Note";
import { useMutation } from "@apollo/client";
import { UPDATE_TAREA } from "../../Graphql/mutation/tareas";
import { NoteContext } from "../../context/NoteContext";
import "./form.styles.scss";
import UploadTaskItem from "../ui/uploadTaskItem";

const EditTask = ({ onClose, task, taskType, urlParameters }) => {
  //* Renderiza las props vacias por primera vez, por eso se hace resetField para tomar el initialValue
  const [updateTareaResolver] = useMutation(UPDATE_TAREA);
  const { note, setNote } = useContext(NoteContext);

  const [form] = Form.useForm();
  const { Dragger } = Upload;
  const { Option } = Select;

  const [file, setFile] = useState({});
  const [fList, setFlist] = useState([]);
  const [priority, setPriority] = useState(null);
  const [showTaskItem, setShowTaskItem] = useState(false);
  const [disabledDragger] = useState(false);
  const [dateFrom, setDateFrom] = useState(null);
  const [timeFrom, settimeFrom] = useState(null);
  const [upload, setUpload] = useState(null);

  useEffect(() => {
    setShowTaskItem(task.up_detalle ? true : false);
    form.resetFields();
  }, [form, task]);

  const props = {
    name: "archivo",
    multiple: false,
    uploaded: false,
    action: "http://beeapp.binamics.com.ar:4001/files",
    fileList: fList,
    onChange(info) {
      setFlist(info.fileList.slice(-1));
      const { response, status } = info.file;

      setFile(response);

      if (status !== "uploading") {
      }
      if (status === "done") {
        message.success(
          `${info.file.name} El archivo se adjuntó correctamente.`
        );
      } else if (status === "error") {
        message.error(`${info.file.name} Error al cargar el archivo.`);
      }
    },
    onRemove(info) {
      const { status } = info;

      if (status === "done") {
        message.success(`${info.name} El archivo se eliminó correctamente.`);
        setFlist([]);
      }
    },
  };

  const removeFileAndClearDescription = (i) => {
    return form.setFieldsValue({ adj_detalle: "" });
  };

  const onFinish = (v) => {
    let inputAdjunto;

    if (Object.keys(file).length) {
      const extension = file.originalname.split(".")[1];
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
      tar_vencimiento: dateFrom
        ? dateFrom
        : moment(task.tar_vencimiento).format("YYYY-MM-DD"),
      tar_horavencimiento: timeFrom ? timeFrom : task.tar_horavencimiento,
      est_id: 1,
      //   usu_id: usuId,
      //   cli_id: dealCliId,
      ale_id: Number(v.ale_id),
      tar_alertanum: Number(v.tar_alertanum),
      tip_id: Number(v.tip_id) ? Number(v.tip_id) : task.tip_id,
      pri_id: priority ? priority : task.pri_id,
    };

    let inputNota = {
      not_desc: note ? note : "",
      not_importancia: priority,
      not_id: task.not_id ? task.not_id : null,
    };
    if (fList.length === 0) {
      inputAdjunto = null;
    }

    updateTareaResolver({
      variables: {
        idTarea: Number(urlParameters.idTarea),
        inputTarea,
        inputAdjunto,
        inputNota,
        idUsuario: Number(urlParameters.usuId),
      },
    });

    setNote("");
    form.resetFields();
    setFlist([]);
    setShowTaskItem(false);
    onClose();
  };
  const handleChange = () => {};
  const handleDelete = (id) => {
    setShowTaskItem(false);

    removeFileAndClearDescription();
    setUpload(null);
  };
  const onChangeDateFrom = (v) => {
    setDateFrom(moment(v).format("YYYY-MM-DD"));
  };
  const onChangeTimeFrom = (e) => {
    settimeFrom(moment(e).format("HH:mm:ss"));
  };
  const onChangePriority = (e) => {
    setPriority(Number(e.target.value));
  };

  return (
    <Fragment>
      <div className="layout-wrapper">
        <Form
          form={form}
          requiredMark="optional"
          name="etapas"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <div className="layout-form">
            <Form.Item
              label="Asunto"
              name="tar_asunto"
              initialValue={task.tar_asunto}
              rules={[
                {
                  required: true,
                  message: "Campo obligatorio",
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
                  message: "Campo obligatorio",
                },
              ]}
            >
              <Select onChange={handleChange} value={task.tip_id}>
                {taskType &&
                  taskType.map((item) => {
                    return (
                      <Option key={item.tip_id} value={item.tip_id}>
                        {item.tip_desc}
                      </Option>
                    );
                  })}
              </Select>
            </Form.Item>
            <Row gutter={[8, 8]}>
              <Col span={12} style={{ display: "flex" }}>
                <p>Contacto: </p>
                <span style={{ marginLeft: 8 }}> {task.con_nombre}</span>
              </Col>
            </Row>

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
                          message: "Campo obligatorio",
                        },
                      ]}
                    >
                      <DatePicker
                        style={{ width: "97%", marginRight: 4 }}
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
                      initialValue={moment(task.tar_horavencimiento, "HH:mm")}
                      rules={[
                        {
                          required: true,
                          message: "Campo obligatorio",
                        },
                      ]}
                    >
                      <TimePicker
                        style={{ width: 150 }}
                        locale={locale}
                        format="HH:mm"
                        onChange={onChangeTimeFrom}
                      />
                    </Form.Item>
                  </Col>
                </div>
              </Col>
            </Row>

            <Note editValue={task.not_desc || ""} />

            <Row gutter={[20, 20]} style={{ marginBottom: 10 }}>
              <Col sm={24}>
                <Form.Item name="pri_id" initialValue={String(task.pri_id)}>
                  <Radio.Group
                    style={{ marginTop: 15 }}
                    buttonStyle="solid"
                    onChange={onChangePriority}
                  >
                    <Radio.Button value="1">Alta</Radio.Button>
                    <Radio.Button value="2">Media</Radio.Button>
                    <Radio.Button value="3">Baja</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              //
              label="Detalle del archivo"
              name="adj_detalle"
              initialValue={task.up_detalle}
              rules={
                fList.length
                  ? [{ required: true, message: "Campo obligatorio" }]
                  : [{ required: false }]
              }
            >
              <Input
                placeholder="Descripción de archivo"
                style={{ width: "100%" }}
                disabled={showTaskItem ? true : false}
              />
            </Form.Item>

            {showTaskItem ? (
              <UploadTaskItem
                upload={task}
                deleteItem={handleDelete}
              ></UploadTaskItem>
            ) : (
              <Dragger
                {...props}
                disabled={disabledDragger}
                style={{ marginBottom: "1rem" }}
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click o arrastrar a esta área para subir un archivo
                </p>
                <p className="ant-upload-hint">
                  Los tipos de archivos son PDF, JPEG, PNG, SVG
                </p>
              </Dragger>
            )}
          </div>

          <Button
            type="primary"
            block
            htmlType="submit"
            style={{ marginTop: 20 }}
          >
            Guardar
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};

export default EditTask;
