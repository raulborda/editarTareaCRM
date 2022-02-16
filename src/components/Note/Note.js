/* eslint-disable no-unused-vars */
import React, { Fragment, useContext, useEffect, useState } from "react";

import { Col, Row } from "antd";

import { useQuill } from "react-quilljs";

import "react-quill/dist/quill.snow.css";
import { NoteContext } from "../../context/NoteContext";

const Note = ({ editValue, width, height }) => {
  const [value, setValue] = useState("");
  const { setNote } = useContext(NoteContext);
  var toolbarOptions = [
    ["bold", "italic", "underline"],
    [{ link: true }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ];
  const { quill, quillRef, Quill } = useQuill({
    modules: { magicUrl: true, toolbar: toolbarOptions },
  });
  // Idioma

  if (Quill && !quill) {
    // For execute this line only once.
    const MagicUrl = require("quill-magic-url").default; // Install with 'yarn add quill-magic-url'
    Quill.register("modules/magicUrl", MagicUrl);
  }

  useEffect(() => {
    // si existe una nota la debe setear como valor
    if (editValue) {
      setValue(editValue);
      //
      if (quill) {
        quill.clipboard.dangerouslyPasteHTML(editValue);
        setValue(editValue);
        setNote(editValue);
      }
    }
    if (quill) {
      quill.on("text-change", (v) => {
        setValue(quill.root.innerHTML);
        setNote(quill.root.innerHTML);
      });
    }
  }, [editValue, quill, setNote]);

  return (
    <Fragment>
      <Row gutter={[20, 20]}>
        <Col sm={24}>
          <div style={{ width: width }}>
            <div ref={quillRef} style={{ minHeight: height }} />
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Note;
