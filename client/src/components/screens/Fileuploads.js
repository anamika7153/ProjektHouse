//form ui : app.js

import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import Dropzone from "react-dropzone";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import M from "materialize-css";

const Fileuploads = (props) => {
  const history = useHistory();
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(""); // state for storing previewImage
  const [state, setState] = useState({
    title: "",
    description: "",
    members: "",
    member1: "",
    sec1: "",
    member2: "",
    sec2: "",
    member3: "",
    sec3: "",
    member4: "",
    sec4: "",
    member5: "",
    sec5: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    dropRef.current.style.border = "2px dashed #e9ebeb";
  };

  const updateBorder = (dragState) => {
    if (dragState === "over") {
      dropRef.current.style.border = "2px solid #000";
    } else if (dragState === "leave") {
      dropRef.current.style.border = "2px dashed #e9ebeb";
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const { title, description, members, member1, sec1, member2, sec2, member3, sec3, member4, sec4, member5, sec5, } = state;
      // const { title, description, members, member1, sec1,  } = state;
      if (title.trim() !== "" && description.trim() !== "") {
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("title", title);
          formData.append("description", description);
          formData.append("members", members);
          formData.append("member1", member1);
          formData.append("sec1", sec1);
          formData.append("member2", member2);
          formData.append("sec2", sec2);
          formData.append("member3", member3);
          formData.append("sec3", sec3);
          formData.append("member4", member4);
          formData.append("sec4", sec4);
          formData.append("member5", member5);
          formData.append("sec5", sec5);

          setErrorMsg("");
          await axios.post(`${API_URL}/upload`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          });
          M.toast({ html: "file updated Successfully", classes: " green" });
          history.push("/list");
          /* this will redirect the user to the FilesList component where we will see the list of files uploaded. */
        } else {
          setErrorMsg("Please select a file to add.");
        }
      } else {
        setErrorMsg("Please enter all the field values.");
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  return (
    <React.Fragment><Container>
      <div style={{marginTop: "4rem"}} className="row">
        <div className="col">
          <Link to="/" className="btn-flat waves-effect">
          <i className="material-icons left">keyboard_backspace</i>
            Back to home
          </Link>
          <div className="col s12" style={{ paddingLeft: "11.250px" }}>
            <h4>
              <b>Create Team</b>
            </h4>
          </div>
        </div>
      </div>
      <Form className="search-form" onSubmit={handleOnSubmit}>
        {errorMsg && <p className="errorMsg">{errorMsg}</p>}
        
        <Row>
          <Col style={{width: "100%"}}>
            <Form.Group controlId="title">
              <Form.Control
                type="text"
                name="title"
                value={state.title || ""}
                placeholder="Enter title"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="quarter-div">
          <Col style={{ width: "70%"}}>
            <Form.Group controlId="description">
              <Form.Control
                type="text"
                name="description"
                value={state.description || ""}
                placeholder="Enter description"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col style={{width: "30%"}}>
            <Form.Group controlId="members">
              <Form.Control
                type="number"
                name="members"
                value={state.members || ""}
                placeholder="Total Members"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="half-div">
          <div className="half-div-child">
            <Form.Group controlId="member1">
              <Form.Control
                type="text"
                name="member1"
                value={state.member1 || ""}
                placeholder="Member1"
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div >
            <Form.Group controlId="sec1">
              <Form.Control
                type="text"
                name="sec1"
                value={state.sec1 || ""}
                placeholder="Sec / Roll No"
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
        </Row>
        
        <Row className="half-div">
          <div className="half-div-child">
            <Form.Group controlId="member2">
              <Form.Control
                type="text"
                name="member2"
                value={state.member2 || ""}
                placeholder="Member2"
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div >
            <Form.Group controlId="sec2">
              <Form.Control
                type="text"
                name="sec2"
                value={state.sec2 || ""}
                placeholder="Sec / Roll No"
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
        </Row>
        <Row className="half-div">
          <div className="half-div-child">
            <Form.Group controlId="member3">
              <Form.Control
                type="text"
                name="member3"
                value={state.member3 || ""}
                placeholder="Member3"
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div >
            <Form.Group controlId="sec3">
              <Form.Control
                type="text"
                name="sec3"
                value={state.sec3 || ""}
                placeholder="Sec / Roll No"
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
        </Row>
        <Row className="half-div">
          <div className="half-div-child">
            <Form.Group controlId="member4">
              <Form.Control
                type="text"
                name="member4"
                value={state.member4 || ""}
                placeholder="Member4"
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div >
            <Form.Group controlId="sec4">
              <Form.Control
                type="text"
                name="sec4"
                value={state.sec4 || ""}
                placeholder="Sec / Roll No"
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
        </Row>
        <Row className="half-div">
          <div className="half-div-child">
            <Form.Group controlId="member5">
              <Form.Control
                type="text"
                name="member5"
                value={state.member5 || ""}
                placeholder="Member5"
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
          <div >
            <Form.Group controlId="sec5">
              <Form.Control
                type="text"
                name="sec5"
                value={state.sec5 || ""}
                placeholder="Sec / Roll No"
                onChange={handleInputChange}
              />
            </Form.Group>
          </div>
        </Row>
        <div className="upload-section">
          <Dropzone
            onDrop={onDrop}
            onDragEnter={() => updateBorder("over")}
            onDragLeave={() => updateBorder("leave")}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps({ className: "drop-zone" })} ref={dropRef}>
                <input {...getInputProps()} />
                <p>Drag and drop synopsis OR click here to select a file</p>
                {file && (
                  <div>
                    <strong>Selected file:</strong> {file.name}
                  </div>
                )}
              </div>
            )}
          </Dropzone>
          {previewSrc ? (
            isPreviewAvailable ? (
              <div className="image-preview">
                <img className="preview-image" src={previewSrc} alt="Preview" />
              </div>
            ) : (
              <div className="preview-message">
                <p>No preview available for this file</p>
              </div>
            )
          ) : (
            <div className="preview-message">
              <p>Image preview will be shown here after selection</p>
            </div>
          )}
        </div>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form></Container>
    </React.Fragment>
  );
};

export default Fileuploads;
