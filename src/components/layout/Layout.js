import React, { useState } from "react";
import { Col, Row } from "antd";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import Drawer from "./Drawer";
import { NoteContext } from "../../context/NoteContext";

const Layout = () => {
  const [note, setNote] = useState("");
  const history = useHistory();
  const search = queryString.parse(history.location.search);
  // abre el drawer
  //   const drawer = search.drawer;

  return (
    <NoteContext.Provider value={{ note, setNote }}>
      <Row gutter={[8, 8]}>
        <Col xs={24}>
          <div className="drawer_wrapper">
            <Drawer drawer={true} />
          </div>
        </Col>
      </Row>
    </NoteContext.Provider>
  );
};

export default Layout;
