import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { GET_TIPO_TAREA } from "../Graphql/queries/tipoTarea";
import { GET_CONTACTOS } from "../Graphql/queries/clientes";
import { GET_TAREA_ID } from "../Graphql/queries/tareas";

import { useQuery } from "@apollo/client";
const useTask = () => {
  const history = useHistory();
  const search = queryString.parse(history.location.search);

  const { data, loading } = useQuery(GET_TIPO_TAREA, {
    variables: { idCategoria: 1 },
  });
  const getContactos = useQuery(GET_CONTACTOS, {
    variables: { id: Number(search.dealCliId) },
  });
  const getTarea = useQuery(GET_TAREA_ID, {
    variables: { idTarea: Number(search.idTarea) },
  });

  const [tipoTarea, setTipoTarea] = useState([]);
  const [contactos, setContactos] = useState([]);
  const [task, setTask] = useState(null);
  const usuId = Number(search.usuId);
  const dealCliId = Number(search.dealCliId);
  const idTarea = Number(search.idTarea);

  useEffect(() => {
    if (data) {
      setTipoTarea(data.getTiposTareaResolver);
    }

    if (getContactos.data) {
      setContactos(getContactos.data.getContactosResolver);
    }

    if (getTarea.data) {
      setTask(JSON.parse(getTarea.data.getTareaByIdResolver)[0]);
    }
  }, [loading, data, getContactos, getTarea]);
  return { tipoTarea, contactos, usuId, dealCliId, idTarea, task };
};

export default useTask;
