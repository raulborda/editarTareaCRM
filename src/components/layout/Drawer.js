import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { Drawer as DRW, Empty, Spin } from "antd";
import "./layout.styles.scss";
import EditTask from "../forms/editTask";
import { GET_TAREA_ID } from "../../Graphql/queries/tareas";
import { useQuery } from "@apollo/client";
import { GET_TIPO_TAREA } from "../../Graphql/queries/tipoTarea";

const Drawer = ({ drawer }) => {
  const history = useHistory();
  const search = queryString.parse(history.location.search);
  const [showDrawer, setShowDrawer] = useState(true);
  const [task, setTask] = useState({});
  const [taskType, setTaskType] = useState([]);

  const { data, loading } = useQuery(GET_TAREA_ID, {
    variables: { idTarea: Number(search.idTarea) },
  });

  const { data: dataTipoTarea } = useQuery(GET_TIPO_TAREA, {
    variables: { idCategoria: 1 },
  });

  useEffect(() => {
    if (data) {
      const tarea = JSON.parse(data.getTareaByIdResolver);
      setTask(tarea[0]);
    }

    if (dataTipoTarea) {
      setTaskType(dataTipoTarea.getTiposTareaResolver);
    }
  }, [data, dataTipoTarea, drawer]);

  const onClose = () => {
    window.localStorage.setItem("drawer", JSON.stringify(false));
    setShowDrawer(false);
    return true;
  };

  return (
    <Fragment>
      <div className="drawer_container">
        <DRW
          title="Editar tarea"
          placement="right"
          closable={true}
          onClose={onClose}
          visible={showDrawer}
          width={600}
          height="100%"
        >
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                marginTop: 50,
              }}
            >
              <Spin />
              <p style={{ textAlign: "center", margin: 10 }}>Cargando tarea</p>
            </div>
          ) : (
            <EditTask
              onClose={onClose}
              task={task}
              taskType={taskType}
              urlParameters={search}
            />
          )}
        </DRW>
      </div>
    </Fragment>
  );
};

export default Drawer;
